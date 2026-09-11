import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from "@nestjs/common";
import Redis from "ioredis";

/**
 * Redis for refresh-token storage.
 * Production: fail-closed (no in-memory fallback).
 * Development: in-memory fallback when Redis is unavailable.
 */
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;
  private readonly memory = new Map<
    string,
    { value: string; expiresAt?: number }
  >();
  private useMemory = false;
  private readonly isProd = process.env.NODE_ENV === "production";

  constructor() {
    const redisUrl = process.env.REDIS_URL?.trim();
    const isLocalhostRedis =
      !redisUrl ||
      redisUrl.includes("localhost") ||
      redisUrl.includes("127.0.0.1");

    if (this.isProd && isLocalhostRedis) {
      this.logger.error(
        "FATAL: REDIS_URL must point to a non-localhost Redis in production",
      );
      process.exit(1);
    }

    if (!this.isProd && isLocalhostRedis && !redisUrl) {
      this.useMemory = true;
      this.client = null;
      this.logger.warn("REDIS_URL absent — store de tokens en mémoire (dev)");
      return;
    }

    try {
      this.client = new Redis(redisUrl ?? "redis://localhost:6379", {
        maxRetriesPerRequest: 1,
        lazyConnect: true,
        connectTimeout: 3000,
        retryStrategy: this.isProd ? () => 500 : () => null,
      });
      this.client.on("error", (err) => {
        if (this.isProd) {
          this.logger.error(`Redis error: ${err.message}`);
          return;
        }
        if (!this.useMemory) {
          this.useMemory = true;
          this.logger.warn("Redis unavailable — using in-memory token store");
        }
      });
    } catch (err) {
      if (this.isProd) {
        this.logger.error(`FATAL: Redis init failed: ${String(err)}`);
        process.exit(1);
      }
      this.useMemory = true;
      this.client = null;
    }
  }

  async onModuleInit() {
    if (this.useMemory || !this.client) {
      if (this.isProd) {
        this.logger.error("FATAL: Redis client not configured in production");
        process.exit(1);
      }
      return;
    }

    try {
      if (this.client.status === "wait") {
        await this.client.connect();
      }
      await this.client.ping();
      this.logger.log("Redis connected");
    } catch (err) {
      if (this.isProd) {
        this.logger.error(
          `FATAL: Redis connect failed in production: ${String(err)}`,
        );
        process.exit(1);
      }
      this.useMemory = true;
      this.logger.warn("Redis connect failed — using in-memory token store");
    }
  }

  private async ensure() {
    if (this.useMemory || !this.client) {
      if (this.isProd) {
        throw new Error("Redis unavailable in production");
      }
      return;
    }
    try {
      if (this.client.status === "wait") {
        await this.client.connect();
      }
    } catch (err) {
      if (this.isProd) {
        throw new Error(`Redis connect failed: ${String(err)}`);
      }
      this.useMemory = true;
      this.logger.warn("Redis connect failed — using in-memory token store");
    }
  }

  async onModuleDestroy() {
    if (this.client && !this.useMemory) {
      try {
        await this.client.quit();
      } catch {
        /* ignore */
      }
    }
  }

  async set(key: string, value: string, ttlSeconds?: number) {
    await this.ensure();
    if (this.useMemory || !this.client) {
      this.memory.set(key, {
        value,
        expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
      });
      return;
    }
    if (ttlSeconds) {
      await this.client.set(key, value, "EX", ttlSeconds);
      return;
    }
    await this.client.set(key, value);
  }

  async get(key: string) {
    await this.ensure();
    if (this.useMemory || !this.client) {
      const entry = this.memory.get(key);
      if (!entry) return null;
      if (entry.expiresAt && entry.expiresAt < Date.now()) {
        this.memory.delete(key);
        return null;
      }
      return entry.value;
    }
    return this.client.get(key);
  }

  async del(key: string) {
    await this.ensure();
    if (this.useMemory || !this.client) {
      this.memory.delete(key);
      return;
    }
    await this.client.del(key);
  }
}
