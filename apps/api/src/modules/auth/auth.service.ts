import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginInput, RegisterInput } from "@muscle-mind/types";
import { PrismaService } from "../../prisma/prisma.service";
import { RedisService } from "../../redis/redis.service";
import { randomUUID } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
  ) {}

  async register(input: RegisterInput) {
    const existing = await this.prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException("Email already registered");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        passwordHash,
        displayName: input.displayName,
        streak: { create: {} },
      },
    });

    return this.issueTokens(user.id, user.email, user.role);
  }

  async login(input: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.issueTokens(user.id, user.email, user.role);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync<{
        sub: string;
        email: string;
        role: "USER" | "ADMIN";
        jti: string;
        typ: string;
      }>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret",
      });

      if (payload.typ !== "refresh") {
        throw new UnauthorizedException("Invalid token type");
      }

      const stored = await this.redis.get(`refresh:${payload.sub}:${payload.jti}`);
      if (!stored) {
        throw new UnauthorizedException("Refresh token revoked");
      }

      await this.redis.del(`refresh:${payload.sub}:${payload.jti}`);
      return this.issueTokens(payload.sub, payload.email, payload.role);
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  /** OAuth stubs — wired in a later phase. */
  appleOAuth() {
    return { statusCode: 501, message: "Apple OAuth not implemented yet" };
  }

  googleOAuth() {
    return { statusCode: 501, message: "Google OAuth not implemented yet" };
  }

  private async issueTokens(
    userId: string,
    email: string,
    role: "USER" | "ADMIN",
  ) {
    const jti = randomUUID();
    const accessToken = await this.jwt.signAsync(
      { sub: userId, email, role },
      {
        secret: process.env.JWT_ACCESS_SECRET ?? "dev-access-secret",
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
      },
    );

    const refreshToken = await this.jwt.signAsync(
      { sub: userId, email, role, jti, typ: "refresh" },
      {
        secret: process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret",
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",
      },
    );

    await this.redis.set(`refresh:${userId}:${jti}`, "1", 60 * 60 * 24 * 7);

    return {
      accessToken,
      refreshToken,
      tokenType: "Bearer" as const,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
    };
  }
}
