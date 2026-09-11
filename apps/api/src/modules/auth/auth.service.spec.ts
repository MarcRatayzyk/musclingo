import {
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";

describe("AuthService guest + claim", () => {
  const originalAccess = process.env.JWT_ACCESS_SECRET;
  const originalRefresh = process.env.JWT_REFRESH_SECRET;

  beforeAll(() => {
    process.env.JWT_ACCESS_SECRET = "x".repeat(32);
    process.env.JWT_REFRESH_SECRET = "y".repeat(32);
  });

  afterAll(() => {
    process.env.JWT_ACCESS_SECRET = originalAccess;
    process.env.JWT_REFRESH_SECRET = originalRefresh;
  });

  function build(overrides?: {
    findUnique?: jest.Mock;
    create?: jest.Mock;
    update?: jest.Mock;
  }) {
    const prisma = {
      user: {
        findUnique: overrides?.findUnique ?? jest.fn(),
        create: overrides?.create ?? jest.fn(),
        update: overrides?.update ?? jest.fn(),
      },
    };
    const jwt = {
      signAsync: jest.fn().mockResolvedValue("token"),
    } as unknown as JwtService;
    const redis = {
      set: jest.fn().mockResolvedValue(undefined),
      get: jest.fn(),
      del: jest.fn(),
    };
    const service = new AuthService(prisma as never, jwt, redis as never);
    return { service, prisma, jwt, redis };
  }

  it("createGuest creates isGuest user and returns tokens", async () => {
    const { service, prisma } = build({
      create: jest.fn().mockResolvedValue({
        id: "guest1",
        email: null,
        role: "USER",
        isGuest: true,
      }),
    });

    const tokens = await service.createGuest();
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        displayName: "Athlète",
        isGuest: true,
        streak: { create: {} },
      },
    });
    expect(tokens.accessToken).toBe("token");
    expect(tokens.refreshToken).toBe("token");
  });

  it("claim upgrades guest and returns tokens", async () => {
    const findUnique = jest
      .fn()
      .mockResolvedValueOnce({
        id: "guest1",
        isGuest: true,
        email: null,
      })
      .mockResolvedValueOnce(null);
    const update = jest.fn().mockResolvedValue({
      id: "guest1",
      email: "a@b.co",
      role: "USER",
    });
    const { service } = build({ findUnique, update });

    const tokens = await service.claim("guest1", {
      email: "a@b.co",
      password: "password1",
      displayName: "Marc",
    });
    expect(update).toHaveBeenCalled();
    expect(tokens.accessToken).toBe("token");
  });

  it("claim rejects non-guest", async () => {
    const { service } = build({
      findUnique: jest.fn().mockResolvedValue({
        id: "u1",
        isGuest: false,
        email: "a@b.co",
      }),
    });

    await expect(
      service.claim("u1", {
        email: "new@b.co",
        password: "password1",
        displayName: "Marc",
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("claim rejects email already taken", async () => {
    const findUnique = jest
      .fn()
      .mockResolvedValueOnce({
        id: "guest1",
        isGuest: true,
        email: null,
      })
      .mockResolvedValueOnce({ id: "other", email: "a@b.co" });
    const { service } = build({ findUnique });

    await expect(
      service.claim("guest1", {
        email: "a@b.co",
        password: "password1",
        displayName: "Marc",
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
