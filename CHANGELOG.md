# Changelog

## [Non publié] - 2026-09-05 (audit Anatomie)

### Ajouté
- 6 illustrations pour le parcours Anatomie (Deltoïde et coiffe des rotateurs, Quadriceps, Iliopsoas, Agoniste/antagoniste, Plans et axes, Longueur-tension), reliées à leurs leçons via `illustrationUrl`.
- `TEST_ACCOUNTS.md` : recense les comptes de test (admin, démo, tout débloqué) et comment les recréer.

### Corrigé
- `apps/mobile/src/features/mascot/anatomie.ts` : les numéros de leçon des dialogues personnalisés de la mascotte étaient calés sur une ancienne version du parcours (avant l'ajout des sections "en profondeur"). La plupart des répliques ne se déclenchaient jamais, y compris le message de fin de parcours. Remappé sur les 44 leçons actuelles.
- 9 questions du parcours Anatomie utilisaient un intitulé générique identique répété 2 à 4 fois dans une même section ("Quelle affirmation est vraie ?", "Quelle paire est correcte ?", etc.) ; reformulées pour être spécifiques à leur sujet, réponses inchangées.

## [Non publié] - 2026-08-29 (audit)

### Corrigé
- Script `apps/api/prisma/create-completed-account.ts` : les quiz et checkpoints déjà réussis étaient resoumis à chaque exécution, ce qui gonflait l'XP du compte indéfiniment sans changement de contenu (25 245 XP après 3 exécutions sur un contenu inchangé). Le script vérifie désormais qu'un résultat parfait/réussi existe déjà avant de resoumettre.

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
