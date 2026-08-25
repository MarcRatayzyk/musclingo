import type { NutritionSeedLesson } from "./types";
import { CP } from "./checkpoints";
import { qcm, fillBlank, tf, quiz6 } from "../anatomie-quiz-helpers";

export const THEME_5_LESSONS: NutritionSeedLesson[] = [
  {
    title: "Fibres solubles et insolubles",
    subtitle: "Deux familles, deux rôles.",
    markdown: `Les **fibres** sont des parties de végétaux que l'intestin humain ne digère pas. On les classe en **solubles** et **insolubles**, chacune avec un rôle différent.

---

Les fibres **solubles** (avoine, pommes, légumineuses, psyllium) se dissolvent dans l'eau et forment un **gel** dans l'intestin. Elles ralentissent l'absorption du sucre et du gras.

---

Les fibres **insolubles** (blé complet, légumes feuillus, noix) ne se dissolvent pas. Elles **absorbent de l'eau** et donnent du volume aux selles, ce qui aide le transit.

---

La plupart des aliments végétaux contiennent **un mélange** des deux types. Manger varié (fruits, légumes, céréales complètes, légumineuses) couvre les deux besoins.

---

En musculation, les fibres améliorent la **digestion** et la **satiété** sans ajouter beaucoup de calories. Utile en période de sèche pour calmer la faim.

---

À retenir : solubles = gel et ralentissement ; insolubles = volume et transit. Les deux comptent pour une digestion confortable.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 29,
    xpReward: 30,
    tags: ["fibres", "solubles", "insolubles"],
    sources: [
      "Slavin — Fiber and prebiotics: mechanisms and health benefits (2013)",
    ],
    ...CP.fibres,
    questions: quiz6(
      qcm(
        "Les fibres solubles…",
        "Forment un gel dans l'intestin",
        ["Passent sans effet", "Sont digérées comme des protéines", "Remplacent les glucides"],
        "Gel = ralentit sucre et gras.",
      ),
      qcm(
        "Les fibres insolubles aident surtout…",
        "Le transit intestinal",
        ["La production de testostérone", "Le stockage de glycogène", "La respiration"],
        "Volume des selles + absorption d'eau.",
      ),
      qcm(
        "Un bon apport en fibres combine souvent…",
        "Solubles et insolubles",
        ["Uniquement du sucre", "Zéro légume", "Que des protéines"],
        "Alimentation variée = les deux types.",
      ),
      fillBlank(
        "Les fibres ___ (avoine, légumineuses) ralentissent l'absorption du sucre.",
        "solubles",
        ["insolubles seules", "animales", "liquides"],
        "Gel intestinal = glycémie plus stable.",
      ),
      tf(
        "Le corps humain digère complètement les fibres alimentaires.",
        false,
        "Faux : elles traversent l'intestin largement intactes.",
      ),
      tf(
        "Les fibres peuvent aider à calmer la faim en période de déficit calorique.",
        true,
        "Vrai : satiété sans beaucoup de calories.",
      ),
    ),
  },
  {
    title: "Satiété",
    subtitle: "Pourquoi certains repas calent plus.",
    markdown: `La **satiété** est la sensation de repas qui dure après avoir mangé. Elle dépend du **volume**, de la **composition** du repas et de signaux envoyés à l'intestin et au cerveau.

---

Les **fibres** et les **protéines** augmentent la satiété plus que les glucides rapides seuls. Un repas riche en légumes et en protéines « remplit » plus longtemps.

---

Les **lipides** prolongent aussi la satiété en ralentissant la vidange de l'estomac. Mais ils apportent beaucoup de calories : l'équilibre compte.

---

Le **volume** compte : une assiette volumineuse mais peu calorique (soupe, salade, légumes) peut calmer la faim sans excès calorique.

---

La satiété n'est pas instantanée : le cerveau met **15 à 20 minutes** à recevoir le signal « assez mangé ». Manger lentement aide à ne pas dépasser ses besoins.

---

À retenir : satiété = volume + protéines + fibres + lipides modérés + temps. En sèche ou en prise de masse, comprendre ces leviers aide à gérer la faim sans frustration.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 30,
    xpReward: 30,
    tags: ["satiete", "appetit", "repas"],
    sources: [
      "Slavin — Fiber and prebiotics: mechanisms and health benefits (2013)",
    ],
    ...CP.fibres,
    questions: quiz6(
      qcm(
        "La satiété dépend notamment de…",
        "La composition et le volume du repas",
        ["La couleur de l'assiette", "L'heure exacte du coucher", "La marque de complément"],
        "Fibres, protéines, lipides et volume influencent la durée de satiété.",
      ),
      qcm(
        "Les protéines et les fibres…",
        "Augmentent la satiété",
        ["Suppriment toute faim en 1 seconde", "Remplacent l'eau", "Empêchent la digestion"],
        "Repas plus « tenants » sans forcément plus de calories.",
      ),
      qcm(
        "Le signal « assez mangé » met environ…",
        "15 à 20 minutes",
        ["1 seconde", "3 heures", "24 heures"],
        "Manger lentement laisse le temps au cerveau de réagir.",
      ),
      fillBlank(
        "Les ___ ralentissent la vidange de l'estomac et prolongent la satiété.",
        "lipides",
        ["vitamines C", "eau seule", "sel seul"],
        "Repas gras = digestion plus lente.",
      ),
      tf(
        "Un repas volumineux en légumes peut aider la satiété avec peu de calories.",
        true,
        "Vrai : volume sans densité calorique élevée.",
      ),
      tf(
        "Seuls les glucides rapides procurent une satiété durable.",
        false,
        "Faux : ils calment peu comparés aux protéines et fibres.",
      ),
    ),
  },
  {
    title: "Transit",
    subtitle: "Le parcours des aliments non digérés.",
    markdown: `Le **transit** intestinal désigne le temps que mettent les aliments et leurs résidus à traverser le tube digestif, de la bouche à l'évacuation.

---

Un transit **trop lent** peut provoquer constipation, lourdeur et ballonnements. Un transit **trop rapide** peut réduire l'absorption de certains nutriments.

---

Les fibres **insolubles** et l'**eau** accélèrent et facilitent le transit en donnant du volume et de la souplesse aux selles.

---

Un apport soudain et très élevé en fibres sans assez d'eau peut provoquer l'effet inverse : **ballonnements** et inconfort. Mieux vau augmenter progressivement.

---

L'**activité physique** stimule aussi le transit : la marche, le cardio léger et même la musculation aident le système digestif à rester actif.

---

À retenir : transit confortable = fibres progressives + eau suffisante + mouvement. Un intestin qui fonctionne bien améliore le confort au quotidien et à l'entraînement.`,
    durationSec: 85,
    difficulty: "INTERMEDIATE",
    order: 31,
    xpReward: 30,
    tags: ["transit", "constipation", "digestion"],
    sources: [
      "Slavin — Fiber and prebiotics: mechanisms and health benefits (2013)",
    ],
    ...CP.fibres,
    questions: quiz6(
      qcm(
        "Un transit trop lent peut provoquer…",
        "Constipation et ballonnements",
        ["Plus de muscle", "Moins de soif", "Une glycémie nulle"],
        "Selles rares ou dures = transit ralenti.",
      ),
      qcm(
        "Pour faciliter le transit, il faut surtout…",
        "Fibres et eau suffisante",
        ["Supprimer tous les légumes", "Boire uniquement du jus", "Ne plus manger de protéines"],
        "Volume + hydratation = selles plus souples.",
      ),
      qcm(
        "L'activité physique…",
        "Stimule le transit intestinal",
        ["L'arrête complètement", "Remplace les fibres", "Supprime la digestion"],
        "Mouvement = intestin plus actif.",
      ),
      fillBlank(
        "Augmenter les fibres trop vite sans eau peut causer des ___.",
        "ballonnements",
        ["cramps musculaires", "pics de force", "carences en fer"],
        "Progression douce + hydratation = clé.",
      ),
      tf(
        "Boire de l'eau n'a aucun effet sur le transit.",
        false,
        "Faux : les fibres absorbent l'eau, il faut en boire assez.",
      ),
      tf(
        "Il vaut mieux augmenter les fibres progressivement.",
        true,
        "Vrai : adaptation intestinale sur quelques jours.",
      ),
    ),
  },
  {
    title: "Microbiote",
    subtitle: "Les milliards de bactéries utiles.",
    markdown: `Le **microbiote intestinal** regroupe des milliards de **bactéries** qui vivent dans ton intestin, surtout le côlon. Ce n'est pas un ennemi : une grande partie est **bénéfique**.

---

Ces bactéries participent à la **digestion** de certains aliments (notamment les fibres), produisent des **vitamines** (comme la vitamine K) et aident à **protéger** la paroi intestinale.

---

Un microbiote **varié** (beaucoup d'espèces différentes) est associé à une meilleure santé digestive et immunitaire. La diversité alimentaire nourrit cette diversité microbienne.

---

Les **antibiotiques**, le stress prolongé, un régime très pauvre en fibres ou en variété peuvent **appauvrir** le microbiote. L'alimentation joue un rôle majeur pour le maintenir.

---

Les **probiotiques** (bactéries vivantes dans yaourts, kéfir) et **prébiotiques** (fibres qui les nourrissent) peuvent aider dans certains cas, mais une alimentation variée reste la base.

---

À retenir : ton intestin abrite un écosystème vivant. Manger des fibres, des légumes variés et limiter les excès ultra-transformés soutient un microbiote en forme.`,
    durationSec: 90,
    difficulty: "ADVANCED",
    order: 32,
    xpReward: 35,
    tags: ["microbiote", "bacteries", "intestin"],
    sources: [
      "Hills et al. — Gut microbiome and nutrition (2019)",
    ],
    ...CP.fibres,
    questions: quiz6(
      qcm(
        "Le microbiote intestinal est surtout composé de…",
        "Bactéries bénéfiques",
        ["Muscles", "Os", "Graisse pure"],
        "Écosystème microbien dans le côlon.",
      ),
      qcm(
        "Un microbiote varié est associé à…",
        "Une meilleure santé digestive",
        ["Moins de force musculaire automatique", "Zéro besoin de fibres", "Une digestion impossible"],
        "Diversité microbienne = résilience intestinale.",
      ),
      qcm(
        "Les prébiotiques sont…",
        "Des fibres qui nourrissent les bonnes bactéries",
        ["Des antibiotiques", "Des protéines animales", "Du sel"],
        "Fibres = carburant du microbiote.",
      ),
      fillBlank(
        "Certaines bactéries intestinales produisent des ___, comme la vitamine K.",
        "vitamines",
        ["muscles", "os", "hormones stéroïdiennes seules"],
        "Microbiote = partenaire nutritionnel.",
      ),
      tf(
        "Toutes les bactéries intestinales sont dangereuses pour la santé.",
        false,
        "Faux : la majorité est utile ou neutre.",
      ),
      tf(
        "Une alimentation variée en légumes et fibres soutient le microbiote.",
        true,
        "Vrai : diversité alimentaire = diversité microbienne.",
      ),
    ),
  },
  {
    title: "Fermentation",
    subtitle: "Quand les fibres deviennent des acides gras.",
    markdown: `Quand les **fibres solubles** arrivent dans le côlon, les bactéries du microbiote les **fermentent**. Ce processus produit des **gaz** et des **acides gras à chaîne courte** (AGCC).

---

Les **AGCC** (butyrate, propionate, acétate) nourrissent les cellules de la paroi intestinale et ont des effets positifs sur l'**inflammation** et le **métabolisme**.

---

La fermentation produit aussi des **gaz** (hydrogène, méthane…). Un peu de gaz est normal ; des ballonnements excessifs peuvent venir d'un apport brutal en fibres ou de certains aliments (légumineuses, choux).

---

Les aliments **fermentés** (choucroute, kimchi, yaourt, kéfir) contiennent parfois des bactéries vivantes. Ils complètent une alimentation riche en fibres, sans remplacer celle-ci.

---

Trop peu de fibres = peu de fermentation = moins d'AGCC produits. Trop de fibres d'un coup = fermentation intense = inconfort temporaire.

---

À retenir : la fermentation intestinale transforme les fibres en composés utiles pour ta santé. Progression et variété évitent l'inconfort digestif.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 33,
    xpReward: 35,
    tags: ["fermentation", "agcc", "fibres"],
    sources: [
      "Slavin — Fiber and prebiotics: mechanisms and health benefits (2013)",
    ],
    ...CP.fibres,
    questions: quiz6(
      qcm(
        "La fermentation des fibres produit surtout…",
        "Des acides gras à chaîne courte (AGCC)",
        ["Du glucose pur", "Des protéines musculaires", "De l'alcool"],
        "AGCC = carburant des cellules intestinales.",
      ),
      qcm(
        "Les AGCC ont notamment un effet sur…",
        "La paroi intestinale et l'inflammation",
        ["La couleur des yeux", "La taille des os seule", "La vitesse de course seule"],
        "Butyrate nourrit les cellules du côlon.",
      ),
      qcm(
        "Des ballonnements après légumineuses peuvent venir de…",
        "La fermentation intestinale",
        ["Un manque total de fibres", "Trop de protéines seules", "L'absence d'eau dans le corps"],
        "Fermentation = gaz, normal en quantité modérée.",
      ),
      fillBlank(
        "Les aliments ___ (yaourt, choucroute) peuvent contenir des bactéries vivantes.",
        "fermentés",
        ["frits", "surgelés seuls", "industriels sucrés"],
        "Complément possible, pas substitut aux fibres.",
      ),
      tf(
        "La fermentation intestinale est toujours nocive.",
        false,
        "Faux : elle produit des composés bénéfiques (AGCC).",
      ),
      tf(
        "Augmenter les fibres progressivement limite l'inconfort digestif.",
        true,
        "Vrai : le microbiote s'adapte sur quelques jours.",
      ),
    ),
  },
  {
    title: "Santé digestive",
    subtitle: "Intestin en forme au quotidien.",
    markdown: `Une **santé digestive** solide, c'est un confort au quotidien : pas de douleurs chroniques, un transit régulier, peu de ballonnements gênants.

---

Les piliers : **alimentation variée** (fibres, légumes, fruits), **eau** suffisante, **mastication** et repas pas trop rapides, **activité physique** régulière.

---

Les aliments **ultra-transformés**, très pauvres en fibres, peuvent perturber le microbiote et le confort intestinal sur le long terme.

---

Le **stress** chronique influence aussi la digestion via l'axe intestin-cerveau. Ballonnements et transit irrégulier peuvent s'aggraver en période de stress intense.

---

En musculation, un intestin confortable évite les **distractions** à la séance (crampes, urgences) et favorise une meilleure absorption des nutriments.

---

À retenir : digestion saine = variété alimentaire + eau + mouvement + gestion du stress. Ce n'est pas un détail : c'est la base pour utiliser correctement ce que tu manges.`,
    durationSec: 85,
    difficulty: "ADVANCED",
    order: 34,
    xpReward: 35,
    tags: ["sante-digestive", "intestin", "confort"],
    sources: [
      "Hills et al. — Gut microbiome and nutrition (2019)",
    ],
    ...CP.fibres,
    questions: quiz6(
      qcm(
        "Les piliers d'une bonne santé digestive incluent…",
        "Variété alimentaire, eau et activité physique",
        ["Zéro légume", "Repas uniquement liquides", "Supprimer toutes les fibres"],
        "Base lifestyle + alimentation.",
      ),
      qcm(
        "Les aliments ultra-transformés…",
        "Peuvent perturber le confort intestinal",
        ["Remplacent tous les légumes", "Guérissent le stress", "Augmentent toujours le muscle"],
        "Pauvres en fibres, riches en additifs.",
      ),
      qcm(
        "Le stress chronique peut…",
        "Aggraver les troubles digestifs",
        ["Améliorer toujours la digestion", "Remplacer les fibres", "Supprimer le microbiote utile"],
        "Axe intestin-cerveau = lien bidirectionnel.",
      ),
      fillBlank(
        "Mâcher lentement et prendre le temps de manger améliore le ___.",
        "confort digestif",
        ["1RM au squat", "stock de glycogène", "taux de testostérone"],
        "Digestion commence par la mastication.",
      ),
      tf(
        "Un intestin confortable favorise une meilleure absorption des nutriments.",
        true,
        "Vrai : paroi saine + transit régulier = absorption optimale.",
      ),
      tf(
        "La santé digestive n'a aucun impact sur l'entraînement.",
        false,
        "Faux : inconfort digestif peut gêner les séances.",
      ),
    ),
  },
];
