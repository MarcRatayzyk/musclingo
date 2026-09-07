FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/
RUN pnpm install --filter @muscle-mind/api... --frozen-lockfile || pnpm install --filter @muscle-mind/api...

FROM base AS build
COPY --from=deps /app /app
COPY . .
RUN pnpm --filter @muscle-mind/types build
RUN pnpm --filter @muscle-mind/api exec prisma generate
RUN pnpm --filter @muscle-mind/api build
RUN pnpm --filter @muscle-mind/api deploy --prod /app/out

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g prisma@6.19.3
COPY --from=build /app/out ./
RUN prisma generate
EXPOSE 3001
CMD ["sh", "-c", "prisma migrate deploy && node dist/main.js"]
