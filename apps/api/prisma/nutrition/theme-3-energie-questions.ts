import type { SeedQuestion } from "../anatomie-quiz-helpers";
import { qcm, tf, multi, order, match } from "../anatomie-quiz-helpers";
import { quiz20 } from "./quiz-bank";

type QcmDef = [
  prompt: string,
  correct: string,
  wrong: [string, string, string],
  explanation: string,
];
type TfDef = [prompt: string, isTrue: boolean, explanation: string];
type MultiDef = [
  prompt: string,
  correct: [string, string, ...string[]],
  wrong: [string, string, ...string[]],
  explanation: string,
];
type OrderDef = [
  prompt: string,
  steps: [string, string, string],
  explanation: string,
];
type MatchDef = [
  prompt: string,
  pairs: [[string, string], [string, string], [string, string]?],
  explanation: string,
];

type LessonQuizData = {
  qcms: [QcmDef, QcmDef, QcmDef, QcmDef, QcmDef, QcmDef, QcmDef, QcmDef];
  tfs: [TfDef, TfDef, TfDef, TfDef];
  multis: [MultiDef, MultiDef];
  orders: [OrderDef, OrderDef];
  matches: [MatchDef, MatchDef];
  reflections: [QcmDef, QcmDef];
};

const SLOTS = [0, 2, 1, 3, 1, 0, 3, 2, 0, 1] as const;

function buildLessonQuiz(data: LessonQuizData, offset = 0): SeedQuestion[] {
  return quiz20(
    ...data.qcms.map(([prompt, correct, wrong, explanation], index) =>
      qcm(prompt, correct, wrong, explanation, SLOTS[(index + offset) % SLOTS.length]),
    ),
    ...data.tfs.map(([prompt, isTrue, explanation]) => tf(prompt, isTrue, explanation)),
    ...data.multis.map(([prompt, correct, wrong, explanation]) =>
      multi(prompt, correct, wrong, explanation),
    ),
    ...data.orders.map(([prompt, steps, explanation]) => order(prompt, steps, explanation)),
    ...data.matches.map(([prompt, pairs, explanation]) => match(prompt, pairs, explanation)),
    ...data.reflections.map(([prompt, correct, wrong, explanation], index) =>
      qcm(prompt, correct, wrong, explanation, SLOTS[(index + offset + 8) % SLOTS.length]),
    ),
  );
}

const metabolismeBasal = buildLessonQuiz({
  qcms: [
    [
      "Que représente le métabolisme basal ?",
      "L'énergie dépensée au repos pour vivre",
      ["Les calories d'une séance jambes", "Le sucre dans le sang après un repas", "Le poids des muscles uniquement"],
      "Le métabolisme basal couvre les fonctions vitales au repos.",
    ],
    [
      "Le métabolisme basal inclut-il l'entraînement ?",
      "Non, il est hors séance",
      ["Oui, toute la musculation", "Oui, seulement le cardio", "Oui, uniquement les étirements"],
      "Il correspond à une dépense de repos, avant d'ajouter l'activité.",
    ],
    [
      "Quel tissu influence souvent le métabolisme basal ?",
      "La masse musculaire",
      ["La couleur des cheveux", "La taille des chaussures", "Le goût sucré"],
      "Le muscle est métaboliquement actif, même si l'effet reste progressif.",
    ],
    [
      "Une formule de métabolisme basal donne quoi ?",
      "Une estimation",
      ["Une vérité exacte", "Une mesure de force maximale", "Un diagnostic médical complet"],
      "Les formules donnent un point de départ, pas une mesure parfaite.",
    ],
    [
      "Quel facteur influence le métabolisme basal ?",
      "L'âge",
      ["La marque des haltères", "L'heure du dernier message", "La couleur de l'assiette"],
      "Âge, sexe, taille, poids et composition corporelle influencent l'estimation.",
    ],
    [
      "Pourquoi deux personnes du même poids peuvent avoir un MB différent ?",
      "Leur composition corporelle peut varier",
      ["Le riz n'a pas la même couleur", "L'eau change de calories", "Le sommeil ne compte jamais"],
      "Plus ou moins de masse maigre peut modifier la dépense au repos.",
    ],
    [
      "Quel organe dépense beaucoup d'énergie au repos ?",
      "Le cerveau",
      ["Les cheveux", "Les ongles uniquement", "Les dents uniquement"],
      "Les fonctions vitales du cerveau et des organes comptent fortement.",
    ],
    [
      "Dans un calcul de besoins, le MB sert surtout à quoi ?",
      "De base avant l'activité",
      ["De nombre final garanti", "De remplacement des calories mangées", "De règle pour bannir les glucides"],
      "On ajoute ensuite l'activité et d'autres composantes.",
    ],
  ],
  tfs: [
    ["Le métabolisme basal existe même sans faire de sport.", true, "Le corps dépense de l'énergie pour rester en vie."],
    ["Le métabolisme basal est exactement mesuré par toutes les applications.", false, "Les applications utilisent souvent des équations estimatives."],
    ["Plus de masse musculaire peut augmenter légèrement la dépense de repos.", true, "Le muscle contribue à la dépense, sans effet magique."],
    ["Le métabolisme basal correspond aux calories brûlées pendant une séance.", false, "La séance appartient à la dépense liée à l'activité."],
  ],
  multis: [
    [
      "Quels facteurs entrent souvent dans une estimation du MB ?",
      ["Poids", "Taille"],
      ["Couleur des yeux", "Marque du shaker"],
      "Les équations utilisent des données corporelles simples.",
    ],
    [
      "Quelles idées sont justes sur le MB ?",
      ["C'est une dépense de repos", "C'est une estimation utile"],
      ["C'est la séance de musculation", "C'est toujours identique pour tous"],
      "Le MB est un repère, pas une certitude individuelle.",
    ],
  ],
  orders: [
    [
      "Utilise le MB dans une estimation de besoins.",
      ["Estimer le métabolisme basal", "Ajouter un facteur d'activité", "Ajuster avec l'évolution du poids"],
      "Le calcul démarre l'estimation, le suivi la corrige.",
    ],
    [
      "Compare deux estimations de MB.",
      ["Regarder poids, taille, âge et sexe", "Considérer la masse musculaire", "Garder une marge d'erreur"],
      "Les écarts sont normaux car ce ne sont pas des mesures directes.",
    ],
  ],
  matches: [
    [
      "Associe terme et sens.",
      [["Métabolisme basal", "Repos"], ["Masse musculaire", "Influence possible"], ["Formule", "Estimation"]],
      "Ces repères évitent de confondre repos et activité.",
    ],
    [
      "Associe facteur et effet probable.",
      [["Plus de masse maigre", "MB un peu plus élevé"], ["Vieillissement", "MB souvent plus bas"], ["Taille élevée", "Dépense souvent plus grande"]],
      "Les tendances existent, mais l'individu reste à suivre.",
    ],
  ],
  reflections: [
    [
      "Une application annonce 1783 kcal de MB. Quelle interprétation est la plus juste ?",
      "C'est un ordre de grandeur à ajuster",
      ["C'est exact au calorie près", "C'est la dépense d'une séance", "C'est le maximum à manger"],
      "Les équations guident, mais le suivi réel confirme.",
    ],
    [
      "Pourquoi un pratiquant plus musclé peut-il avoir besoin de plus d'énergie au repos ?",
      "La masse maigre demande de l'énergie pour être maintenue",
      ["Le muscle contient du sucre pur", "Les haltères brûlent des calories", "La graisse ne pèse rien"],
      "La composition corporelle influence la dépense de base.",
    ],
  ],
});

const depenseEnergetique = buildLessonQuiz({
  qcms: [
    [
      "La dépense énergétique totale comprend quoi ?",
      "MB, activité et thermogenèse alimentaire",
      ["Protéines uniquement", "Eau et fibres seulement", "Le poids de la balance"],
      "La dépense totale additionne plusieurs composantes.",
    ],
    [
      "Pourquoi la dépense énergétique varie-t-elle d'un jour à l'autre ?",
      "L'activité et le contexte changent",
      ["Les calories disparaissent", "Les protéines n'existent plus", "Le MB devient zéro"],
      "Sommeil, pas, séance et chaleur peuvent faire varier la dépense.",
    ],
    [
      "Que signifie TEF ?",
      "Thermogenèse liée à l'alimentation",
      ["Temps d'étirement fixe", "Total eau filtrée", "Tension énergétique finale"],
      "La digestion et l'assimilation coûtent un peu d'énergie.",
    ],
    [
      "Quelle composante est souvent la plus grande ?",
      "Le métabolisme basal",
      ["La mastication seule", "La couleur des aliments", "Le bruit de la salle"],
      "Chez beaucoup de personnes, le MB représente la majorité de la dépense.",
    ],
    [
      "Quel élément fait partie de l'activité hors sport ?",
      "Marcher dans la journée",
      ["Digérer un repas", "Dormir immobile", "Mesurer son shaker"],
      "Les mouvements du quotidien comptent dans la dépense.",
    ],
    [
      "Quel exemple augmente la dépense de la journée ?",
      "Aller travailler à pied",
      ["Manger plus vite", "Choisir une assiette bleue", "Regarder une vidéo de sport"],
      "Le mouvement réel augmente la dépense.",
    ],
    [
      "Pourquoi ne pas se fier à une seule journée de dépenses estimées ?",
      "Elle peut être atypique",
      ["Elle est toujours fausse de 1000 kcal", "Elle remplace le suivi", "Elle supprime le besoin de manger"],
      "Une moyenne sur plusieurs jours donne un repère plus stable.",
    ],
    [
      "Que mesure une montre connectée pour la dépense ?",
      "Une estimation avec marge d'erreur",
      ["Une valeur parfaite", "Le muscle gagné", "Les vitamines absorbées"],
      "Les capteurs aident, mais ne sont pas une référence absolue.",
    ],
  ],
  tfs: [
    ["La dépense totale est plus large que le métabolisme basal.", true, "Elle ajoute activité et thermogenèse alimentaire."],
    ["Deux journées avec le même repas ont toujours la même dépense.", false, "Les pas, séances et mouvements changent la dépense."],
    ["La digestion consomme une petite part d'énergie.", true, "C'est la thermogenèse alimentaire."],
    ["Une montre donne toujours les calories exactes.", false, "C'est une estimation utile mais imparfaite."],
  ],
  multis: [
    [
      "Quelles composantes appartiennent à la dépense énergétique ?",
      ["Métabolisme basal", "Activité physique"],
      ["Couleur des aliments", "Prix des courses"],
      "La dépense vient surtout du repos, du mouvement et de la digestion.",
    ],
    [
      "Quels éléments peuvent faire varier la dépense ?",
      ["Nombre de pas", "Séance de musculation"],
      ["Nom du programme", "Goût vanille"],
      "Le mouvement et l'entraînement sont des variables importantes.",
    ],
  ],
  orders: [
    [
      "Estime une dépense totale.",
      ["Partir du métabolisme basal", "Ajouter activité et TEF", "Comparer au suivi réel"],
      "Le calcul initial doit être validé par l'évolution dans le temps.",
    ],
    [
      "Analyse une journée plus dépensière.",
      ["Noter pas et entraînement", "Comparer à une journée calme", "Ajuster la moyenne hebdomadaire"],
      "La moyenne évite de surinterpréter une journée isolée.",
    ],
  ],
  matches: [
    [
      "Associe composante et exemple.",
      [["MB", "Fonctions vitales"], ["Activité", "Marche et séance"], ["TEF", "Digestion"]],
      "La dépense totale combine ces blocs.",
    ],
    [
      "Associe outil et limite.",
      [["Montre", "Estimation"], ["Formule", "Point de départ"], ["Poids moyen", "Retour terrain"]],
      "Les outils guident, mais le suivi corrige.",
    ],
  ],
  reflections: [
    [
      "Un jour avec séance jambes et 14000 pas, que peut-on attendre ?",
      "Une dépense plus élevée que d'habitude",
      ["Un MB à zéro", "Une digestion annulée", "Un besoin en eau nul"],
      "L'activité augmente la dépense totale.",
    ],
    [
      "Quel usage est le plus intelligent des calories affichées par une montre ?",
      "Les utiliser comme tendance, pas comme vérité exacte",
      ["Manger exactement ce nombre", "Ignorer tout suivi", "Les additionner deux fois"],
      "Les estimations sont utiles si on garde leur marge d'erreur.",
    ],
  ],
}, 1);

const activitePhysique = buildLessonQuiz({
  qcms: [
    [
      "Que désigne le NEAT ?",
      "Les mouvements hors sport structuré",
      ["La digestion des protéines", "Le métabolisme basal pur", "La quantité d'eau bue"],
      "Le NEAT inclut marche, escaliers, ménage et gestes quotidiens.",
    ],
    [
      "Quel exemple augmente le NEAT ?",
      "Prendre les escaliers",
      ["Dormir plus immobile", "Manger plus salé", "Sauter les légumes"],
      "Les escaliers ajoutent du mouvement sans séance formelle.",
    ],
    [
      "La séance de musculation appartient à quoi ?",
      "L'activité physique planifiée",
      ["La thermogenèse alimentaire", "La couleur des repas", "La digestion passive"],
      "Une séance est une dépense d'activité volontaire.",
    ],
    [
      "Pourquoi la marche compte-t-elle en nutrition sportive ?",
      "Elle influence la dépense quotidienne",
      ["Elle remplace toutes les protéines", "Elle supprime les calories des repas", "Elle transforme l'eau en muscle"],
      "La marche peut modifier beaucoup la dépense hebdomadaire.",
    ],
    [
      "Quel changement simple augmente l'activité sans salle ?",
      "Marcher 10 minutes après un repas",
      ["Boire un soda", "Rester assis plus longtemps", "Sauter le petit-déjeuner"],
      "Un petit ajout de marche est facile à répéter.",
    ],
    [
      "Que peut-il se passer en déficit calorique ?",
      "Le NEAT peut baisser spontanément",
      ["Le corps ne bouge plus jamais", "La digestion devient gratuite", "Les muscles ne consomment plus rien"],
      "Certaines personnes bougent moins sans s'en rendre compte.",
    ],
    [
      "Quel indicateur suit l'activité quotidienne ?",
      "Le nombre de pas",
      ["Le nombre de fourchettes", "La couleur du t-shirt", "Le goût du café"],
      "Les pas donnent un repère simple du mouvement quotidien.",
    ],
    [
      "Quel duo combine bien activité planifiée et NEAT ?",
      "Musculation + marche quotidienne",
      ["Sommeil + soda", "Repos total + bonbons", "Télévision + huile"],
      "Les deux composantes se complètent.",
    ],
  ],
  tfs: [
    ["Le NEAT peut représenter une vraie différence entre deux personnes.", true, "Deux personnes peuvent s'entraîner pareil mais marcher très différemment."],
    ["Seules les séances comptent dans la dépense.", false, "Le mouvement quotidien compte aussi."],
    ["Prendre les escaliers est un exemple de NEAT.", true, "C'est une activité non sportive mais réelle."],
    ["Marcher davantage remplace automatiquement un plan alimentaire.", false, "L'alimentation reste à ajuster avec l'activité."],
  ],
  multis: [
    [
      "Quels exemples relèvent du NEAT ?",
      ["Marcher pour les courses", "Prendre les escaliers"],
      ["Digérer un repas", "Dormir"],
      "Le NEAT correspond aux mouvements du quotidien.",
    ],
    [
      "Quels outils aident à suivre l'activité ?",
      ["Nombre de pas", "Journal des séances"],
      ["Couleur des chaussures", "Taille de l'assiette"],
      "Pas et séances donnent une vision plus complète.",
    ],
  ],
  orders: [
    [
      "Augmente l'activité hebdomadaire sans te cramer.",
      ["Ajouter de la marche facile", "Garder les séances clés", "Réévaluer fatigue et faim"],
      "L'activité doit rester récupérable.",
    ],
    [
      "Analyse une stagnation en sèche.",
      ["Comparer les pas moyens", "Vérifier les séances", "Ajuster calories ou activité"],
      "Le NEAT peut baisser et masquer le déficit prévu.",
    ],
  ],
  matches: [
    [
      "Associe activité et catégorie.",
      [["Squat en salle", "Séance"], ["Escaliers", "NEAT"], ["Marche au travail", "NEAT"]],
      "La dépense d'activité ne se limite pas à la salle.",
    ],
    [
      "Associe action et effet.",
      [["Plus de pas", "Dépense accrue"], ["Séance lourde", "Besoin de récupération"], ["Déficit agressif", "NEAT parfois réduit"]],
      "Le corps ajuste souvent son comportement.",
    ],
  ],
  reflections: [
    [
      "Deux amis font le même programme, mais l'un marche 12000 pas et l'autre 3000. Que retenir ?",
      "Leur dépense totale peut être très différente",
      ["Ils ont forcément le même besoin calorique", "La marche ne compte jamais", "Le plus actif doit supprimer les protéines"],
      "Le NEAT peut créer un écart important.",
    ],
    [
      "Quel ajustement est pertinent pour bouger plus sans nuire à la récupération ?",
      "Ajouter de la marche douce",
      ["Ajouter une séance maximale chaque jour", "Supprimer le sommeil", "Ne plus manger de glucides"],
      "La marche augmente la dépense avec une fatigue limitée.",
    ],
  ],
}, 2);

const thermogeneseAlimentaire = buildLessonQuiz({
  qcms: [
    [
      "Que représente la thermogenèse alimentaire ?",
      "L'énergie utilisée pour digérer et assimiler",
      ["L'énergie d'un sprint", "Le métabolisme basal exact", "La transpiration en sauna"],
      "Digérer, absorber et stocker les nutriments coûte un peu d'énergie.",
    ],
    [
      "Quel macronutriment coûte généralement le plus à digérer ?",
      "Les protéines",
      ["L'alcool", "Les lipides", "L'eau"],
      "Les protéines ont un effet thermique plus élevé que glucides et lipides.",
    ],
    [
      "L'effet thermique des aliments est-il énorme ?",
      "Non, il reste modeste",
      ["Oui, il annule tous les repas", "Oui, il remplace le sport", "Oui, il rend les calories inutiles"],
      "Il compte, mais ne transforme pas le bilan énergétique à lui seul.",
    ],
    [
      "Quel exemple illustre la TEF ?",
      "Dépenser de l'énergie pour digérer un repas",
      ["Monter les escaliers", "Soulever une barre", "Transpirer au soleil"],
      "La TEF est liée au traitement du repas.",
    ],
    [
      "Pourquoi un repas protéiné peut légèrement augmenter la dépense après repas ?",
      "Les protéines demandent plus de traitement",
      ["Elles contiennent zéro calorie", "Elles se transforment en eau", "Elles bloquent la digestion"],
      "Le coût digestif des protéines est plus élevé.",
    ],
    [
      "Quelle phrase est la plus exacte ?",
      "La TEF fait partie de la dépense totale",
      ["La TEF est une séance cachée", "La TEF supprime le besoin de bouger", "La TEF ne dépend jamais des repas"],
      "Elle est une composante réelle mais limitée.",
    ],
    [
      "Quel repas déclenche une TEF ?",
      "Tout repas contenant des nutriments",
      ["Seulement l'eau pure", "Seulement le sommeil", "Seulement une séance"],
      "Dès qu'il y a digestion et assimilation, il y a un coût.",
    ],
    [
      "Pourquoi ne pas baser une stratégie sur la TEF seule ?",
      "Son effet est trop faible seul",
      ["Elle est dangereuse", "Elle empêche l'entraînement", "Elle annule la satiété"],
      "Le déficit ou le surplus vient surtout du bilan global.",
    ],
  ],
  tfs: [
    ["Les protéines ont généralement un effet thermique plus élevé.", true, "Leur digestion et transformation coûtent plus d'énergie."],
    ["La thermogenèse alimentaire permet de manger sans limite.", false, "Elle ne compense qu'une partie modeste du repas."],
    ["La TEF appartient à la dépense énergétique totale.", true, "Elle s'ajoute au MB et à l'activité."],
    ["Les lipides ont toujours un effet thermique supérieur aux protéines.", false, "C'est généralement l'inverse."],
  ],
  multis: [
    [
      "Quelles affirmations sur la TEF sont correctes ?",
      ["Elle concerne la digestion", "Elle est modeste"],
      ["Elle remplace le NEAT", "Elle rend les calories nulles"],
      "La TEF existe, mais son impact reste limité.",
    ],
    [
      "Quels facteurs peuvent influencer la TEF d'un repas ?",
      ["Quantité de protéines", "Taille du repas"],
      ["Couleur de la table", "Nom de l'application"],
      "La composition et la quantité du repas jouent.",
    ],
  ],
  orders: [
    [
      "Place la TEF dans le calcul de dépense.",
      ["Estimer le MB", "Ajouter activité quotidienne", "Inclure la TEF comme part modeste"],
      "La TEF ne doit pas être isolée du reste.",
    ],
    [
      "Analyse un repas protéiné.",
      ["Identifier la source de protéines", "Noter les autres macronutriments", "Garder une vision du total calorique"],
      "Un coût digestif plus élevé ne rend pas le repas gratuit.",
    ],
  ],
  matches: [
    [
      "Associe macronutriment et TEF générale.",
      [["Protéines", "Plus élevée"], ["Glucides", "Intermédiaire"], ["Lipides", "Plus faible"]],
      "Ces tendances restent générales et ne remplacent pas le bilan.",
    ],
    [
      "Associe concept et exemple.",
      [["TEF", "Digérer un repas"], ["NEAT", "Marcher"], ["MB", "Fonctions vitales au repos"]],
      "Chaque composante décrit une dépense différente.",
    ],
  ],
  reflections: [
    [
      "Quel conseil est juste si quelqu'un veut maigrir seulement grâce à la digestion des protéines ?",
      "Garder les protéines, mais créer un déficit global",
      ["Manger sans limite", "Arrêter toute activité", "Boire moins d'eau"],
      "La TEF aide un peu, mais le bilan énergétique reste central.",
    ],
    [
      "Pourquoi les protéines restent-elles utiles en sèche au-delà de la TEF ?",
      "Elles soutiennent satiété et masse musculaire",
      ["Elles n'ont aucune calorie", "Elles remplacent le sommeil", "Elles empêchent toute faim"],
      "Leur intérêt principal dépasse le simple coût digestif.",
    ],
  ],
}, 3);

const besoinsCaloriques = buildLessonQuiz({
  qcms: [
    [
      "Comment estime-t-on souvent les besoins caloriques ?",
      "Métabolisme basal multiplié par un facteur d'activité",
      ["Poids divisé par l'âge uniquement", "Nombre de repas multiplié par deux", "Taille des chaussures en calories"],
      "MB x facteur d'activité donne un repère de départ.",
    ],
    [
      "Que représente le facteur d'activité ?",
      "Un ajustement selon le mouvement et les séances",
      ["La quantité de protéines du repas", "La couleur du shaker", "Le nombre d'heures de cuisine"],
      "Il adapte le MB au niveau d'activité global.",
    ],
    [
      "Pourquoi ajuster l'estimation après quelques semaines ?",
      "Le poids et les performances donnent un retour réel",
      ["La formule change chaque jour", "Les calories n'existent plus", "Le facteur devient toujours 1"],
      "Le suivi permet de corriger une estimation imparfaite.",
    ],
    [
      "Quel profil aura souvent un facteur d'activité plus élevé ?",
      "Travail actif + entraînements réguliers",
      ["Repos complet permanent", "Sommeil toute la journée", "Aucune marche"],
      "Plus le mouvement est élevé, plus le facteur augmente.",
    ],
    [
      "Que faire si le poids monte trop vite en surplus ?",
      "Réduire légèrement les calories",
      ["Doubler le surplus", "Arrêter les protéines", "Ne plus boire"],
      "Un ajustement modéré limite le gain de gras inutile.",
    ],
    [
      "Que faire si le poids ne bouge pas malgré un déficit prévu ?",
      "Réévaluer apports, activité et moyenne du poids",
      ["Conclure après un seul jour", "Supprimer toute fibre", "Augmenter l'huile sans compter"],
      "La moyenne et l'adhérence doivent être vérifiées.",
    ],
    [
      "Quel repère valide mieux les besoins que la formule seule ?",
      "L'évolution moyenne du poids",
      ["La météo uniquement", "La couleur des aliments", "Le nombre de vidéos vues"],
      "Le poids moyen sur plusieurs jours reflète le bilan à long terme.",
    ],
    [
      "Pourquoi les besoins ne sont-ils pas fixes à vie ?",
      "Poids, activité et objectif évoluent",
      ["Les aliments changent de calories", "L'eau devient énergétique", "Le muscle ne compte jamais"],
      "Les besoins suivent les changements de corps et de mode de vie.",
    ],
  ],
  tfs: [
    ["MB x facteur d'activité donne un point de départ.", true, "Ce calcul doit ensuite être ajusté."],
    ["Le facteur d'activité est identique pour tous.", false, "Il dépend du mouvement quotidien et des séances."],
    ["Un besoin calorique estimé peut être corrigé par le suivi.", true, "Le terrain prime sur la formule."],
    ["Une journée de poids suffit à conclure sur les besoins.", false, "Les fluctuations d'eau rendent une journée peu fiable."],
  ],
  multis: [
    [
      "Quels éléments aident à ajuster les calories ?",
      ["Poids moyen", "Niveau d'activité"],
      ["Couleur du téléphone", "Forme de l'assiette"],
      "Les données utiles sont liées au corps et au comportement.",
    ],
    [
      "Quels signes peuvent montrer une estimation trop basse ?",
      ["Perte de poids trop rapide", "Fatigue qui monte"],
      ["Meilleure hydratation", "Assiette plus colorée"],
      "Un déficit trop agressif peut nuire à l'énergie et aux performances.",
    ],
  ],
  orders: [
    [
      "Définis un besoin calorique de départ.",
      ["Estimer le MB", "Appliquer un facteur d'activité", "Suivre le poids moyen"],
      "L'estimation devient utile quand elle est testée.",
    ],
    [
      "Ajuste une prise de masse trop rapide.",
      ["Calculer la tendance du poids", "Réduire légèrement l'apport", "Recontrôler sur deux semaines"],
      "Les petits ajustements évitent de réagir trop fort.",
    ],
  ],
  matches: [
    [
      "Associe profil et facteur probable.",
      [["Sédentaire", "Plus bas"], ["Très actif", "Plus haut"], ["Actif modéré", "Intermédiaire"]],
      "Le facteur reflète la dépense au-delà du repos.",
    ],
    [
      "Associe suivi et utilité.",
      [["Poids moyen", "Tendance"], ["Carnet alimentaire", "Apports"], ["Pas quotidiens", "Activité"]],
      "Croiser les données rend l'ajustement plus fiable.",
    ],
  ],
  reflections: [
    [
      "Une formule donne 2600 kcal, mais le poids baisse vite. Que faire ?",
      "Revoir l'estimation et augmenter un peu si ce n'est pas voulu",
      ["Ignorer le suivi", "Réduire encore fortement", "Arrêter la musculation"],
      "La réponse du corps corrige le calcul.",
    ],
    [
      "Pourquoi commencer par un repère plutôt que chercher la calorie parfaite ?",
      "Parce que l'ajustement progressif est plus fiable",
      ["Parce que les calories sont imaginaires", "Parce que l'activité ne compte pas", "Parce que le poids ne varie jamais"],
      "Un bon plan évolue avec les données réelles.",
    ],
  ],
}, 4);

const balanceEnergetique = buildLessonQuiz({
  qcms: [
    [
      "Que compare la balance énergétique ?",
      "Les entrées et les sorties d'énergie",
      ["Les vitamines et minéraux", "Les protéines animales et végétales", "La couleur des aliments"],
      "Elle compare calories consommées et énergie dépensée.",
    ],
    [
      "Sur quelle durée la balance énergétique est-elle plus utile ?",
      "Sur plusieurs jours ou semaines",
      ["Sur une seule bouchée", "Sur une minute", "Uniquement pendant la séance"],
      "Les tendances se lisent mieux avec une moyenne.",
    ],
    [
      "Pourquoi le poids fluctue-t-il sans changer de gras ?",
      "Eau, glycogène et sel varient",
      ["La balance invente toujours", "Le muscle disparaît chaque nuit", "Les calories deviennent nulles"],
      "Les variations rapides viennent souvent de l'eau et du contenu digestif.",
    ],
    [
      "Que se passe-t-il si les entrées dépassent régulièrement les sorties ?",
      "Le poids tend à augmenter",
      ["Le poids baisse toujours", "Le corps annule tout", "La digestion s'arrête"],
      "Un surplus répété favorise une hausse de poids.",
    ],
    [
      "Que se passe-t-il si les sorties dépassent régulièrement les entrées ?",
      "Le poids tend à diminuer",
      ["Le poids augmente forcément", "Le muscle double en un jour", "L'eau disparaît pour toujours"],
      "Un déficit répété favorise une baisse de poids.",
    ],
    [
      "Pourquoi regarder la moyenne de poids ?",
      "Pour lisser les fluctuations d'eau",
      ["Pour cacher les données", "Pour éviter de manger", "Pour mesurer les vitamines"],
      "La moyenne donne une tendance plus propre que le poids du jour.",
    ],
    [
      "Quel facteur peut faire monter le poids après un gros repas salé ?",
      "Rétention d'eau",
      ["Gain de gras instantané massif", "Perte de glycogène certaine", "Muscle créé sans entraînement"],
      "Le sel et les glucides peuvent augmenter l'eau retenue.",
    ],
    [
      "La balance énergétique explique quoi principalement ?",
      "La tendance du poids corporel",
      ["La qualité de chaque micronutriment", "La technique du squat", "La couleur des urines uniquement"],
      "Elle reste centrale pour comprendre les variations de poids.",
    ],
  ],
  tfs: [
    ["Une journée plus lourde sur la balance peut venir de l'eau.", true, "Le poids varie avec glycogène, sel et digestion."],
    ["La balance énergétique se juge parfaitement sur un seul jour.", false, "Il faut regarder la tendance."],
    ["Entrées et sorties d'énergie influencent la tendance du poids.", true, "C'est le principe du bilan énergétique."],
    ["Une hausse de 1 kg en une nuit est forcément 1 kg de gras.", false, "Un kilo de gras en une nuit est très improbable."],
  ],
  multis: [
    [
      "Quels éléments font varier le poids à court terme ?",
      ["Eau", "Glycogène"],
      ["Couleur de l'assiette", "Nom de la salle"],
      "Ces variations peuvent masquer la perte ou le gain réel.",
    ],
    [
      "Quels suivis aident à comprendre la balance énergétique ?",
      ["Apports alimentaires", "Poids moyen"],
      ["Nombre de notifications", "Marque des chaussures"],
      "Apports et tendance du poids donnent du contexte.",
    ],
  ],
  orders: [
    [
      "Lis correctement une tendance de poids.",
      ["Se peser dans des conditions similaires", "Calculer une moyenne", "Comparer sur plusieurs semaines"],
      "La méthode réduit le bruit quotidien.",
    ],
    [
      "Analyse une stagnation apparente.",
      ["Vérifier la moyenne du poids", "Contrôler apports et activité", "Ajuster seulement si la tendance bloque"],
      "On évite de réagir à une fluctuation isolée.",
    ],
  ],
  matches: [
    [
      "Associe situation et effet probable.",
      [["Surplus répété", "Poids en hausse"], ["Déficit répété", "Poids en baisse"], ["Maintien", "Poids plutôt stable"]],
      "Ce sont des tendances, pas des garanties au jour près.",
    ],
    [
      "Associe variation rapide et cause possible.",
      [["Plus de glucides", "Glycogène + eau"], ["Repas salé", "Eau retenue"], ["Transit lent", "Contenu digestif"]],
      "Le court terme n'est pas toujours du gras.",
    ],
  ],
  reflections: [
    [
      "Après une pizza, le poids monte le lendemain. Quelle lecture est la plus probable ?",
      "Eau et contenu digestif expliquent une grande partie",
      ["Tout est du gras", "Le métabolisme basal est nul", "Le muscle a disparu"],
      "Sel, glucides et volume du repas influencent le poids du lendemain.",
    ],
    [
      "Quelle approche est la plus fiable pour savoir si un déficit marche ?",
      "Comparer la moyenne de poids sur plusieurs semaines",
      ["Se peser une fois après une séance", "Ignorer les apports", "Changer tout chaque matin"],
      "La tendance hebdomadaire limite les conclusions hâtives.",
    ],
  ],
}, 5);

const deficitMaintienSurplus = buildLessonQuiz({
  qcms: [
    [
      "Quels sont les trois états de la balance énergétique ?",
      "Déficit, maintien et surplus",
      ["Hydratation, fibres et sommeil", "Force, vitesse et souplesse", "Calcium, fer et sodium"],
      "Ces trois états décrivent le rapport entre apports et dépenses.",
    ],
    [
      "Que vise généralement un déficit calorique ?",
      "Une perte de poids",
      ["Une hausse rapide de gras", "Une stabilisation obligatoire", "Une suppression du besoin en protéines"],
      "Quand les sorties dépassent les entrées, le poids tend à baisser.",
    ],
    [
      "Que vise généralement un surplus contrôlé ?",
      "Faciliter la prise de masse musculaire",
      ["Accélérer uniquement la perte de gras", "Annuler l'entraînement", "Supprimer les glucides"],
      "Un surplus apporte l'énergie utile pour construire, surtout avec entraînement.",
    ],
    [
      "Que signifie maintien calorique ?",
      "Apports proches des dépenses",
      ["Zéro calorie", "Un repas unique", "Aucune variation d'eau"],
      "Au maintien, la tendance de poids reste globalement stable.",
    ],
    [
      "En surplus, tout le poids gagné est-il du muscle ?",
      "Non, une partie peut être du gras",
      ["Oui, toujours", "Oui, sans entraînement", "Oui, si on mange tard"],
      "Le rythme du surplus et l'entraînement influencent la composition du gain.",
    ],
    [
      "En déficit, qu'aide à préserver l'entraînement ?",
      "La masse musculaire",
      ["La rétention d'eau uniquement", "Le goût sucré", "La couleur des légumes"],
      "La musculation envoie un signal de maintien musculaire.",
    ],
    [
      "Quel déficit est souvent plus durable ?",
      "Un déficit modéré",
      ["Un déficit extrême permanent", "Aucune protéine", "Zéro eau"],
      "Un déficit modéré limite fatigue, faim et baisse de performance.",
    ],
    [
      "Quel surplus limite mieux le gain de gras inutile ?",
      "Un surplus léger et suivi",
      ["Un surplus massif non contrôlé", "Un surplus de soda uniquement", "Un surplus sans entraînement"],
      "Un surplus contrôlé soutient la progression sans excès inutile.",
    ],
  ],
  tfs: [
    ["L'entraînement aide à préserver le muscle pendant un déficit.", true, "Le signal mécanique reste important."],
    ["Un surplus garantit que tout le poids gagné est du muscle.", false, "Le gras peut aussi augmenter, surtout si le surplus est trop grand."],
    ["Le maintien correspond à une tendance de poids plutôt stable.", true, "Les fluctuations quotidiennes restent normales."],
    ["Un déficit exige de supprimer tous les féculents.", false, "Le déficit dépend du total énergétique, pas d'une interdiction unique."],
  ],
  multis: [
    [
      "Quelles pratiques aident en déficit ?",
      ["Garder la musculation", "Assurer assez de protéines"],
      ["Arrêter de dormir", "Supprimer toute eau"],
      "En déficit, le corps doit recevoir des signaux et matériaux pour préserver le muscle.",
    ],
    [
      "Quelles pratiques rendent un surplus plus qualitatif ?",
      ["Surplus léger", "Progression à l'entraînement"],
      ["Calories illimitées", "Aucune protéine"],
      "La qualité du gain dépend du contexte alimentaire et sportif.",
    ],
  ],
  orders: [
    [
      "Mets en place un déficit raisonnable.",
      ["Estimer le maintien", "Retirer une quantité modérée", "Suivre poids, faim et performance"],
      "Le suivi permet d'éviter un déficit trop agressif.",
    ],
    [
      "Lance un surplus contrôlé.",
      ["Estimer le maintien", "Ajouter un petit surplus", "Ajuster selon la vitesse de prise"],
      "La vitesse de prise guide la suite.",
    ],
  ],
  matches: [
    [
      "Associe état et tendance.",
      [["Déficit", "Poids en baisse"], ["Maintien", "Poids stable"], ["Surplus", "Poids en hausse"]],
      "Les tendances se lisent sur plusieurs semaines.",
    ],
    [
      "Associe objectif et priorité.",
      [["Perte de gras", "Déficit modéré"], ["Recomposition", "Entraînement + protéines"], ["Prise de masse", "Surplus contrôlé"]],
      "L'objectif détermine le réglage énergétique.",
    ],
  ],
  reflections: [
    [
      "Un pratiquant veut prendre du muscle et mange 1500 kcal au-dessus de son maintien. Quel risque augmente ?",
      "Prendre du gras inutilement",
      ["Ne jamais récupérer", "Perdre toute eau", "Annuler les protéines"],
      "Un surplus trop élevé dépasse souvent la capacité de construction musculaire.",
    ],
    [
      "En sèche, quel choix protège le mieux la masse musculaire ?",
      "Déficit modéré, protéines suffisantes et musculation",
      ["Déficit extrême sans entraînement", "Zéro glucide obligatoire", "Sauter l'eau et le sommeil"],
      "La combinaison réduit le risque de perdre du muscle.",
    ],
  ],
}, 6);

export const THEME_3_QUIZZES: SeedQuestion[][] = [
  metabolismeBasal,
  depenseEnergetique,
  activitePhysique,
  thermogeneseAlimentaire,
  besoinsCaloriques,
  balanceEnergetique,
  deficitMaintienSurplus,
];
