import { Injectable, OnModuleDestroy, Logger } from "@nestjs/common";
import Redis from "ioredis";

/**
 * Redis with in-memory fallback for local dev without Docker.
 */
@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;
  private readonly memory = new Map<string, { value: string; expiresAt?: number }>();
  private useMemory = false;

  constructor() {
    try {
      this.client = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
        maxRetriesPerRequest: 1,
        lazyConnect: true,
        connectTimeout: 1500,
        retryStrategy: () => null,
      });
      this.client.on("error", () => {
        if (!this.useMemory) {
          this.useMemory = true;
          this.logger.warn("Redis unavailable — using in-memory token store");
        }
      });
    } catch {
      this.useMemory = true;
      this.client = null;
    }
  }

  private async ensure() {
    if (this.useMemory || !this.client) return;
    try {
      if (this.client.status === "wait") {
        await this.client.connect();
      }
    } catch {
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
