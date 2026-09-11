import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthUser } from "../../common/decorators";
import { PrismaService } from "../../prisma/prisma.service";

type JwtPayload = {
  sub: string;
  email: string;
  role: "USER" | "ADMIN";
};

function requireAccessSecret(): string {
  const secret = process.env.JWT_ACCESS_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_ACCESS_SECRET is required (min 32 characters) — no fallback",
    );
  }
  return secret;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: requireAccessSecret(),
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true, locale: true },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      locale: user.locale === "en" ? "en" : "fr",
    };
  }
}
