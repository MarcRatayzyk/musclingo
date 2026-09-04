# Comptes de test

Comptes disponibles en environnement de développement local.

## Admin (back-office, http://localhost:3000)

| Email | Mot de passe |
|---|---|
| `admin@musclemind.app` | `Admin123!` |

Créé/reset par `pnpm db:seed`. Modifiable via `ADMIN_EMAIL` / `ADMIN_PASSWORD` dans `apps/api/.env`.

## Démo (app mobile, http://localhost:8090)

| Email | Mot de passe |
|---|---|
| `demo@musclemind.app` | `Demo123!` |

Créé/reset par `pnpm db:seed`. Progression minimale (compte de démo standard).

## Compte tout débloqué (app mobile)

| Email | Mot de passe |
|---|---|
| `alldone@musclemind.app` | `AllDone123!` |

Toutes les leçons, quiz et checkpoints sont marqués complétés (score parfait). Utile pour tester l'app sans progresser manuellement.

Créé/mis à jour via (depuis `apps/api`) :
```powershell
pnpm exec ts-node prisma/create-completed-account.ts
```
⚠️ À relancer après chaque `pnpm db:seed`, car le seed supprime et recrée les quiz, ce qui efface la progression de tous les comptes. Le script est idempotent (relancer sans reseed entre-temps ne gonfle pas l'XP).

Personnalisable via variables d'environnement :
```powershell
$env:ACCOUNT_EMAIL = "autre@musclemind.app"
$env:ACCOUNT_PASSWORD = "MotDePasse123!"
$env:ACCOUNT_NAME = "Autre Compte"
pnpm exec ts-node prisma/create-completed-account.ts
```
