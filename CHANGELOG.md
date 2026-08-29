# Changelog

## [Non publié] - 2026-08-29

### Ajouté
- Parcours **Récupération** entièrement réécrit : 6 checkpoints thématiques (Sommeil, Douleurs et tissus, Système nerveux et stress, Mobilité et étirements, Récupération active et outils, Charge et surentraînement), 24 leçons au lieu de 6, chacune avec son quiz de 6 questions (`apps/api/prisma/recuperation/`).
- Script `apps/api/prisma/create-completed-account.ts` : crée un compte avec toutes les leçons, quiz et checkpoints complétés (utile pour tester l'app sans progresser manuellement).

### Modifié
- `apps/api/prisma/seed.ts` : le parcours Récupération est désormais importé depuis `recuperation-lessons.ts` au lieu d'être défini en ligne dans le fichier.
- `apps/api/.env` (non versionné) : `CORS_ORIGINS` élargi pour autoriser `http://localhost:8090` (port de `pnpm dev:web`).

### Corrigé
- CORS de l'API n'autorisait pas `http://localhost:8090`, causant des erreurs "Failed to fetch" à la connexion sur l'app web.
- 7 des 24 leçons de Récupération avaient une question "texte à trous" qui reformulait mot pour mot la question vrai/faux du même quiz (redondance corrigée par une nouvelle question testant un fait différent).
- Progression de difficulté du parcours Récupération réorganisée : chaque checkpoint monte désormais de BEGINNER/INTERMEDIATE vers ADVANCED (au lieu d'un ordre parfois aléatoire), et le dernier checkpoint (Charge et surentraînement) ne redescend plus en dessous d'INTERMEDIATE, pour finir sur les leçons les plus poussées du parcours. La dernière leçon (« Suivre sa fatigue dans le temps ») a été enrichie pour servir de synthèse finale.
