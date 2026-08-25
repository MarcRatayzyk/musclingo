# Muscle Mind

Duolingo de la musculation — micro-leçons scientifiques pendant les repos entre séries.

## Architecture

Monorepo **pnpm + Turborepo** :

| App / package | Rôle |
|---------------|------|
| `apps/mobile` | Expo Router, NativeWind, React Query, Zustand, Moti |
| `apps/api` | NestJS, Prisma, PostgreSQL, Redis, JWT, Swagger |
| `apps/admin` | Next.js App Router — CMS minimal |
| `packages/types` | Zod + courbe XP partagée |
| `packages/ui` | Tokens design |
| `packages/config` | TSConfig de base |

**Principes**

- Feature-first côté mobile (`features/*` + écrans fins dans `src/app`)
- Aucune logique métier dans les composants UI
- Toutes les données serveur via React Query
- Correction des quiz **uniquement côté API**
- Recommandation déterministe (jamais aléatoire)
- Redis avec fallback mémoire si Docker/Redis indisponible en local

## Prérequis

- Node 22+
- pnpm 9.15 (`npm i -g pnpm@9.15.0`)
- Docker Desktop (Postgres 16 + Redis 7)

## Setup

```bash
cp .env.example .env
# apps/api/.env est déjà fourni pour le dev local

docker compose up -d postgres redis
pnpm install
pnpm --filter @muscle-mind/types build
pnpm db:generate
pnpm --filter @muscle-mind/api exec prisma migrate deploy
pnpm db:seed
```

## Développement

### Tester l’app utilisateur sur PC (recommandé)

```bash
pnpm dev:api    # Terminal 1 — API http://localhost:3001
pnpm dev:web    # Terminal 2 — App dans le navigateur http://localhost:8090
```

Compte démo pré-rempli en dev : `demo@musclemind.app` / `Demo123!`

### Tous les services

```bash
pnpm --filter @muscle-mind/api dev      # http://localhost:3001  Swagger /docs
pnpm --filter @muscle-mind/admin dev    # http://localhost:3000
pnpm --filter @muscle-mind/mobile dev   # Expo Go (téléphone)
pnpm dev:web                            # App mobile dans le navigateur
```

Sur appareil physique (Expo Go), pointe `EXPO_PUBLIC_API_URL` dans `apps/mobile/.env` vers l’IP LAN de ta machine (pas `localhost`). Sur PC, garde `http://localhost:3001`.

### Comptes seed

- **Admin** (back-office http://localhost:3000) : `admin@musclemind.app` / `Admin123!`
- **Utilisateur démo** (app mobile Expo) : `demo@musclemind.app` / `Demo123!`
- Contenu : 5 catégories + 1 leçon Anatomie + quiz (QCM + Vrai/Faux)
- Badges : `FIRST_LESSON`, `FIRST_QUIZ`

## Courbe XP

Niveaux cumulatifs : `0, 150, 400, 750, 1200, …` (`packages/types/src/levels.ts`).  
Le calcul de niveau est fait **côté API** à chaque transaction XP.

## Analytics

PostHog stub dès le bootstrap mobile (`EXPO_PUBLIC_POSTHOG_KEY`).  
Events : login, signup, lesson_*, quiz_*, xp_earned, streak_updated, …

## Slice MVP livré

1. Auth email JWT (refresh Redis / mémoire)
2. `/me`, catégories, reco, leçon, complete, quiz submit
3. Admin : login (rôle ADMIN), dashboard, CRUD leçon + quiz, publish/draft
4. Mobile : Auth, Accueil, Catégories, Leçon, Quiz (XP animé + confettis si parfait)
5. Tests Jest : schéma auth, courbe XP, scoring quiz
6. CI GitHub Actions + Docker Compose

## Phases suivantes

OAuth Apple/Google, RevenueCat, Push, upload images, DnD admin, types quiz ORDER/MATCH UI, reco espacée avancée, feature flags PostHog.
