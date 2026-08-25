import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_7_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Perte de poids",
    subtitle: "Déficit, protéines et muscle.",
    markdown: `Perdre du poids, c'est surtout créer un **déficit calorique** : manger un peu moins d'énergie que tu en dépenses sur la semaine. Le corps puise alors dans ses réserves, surtout le gras.

---

Sans **protéines suffisantes** (environ 1,6 à 2,2 g/kg selon l'activité), une partie de la perte peut venir du **muscle**, pas seulement du gras. L'entraînement lourd envoie le signal inverse : garder le muscle.

---

Un déficit **trop agressif** (> 25 % des calories) fatigue, augmente la faim et peut faire **plateau** plus vite. Un déficit modéré (10 à 20 %) est souvent plus durable.

---

Les **fibres** et les **légumes** aident à calmer la faim sans beaucoup de calories. L'**eau** et le **sommeil** comptent aussi pour tenir un déficit sans craquer.

---

La balance fluctue au quotidien (eau, sel, transit). Ce qui compte, c'est la **tendance** sur plusieurs semaines, pas un jour isolé.

---

À retenir : perte de poids = déficit modéré + protéines + entraînement lourd. L'objectif est de perdre surtout du gras, pas le muscle gagné à la salle.`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 43,
    xpReward: 35,
    tags: ["perte-poids", "deficit", "seche"],
    sources: [
      "Helms et al. — Evidence-based recommendations for natural bodybuilding (2014)",
    ],
    ...CP.objectifs,
    questions: quiz6(
      qcm(
        "Perdre du poids repose surtout sur…",
        "Un déficit calorique",
        ["Supprimer toutes les protéines", "Ne plus s'entraîner", "Boire uniquement du jus"],
        "Moins d'entrées que de sorties = perte de masse.",
      ),
      qcm(
        "Sans protéines suffisantes en déficit, on risque de perdre…",
        "Du muscle en plus du gras",
        ["Uniquement de l'eau", "Rien du tout", "Uniquement des vitamines"],
        "Acides aminés = préservation musculaire.",
      ),
      qcm(
        "Un déficit calorique modéré recommandé tourne souvent autour de…",
        "10 à 20 %",
        ["80 à 90 %", "0 % toujours", "100 %"],
        "Déficit agressif = fatigue et plateau.",
      ),
      fillBlank(
        "L'entraînement lourd en déficit envoie le signal de ___ le muscle.",
        "garder",
        ["supprimer", "ignorer", "remplacer"],
        "Stimulus = corps conserve les fibres sollicitées.",
      ),
      tf(
        "Un déficit très agressif est toujours plus efficace sur le long terme.",
        false,
        "Faux : modéré = plus durable et moins de perte musculaire.",
      ),
      tf(
        "Les fibres et légumes aident à gérer la faim en déficit.",
        true,
        "Vrai : volume sans excès calorique.",
      ),
    ),
  },
  {
    title: "Prise de masse",
    subtitle: "Surplus intelligent, pas excès.",
    markdown: `La **prise de masse** combine entraînement progressif, protéines suffisantes et **surplus calorique** modéré. Sans surplus, le corps manque d'énergie pour construire du nouveau tissu.

---

Un surplus de **200 à 500 kcal/jour** suffit souvent aux pratiquants intermédiaires. Au-delà, l'excédent devient surtout du **gras**, pas du muscle supplémentaire.

---

Le corps ne peut construire du muscle qu'à un **rythme limité** (quelques centaines de grammes par mois chez un pratiquant avancé). Plus de calories ne signifie pas plus de muscle au-delà de ce plafond.

---

Répartir les **protéines** sur la journée (3 à 5 prises) et maintenir des **glucides** suffisants pour l'entraînement lourd.

---

Une alimentation **variée** évite les carences en vitamines et minéraux, même en surplus. Ne pas se limiter à riz et poulet pendant des mois.

---

À retenir : prise de masse = surplus modéré + protéines + entraînement. L'excès calorique au-delà du besoin stocke surtout du gras.`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 44,
    xpReward: 35,
    tags: ["prise-masse", "surplus", "hypertrophie"],
    sources: [
      "Garthe et al. — Effect of nutritional intervention on body composition (2011)",
    ],
    ...CP.objectifs,
    questions: quiz6(
      qcm(
        "La prise de masse nécessite…",
        "Surplus calorique + protéines + entraînement",
        ["Uniquement des compléments", "Zéro glucide", "Arrêter l'entraînement"],
        "Trois piliers : stimulus, briques, énergie.",
      ),
      qcm(
        "Un surplus modéré recommandé tourne souvent autour de…",
        "200 à 500 kcal/jour",
        ["2000 à 3000 kcal de surplus", "0 kcal", "50 kcal seulement"],
        "Au-delà = surtout du gras.",
      ),
      qcm(
        "L'excédent calorique au-delà du besoin devient surtout…",
        "Du gras",
        ["Du muscle illimité", "De l'eau pure", "Des vitamines"],
        "Rythme de construction musculaire plafonné.",
      ),
      fillBlank(
        "Répartir les protéines sur ___ prises dans la journée est une bonne pratique.",
        "3 à 5",
        ["1 seule", "20", "0"],
        "Apport régulier d'acides aminés.",
      ),
      tf(
        "Plus de calories signifie toujours plus de muscle, sans limite.",
        false,
        "Faux : le corps a un plafond de construction.",
      ),
      tf(
        "Une alimentation variée évite les carences même en prise de masse.",
        true,
        "Vrai : micronutriments importants pour la progression.",
      ),
    ),
  },
  {
    title: "Performance sportive",
    subtitle: "Carburer l'effort à la salle.",
    markdown: `Pour performer à la **musculation**, le corps a besoin de **glycogène** musculaire, de **protéines** pour réparer, d'**eau** et d'électrolytes, et parfois de **caféine** pour réduire la fatigue perçue.

---

Avant une séance lourde, un repas **1 à 3 h** avant avec glucides et protéines fournit de l'énergie sans lourdeur digestive.

---

Pendant une séance classique (< 90 min), le corps utilise surtout le **glycogène déjà stocké**. Pas besoin de manger en séance sauf effort très long.

---

Après l'effort, **protéines + glucides** sur plusieurs heures aident à recharger le glycogène et à réparer les fibres. La « fenêtre » dure des heures, pas 5 minutes.

---

La **déshydratation** légère (1 à 2 % du poids) baisse déjà la force. Boire régulièrement, surtout en chaleur.

---

À retenir : performance = glycogène rempli + protéines + hydratation. Le total de la journée compte plus que le timing parfait.`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 45,
    xpReward: 35,
    tags: ["performance", "glycogene", "timing"],
    sources: [
      "Burke et al. — Carbohydrates for training and competition (2011)",
      "ISSN Position Stand — Nutrient timing (2017)",
    ],
    ...CP.objectifs,
    questions: quiz6(
      qcm(
        "Pendant une séance de musculation classique, le muscle utilise surtout…",
        "Son glycogène stocké",
        ["Le repas en cours de digestion", "Uniquement le gras", "Les vitamines"],
        "Réserve locale = carburant des séries.",
      ),
      qcm(
        "Avant une séance lourde, un repas idéal est pris…",
        "1 à 3 heures avant",
        ["30 secondes avant", "Pendant la séance", "12 heures après"],
        "Temps de digestion suffisant.",
      ),
      qcm(
        "Une déshydratation légère (1–2 % du poids)…",
        "Réduit la force",
        ["Double la performance", "N'a aucun effet", "Augmente le glycogène"],
        "Eau = milieu de la contraction musculaire.",
      ),
      fillBlank(
        "Après l'effort, protéines et ___ aident à recharger les réserves.",
        "glucides",
        ["alcool", "sel seul", "fibres seules"],
        "Glucides = reconstitution du glycogène.",
      ),
      tf(
        "Il faut manger dans les 5 minutes après la séance sinon les gains disparaissent.",
        false,
        "Faux : la fenêtre post-effort dure plusieurs heures.",
      ),
      tf(
        "Le total nutritionnel de la journée compte plus que le timing exact.",
        true,
        "Vrai : base solide > perfection horaire.",
      ),
    ),
  },
  {
    title: "Santé cardio",
    subtitle: "Cœur, vaisseaux et assiette.",
    markdown: `La **santé cardiovasculaire** dépend de l'alimentation : trop de sel, de sucres ajoutés et de graisses saturées augmente le risque de maladies cardiaques et d'AVC sur le long terme.

---

Privilégier **fruits, légumes, légumineuses, céréales complètes, poissons gras, oléagineux** et huile d'olive. Ce schéma type « méditerranéen » est bien documenté.

---

Limiter **charcuterie, fritures, pâtisseries, sodas** et produits ultra-transformés riches en sel, sucre et graisses saturées.

---

Les **oméga-3** (poissons gras) et les graisses **insaturées** (olive, avocat) sont favorables. Remplacer les saturées par des insaturées a un effet positif.

---

L'**activité physique**, y compris la musculation, améliore aussi la santé cardio (pression, profil lipidique, sensibilité à l'insuline).

---

À retenir : cœur en forme = alimentation variée, peu transformée, riche en végétaux et oméga-3. La musculation complète, ne remplace pas, une bonne alimentation.`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 46,
    xpReward: 35,
    tags: ["sante-cardio", "coeur", "oméga-3"],
    sources: [
      "ANSES — Lipides et santé (2011)",
    ],
    ...CP.objectifs,
    questions: quiz6(
      qcm(
        "Un régime favorable au cœur privilégie…",
        "Fruits, légumes, légumineuses, poissons gras",
        ["Charcuterie quotidienne", "Sodas à chaque repas", "Fritures en excès"],
        "Schéma méditerranéen bien documenté.",
      ),
      qcm(
        "Les oméga-3 se trouvent surtout dans…",
        "Poissons gras (saumon, sardines)",
        ["Sucre blanc", "Chips", "Sodas light"],
        "EPA/DHA = protection cardiovasculaire.",
      ),
      qcm(
        "La musculation…",
        "Améliore aussi la santé cardio",
        ["Nuit toujours au cœur", "Remplace l'alimentation", "Supprime le besoin de légumes"],
        "Effet sur pression, lipides, insuline.",
      ),
      fillBlank(
        "Limiter le ___ ajouté protège la santé cardiovasculaire.",
        "sel",
        ["calcium", "fer seul", "zinc seul"],
        "Excès de sodium = tension et rétention d'eau.",
      ),
      tf(
        "Les produits ultra-transformés sont neutres pour le cœur.",
        false,
        "Faux : souvent riches en sel, sucre et saturées.",
      ),
      tf(
        "Remplacer graisses saturées par insaturées a un effet positif.",
        true,
        "Vrai : qualité lipidique compte.",
      ),
    ),
  },
  {
    title: "Glycémie",
    subtitle: "Stabilité et objectifs de santé.",
    markdown: `Une **glycémie stable** sur la journée favorise l'énergie constante, limite les fringales et protège la santé métabolique sur le long terme.

---

Les repas très riches en **glucides rapides** seuls (pain blanc, sucre, jus) font monter puis chuter la glycémie vite. Résultat : coup de barre et faim prématurée.

---

Associer **fibres, protéines et lipides** aux glucides ralentit l'absorption du sucre. Un repas équilibré = courbe glycémique plus douce.

---

L'**activité physique** améliore la **sensibilité à l'insuline** : le muscle utilise mieux le glucose, ce qui aide à stabiliser la glycémie.

---

En cas de **prédiabète** ou diabète, le suivi médical et diététique prime. Les principes généraux (fibres, activité, limiter sucres ajoutés) restent valables.

---

À retenir : glycémie stable = repas équilibrés + mouvement + limiter sucres ajoutés. Utile pour l'énergie à l'entraînement et la santé à long terme.`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 47,
    xpReward: 35,
    tags: ["glycemie", "insuline", "equilibre"],
    sources: [
      "American Diabetes Association — Standards of Care (2024)",
    ],
    ...CP.objectifs,
    questions: quiz6(
      qcm(
        "Une glycémie stable favorise…",
        "Énergie constante et moins de fringales",
        ["Uniquement la perte de cheveux", "Zéro besoin de fibres", "La suppression du muscle"],
        "Pics et chutes = fatigue et faim.",
      ),
      qcm(
        "Pour ralentir la montée glycémique, on associe glucides à…",
        "Fibres, protéines et lipides",
        ["Uniquement du sucre", "De l'alcool", "Rien du tout"],
        "Repas mixte = absorption progressive.",
      ),
      qcm(
        "L'activité physique améliore…",
        "La sensibilité à l'insuline",
        ["Uniquement la couleur de la peau", "Le stock de graisse obligatoire", "La digestion des os"],
        "Muscle actif = meilleure utilisation du glucose.",
      ),
      fillBlank(
        "Les repas très riches en glucides ___ seuls provoquent des pics glycémiques rapides.",
        "rapides",
        ["lents", "complexes", "fibres"],
        "Pain blanc, sucre, jus = montée brusque.",
      ),
      tf(
        "L'entraînement régulier n'a aucun effet sur la glycémie.",
        false,
        "Faux : sensibilité à l'insuline améliorée.",
      ),
      tf(
        "En cas de diabète, le suivi médical reste indispensable.",
        true,
        "Vrai : conseils généraux ne remplacent pas un avis pro.",
      ),
    ),
  },
  {
    title: "Vieillissement",
    subtitle: "Nutrition après 40 ans.",
    markdown: `Avec l'**âge**, le corps **perd progressivement du muscle** (sarcopénie) si on ne s'entraîne pas et si l'apport protéique baisse. La nutrition joue un rôle clé pour ralentir ce déclin.

---

Les besoins en **protéines** peuvent **augmenter** chez les seniors actifs (autour de 1,2 à 1,6 g/kg ou plus selon l'activité) pour maintenir la masse musculaire.

---

La **vitamine D** et le **calcium** soutiennent les **os**. Le **B12** (viande, poisson, œufs, ou supplément si végétarien strict) peut manquer avec l'âge par baisse d'absorption.

---

Les **antioxydants** (fruits, légumes colorés) et les **oméga-3** aident à moduler l'inflammation chronique liée au vieillissement.

---

L'**hydratation** reste importante : la sensation de soif diminue parfois avec l'âge, sans que les besoins en eau baissent.

---

À retenir : après 40 ans, protéines + entraînement + vitamine D + alimentation variée = préserver muscle et os. Ce n'est jamais trop tard pour commencer.`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 48,
    xpReward: 35,
    tags: ["vieillissement", "sarcopenie", "seniors"],
    sources: [
      "Bauer et al. — Evidence-based recommendations for protein intake (2013)",
    ],
    ...CP.objectifs,
    questions: quiz6(
      qcm(
        "La sarcopénie désigne…",
        "La perte progressive de muscle avec l'âge",
        ["La croissance osseuse", "L'augmentation du gras seule", "La digestion rapide"],
        "Sans entraînement + protéines = déclin musculaire.",
      ),
      qcm(
        "Chez les seniors actifs, les besoins en protéines…",
        "Peuvent augmenter",
        ["Disparaissent", "Tombe à zéro", "Ne changent jamais"],
        "1,2 à 1,6 g/kg ou plus selon activité.",
      ),
      qcm(
        "La vitamine D et le calcium soutiennent surtout…",
        "Les os",
        ["Les cheveux seuls", "La digestion seule", "Le gras uniquement"],
        "Os fragiles = risque de fracture.",
      ),
      fillBlank(
        "La vitamine ___ peut manquer avec l'âge, surtout chez végétariens stricts.",
        "B12",
        ["C seule", "K seule", "A seule"],
        "Absorption et apports alimentaires variables.",
      ),
      tf(
        "Il est trop tard pour préserver le muscle après 40 ans.",
        false,
        "Faux : entraînement + protéines aident à tout âge.",
      ),
      tf(
        "La sensation de soif peut diminuer avec l'âge sans réduire les besoins en eau.",
        true,
        "Vrai : boire régulièrement même sans soif forte.",
      ),
    ),
  },
  {
    title: "Végétarisme",
    subtitle: "Muscu sans viande.",
    markdown: `Une alimentation **végétarienne** ou **végétalienne** peut soutenir la musculation si elle est **variée** et **bien planifiée**. Le défi principal : couvrir protéines, fer, B12, oméga-3 et parfois la vitamine D.

---

Combiner **légumineuses** (lentilles, pois chiches), **céréales** (riz, quinoa), **tofu, tempeh, seitan** et **produits laitiers/œufs** (si végétarien) apporte des protéines complètes sur la journée.

---

Le **fer** végétal (lentilles, épinards) s'absorbe mieux avec de la **vitamine C** (agrumes, poivron). Éviter thé/café juste au repas fer.

---

La **B12** est absente des végétaux : supplément recommandé en régime végan. En végétarien lacto-ovo, les produits animaux en apportent.

---

Les **oméga-3** (lin, chia, noix) complètent partiellement les poissons gras. Une alimentation riche en **calories** et **glucides** peut être nécessaire en prise de masse végétale (volume plus grand).

---

À retenir : muscu végétarienne = possible avec variété, protéines combinées, B12 (si végan) et attention au fer. Pas de handicap automatique si l'alimentation est solide.`,
    durationSec: 95,
    difficulty: "ADVANCED",
    order: 49,
    xpReward: 35,
    tags: ["vegetarisme", "vegan", "proteines-vegetales"],
    sources: [
      "Melina et al. — Position of the Academy of Nutrition and Dietetics: vegetarian diets (2016)",
    ],
    ...CP.objectifs,
    questions: quiz6(
      qcm(
        "En alimentation végétalienne, le nutriment souvent supplémenté est…",
        "La vitamine B12",
        ["Le sodium", "L'alcool", "Le sucre"],
        "Absente des végétaux purs.",
      ),
      qcm(
        "Pour couvrir les protéines végétales, on combine souvent…",
        "Légumineuses et céréales",
        ["Uniquement du sucre", "Eau seule", "Sel seul"],
        "Complémentarité des acides aminés sur la journée.",
      ),
      qcm(
        "Le fer végétal s'absorbe mieux avec…",
        "La vitamine C (agrumes, poivron)",
        ["Le thé au repas", "L'alcool", "Rien du tout"],
        "Vitamine C améliore l'absorption du fer non héminique.",
      ),
      fillBlank(
        "Tofu, tempeh et ___ sont des sources protéiques végétales.",
        "seitan",
        ["sucre", "sel", "eau"],
        "Alternatives à la viande pour les protéines.",
      ),
      tf(
        "On ne peut pas faire de musculation sans manger de viande.",
        false,
        "Faux : alimentation végétarienne bien planifiée suffit.",
      ),
      tf(
        "En prise de masse végétale, le volume alimentaire peut être plus grand.",
        true,
        "Vrai : aliments moins denses = plus de volume à manger.",
      ),
    ),
  },
];
