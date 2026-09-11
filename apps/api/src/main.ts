import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { existsSync, mkdirSync, readdirSync, copyFileSync } from "fs";
import { join } from "path";
import { AppModule } from "./app.module";

const MIN_JWT_SECRET_LENGTH = 32;

function resolveDatabaseUrl() {
  if (process.env.DATABASE_URL) return;

  const fallback =
    process.env.DATABASE_PRIVATE_URL ||
    process.env.DATABASE_PUBLIC_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL;

  if (fallback) {
    process.env.DATABASE_URL = fallback;
    return;
  }

  console.error(`
FATAL: DATABASE_URL is missing on @muscle-mind/api.

Railway fix:
1. Add a PostgreSQL service in the same project (if none).
2. Open @muscle-mind/api → Variables → New Variable.
3. Name: DATABASE_URL
   Value: \${{Postgres.DATABASE_URL}}
   (replace "Postgres" with your Postgres service name)
4. Redeploy the API.
`);
  process.exit(1);
}

function requireJwtSecrets() {
  const access = process.env.JWT_ACCESS_SECRET?.trim() ?? "";
  const refresh = process.env.JWT_REFRESH_SECRET?.trim() ?? "";
  const missing: string[] = [];

  if (access.length < MIN_JWT_SECRET_LENGTH) {
    missing.push(
      `JWT_ACCESS_SECRET (min ${MIN_JWT_SECRET_LENGTH} characters)`,
    );
  }
  if (refresh.length < MIN_JWT_SECRET_LENGTH) {
    missing.push(
      `JWT_REFRESH_SECRET (min ${MIN_JWT_SECRET_LENGTH} characters)`,
    );
  }

  if (missing.length === 0) return;

  console.error(`
FATAL: JWT secrets missing or too short on @muscle-mind/api.

Required:
${missing.map((m) => `- ${m}`).join("\n")}

Set strong random values (e.g. openssl rand -base64 48) in the environment.
There is no development fallback — the process will not start without them.
`);
  process.exit(1);
}

async function bootstrap() {
  resolveDatabaseUrl();
  requireJwtSecrets();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const uploadsDir = join(process.cwd(), "uploads");
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }
  // Sync curated lesson illustrations shipped in the image (overwrite).
  const assetsDir = join(process.cwd(), "prisma", "assets");
  if (existsSync(assetsDir)) {
    for (const name of readdirSync(assetsDir)) {
      if (!/\.(png|jpe?g|webp|gif)$/i.test(name)) continue;
      copyFileSync(join(assetsDir, name), join(uploadsDir, name));
    }
  }
  app.useStaticAssets(uploadsDir, { prefix: "/uploads/" });

  const corsRaw = process.env.CORS_ORIGINS?.trim();
  if (!corsRaw || corsRaw === "*") {
    app.enableCors({ origin: true, credentials: true });
  } else {
    app.enableCors({
      origin: corsRaw.split(",").map((o) => o.trim()),
      credentials: true,
    });
  }

  const config = new DocumentBuilder()
    .setTitle("Muscle Mind API")
    .setDescription("API REST — Duolingo de la musculation")
    .setVersion("0.1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const port = Number(process.env.PORT ?? process.env.API_PORT ?? 3001);
  await app.listen(port);
  console.log(`Muscle Mind API listening on http://localhost:${port}`);
  console.log(`Swagger: http://localhost:${port}/docs`);
}

bootstrap();
