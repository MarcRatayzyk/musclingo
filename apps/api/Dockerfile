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
WORKDIR /app/apps/api
RUN pnpm prisma generate
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/apps/api/package.json ./
COPY --from=build /app/apps/api/node_modules ./node_modules
COPY --from=build /app/apps/api/prisma ./prisma
COPY --from=build /app/node_modules/.pnpm ./node_modules/.pnpm
EXPOSE 3001
CMD ["node", "dist/main.js"]
