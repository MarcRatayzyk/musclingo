import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from "@nestjs/common";
import { AppLocale, parseLocale } from "./locale";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = "roles";
export const Roles = (...roles: Array<"USER" | "ADMIN">) =>
  SetMetadata(ROLES_KEY, roles);

export type AuthUser = {
  userId: string;
  email: string | null;
  role: "USER" | "ADMIN";
  locale: AppLocale;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthUser }>();
    return request.user;
  },
);

export const RequestLocale = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AppLocale => {
    const request = ctx.switchToHttp().getRequest<{
      headers?: Record<string, string | string[] | undefined>;
    }>();
    const value = request.headers?.["x-locale"] ?? request.headers?.["X-Locale"];
    const raw = Array.isArray(value) ? value[0] : value;
    return parseLocale(raw);
  },
);
