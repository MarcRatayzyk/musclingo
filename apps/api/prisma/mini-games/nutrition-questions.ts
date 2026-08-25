import { qcm, tf } from "../anatomie-quiz-helpers";
import { tagged, type MiniGameQuestionSeed } from "./types";

/** Densité calorique. */
const CALORIES = tagged("macros", [
  qcm(
    "1 g de lipides apporte…",
    "9 kcal",
    ["4 kcal", "7 kcal", "2 kcal"],
    "Les lipides sont la macro la plus dense en énergie.",
  ),
  qcm(
    "1 g de protéines apporte…",
    "4 kcal",
    ["9 kcal", "7 kcal", "0 kcal"],
    "Protéines et glucides apportent 4 kcal par gramme.",
  ),
  qcm(
    "1 g de glucides apporte…",
    "4 kcal",
    ["9 kcal", "7 kcal", "6 kcal"],
    "Comme les protéines : 4 kcal par gramme.",
  ),
  qcm(
    "1 g d'alcool apporte…",
    "7 kcal",
    ["4 kcal", "9 kcal", "0 kcal"],
    "L'alcool se situe entre les glucides et les lipides.",
  ),
  qcm(
    "100 g d'huile, c'est environ…",
    "900 kcal",
    ["400 kcal", "150 kcal", "1 500 kcal"],
    "L'huile est pratiquement 100 % de lipides.",
  ),
  qcm(
    "L'eau apporte…",
    "0 kcal",
    ["4 kcal pour 100 ml", "9 kcal pour 100 ml", "1 kcal par gramme"],
    "L'eau n'apporte aucune énergie.",
  ),
  tf(
    "Les lipides apportent plus de calories par gramme que les glucides.",
    true,
    "Vrai : 9 kcal contre 4 kcal.",
  ),
  tf(
    "Un aliment « 0 % de matières grasses » est forcément peu calorique.",
    false,
    "Faux : il peut être très sucré.",
  ),
]);

/** Macro dominante d'un aliment. */
const MACRO_DOMINANTE = tagged("macros", [
  qcm(
    "Macro dominante du blanc de poulet ?",
    "Protéines",
    ["Glucides", "Lipides", "Fibres"],
    "Le blanc de poulet est une source de protéines maigre.",
  ),
  qcm(
    "Macro dominante de l'huile d'olive ?",
    "Lipides",
    ["Protéines", "Glucides", "Fibres"],
    "L'huile est un lipide pur.",
  ),
  qcm(
    "Macro dominante du riz ?",
    "Glucides",
    ["Protéines", "Lipides", "Fibres"],
    "Le riz est avant tout une source de glucides.",
  ),
  qcm(
    "Macro dominante de l'avocat ?",
    "Lipides",
    ["Glucides", "Protéines", "Aucune"],
    "L'avocat est un fruit riche en bons lipides.",
  ),
  qcm(
    "Macro dominante des amandes ?",
    "Lipides",
    ["Protéines", "Glucides", "Fibres"],
    "Les oléagineux sont surtout des lipides.",
  ),
  qcm(
    "Macro dominante du fromage blanc 0 % ?",
    "Protéines",
    ["Lipides", "Glucides", "Fibres"],
    "Sans matière grasse, il reste surtout des protéines.",
  ),
  qcm(
    "Macro dominante de la banane ?",
    "Glucides",
    ["Protéines", "Lipides", "Fibres"],
    "La banane est un fruit riche en glucides.",
  ),
  qcm(
    "Macro dominante des pâtes ?",
    "Glucides",
    ["Protéines", "Lipides", "Fibres"],
    "Les pâtes sont une source de glucides.",
  ),
  qcm(
    "Macro dominante du beurre ?",
    "Lipides",
    ["Protéines", "Glucides", "Fibres"],
    "Le beurre est presque uniquement du lipide.",
  ),
  qcm(
    "Pour 100 g, lequel apporte le plus de protéines ?",
    "Blanc de poulet",
    ["Riz cuit", "Banane", "Huile d'olive"],
    "Environ 25 g de protéines pour 100 g.",
  ),
  qcm(
    "Quelle est une bonne source de protéines végétales ?",
    "Les lentilles",
    ["Le beurre", "Le miel", "L'huile de coco"],
    "Légumineuses et tofu sont des sources végétales.",
  ),
]);

/** Lecture d'étiquette. */
const ETIQUETTES = tagged("etiquettes", [
  qcm(
    "Sur une étiquette, les valeurs nutritionnelles sont données pour…",
    "100 g ou 100 ml",
    ["une portion type", "un repas complet", "un kilo"],
    "C'est la référence obligatoire, ce qui permet de comparer.",
  ),
  qcm(
    "« Dont sucres » est une sous-catégorie de…",
    "Glucides",
    ["Lipides", "Protéines", "Fibres"],
    "Les sucres sont une partie des glucides totaux.",
  ),
  qcm(
    "« Dont acides gras saturés » est une sous-catégorie de…",
    "Lipides",
    ["Glucides", "Protéines", "Sel"],
    "C'est une part des lipides totaux.",
  ),
  qcm(
    "Les ingrédients sont listés…",
    "par quantité décroissante",
    [
      "par ordre alphabétique",
      "par quantité croissante",
      "au hasard",
    ],
    "Le premier ingrédient est le plus présent.",
  ),
  qcm(
    "Si le sucre est le premier ingrédient, cela signifie…",
    "qu'il est le plus présent du produit",
    [
      "qu'il est le moins présent",
      "qu'il n'y en a que des traces",
      "que le produit est allégé",
    ],
    "L'ordre de la liste reflète les quantités.",
  ),
  tf(
    "Comparer deux produits pour 100 g est plus fiable que par portion.",
    true,
    "Vrai : les portions varient d'une marque à l'autre.",
  ),
]);

/** Micronutriments. */
const MICROS = tagged("micronutriments", [
  qcm(
    "Quelle vitamine est fabriquée grâce au soleil ?",
    "La vitamine D",
    ["La vitamine C", "La vitamine B12", "La vitamine A"],
    "La peau la synthétise sous l'effet des UV.",
  ),
  qcm(
    "Le fer sert surtout à…",
    "transporter l'oxygène dans le sang",
    [
      "solidifier les os",
      "digérer les graisses",
      "hydrater les muscles",
    ],
    "Il entre dans la composition de l'hémoglobine.",
  ),
  qcm(
    "Le calcium sert surtout à…",
    "la solidité des os et des dents",
    [
      "transporter l'oxygène",
      "produire des fibres",
      "stocker le glycogène",
    ],
    "C'est le minéral clé du squelette.",
  ),
  qcm(
    "Le zinc intervient surtout dans…",
    "la réparation des tissus et l'immunité",
    [
      "le transport de l'oxygène",
      "la solidité des os",
      "l'hydratation",
    ],
    "Il soutient la récupération et les défenses.",
  ),
  tf(
    "Manger varié couvre le plus souvent les besoins en micronutriments.",
    true,
    "Vrai : la variété est la meilleure stratégie.",
  ),
]);

/** Fibres et digestion. */
const DIGESTION = tagged("digestion", [
  qcm(
    "Les glucides sont digérés en…",
    "glucose",
    ["acides aminés", "acides gras", "glycérol"],
    "Le glucose est la forme absorbée.",
  ),
  qcm(
    "Les protéines sont digérées en…",
    "acides aminés",
    ["glucose", "acides gras", "fibres"],
    "Les acides aminés sont les briques du muscle.",
  ),
  qcm(
    "Les lipides sont digérés en…",
    "acides gras",
    ["glucose", "acides aminés", "vitamines"],
    "Ils sont découpés en acides gras et glycérol.",
  ),
  qcm(
    "Le glycogène est stocké dans…",
    "le muscle et le foie",
    ["la peau", "les os", "le cerveau"],
    "C'est la réserve de glucides mobilisable.",
  ),
  qcm(
    "Les fibres sont surtout fermentées par…",
    "le microbiote du côlon",
    ["l'estomac", "le foie", "les reins"],
    "Les bactéries intestinales les dégradent.",
  ),
  qcm(
    "On trouve surtout des fibres dans…",
    "légumes, fruits et céréales complètes",
    ["viande et poisson", "huiles", "produits laitiers"],
    "Les fibres sont d'origine végétale.",
  ),
  tf(
    "Les fibres apportent beaucoup de calories.",
    false,
    "Faux : leur apport énergétique est très faible.",
  ),
]);

/** Objectifs et balance énergétique. */
const OBJECTIFS = tagged("objectifs", [
  qcm(
    "Pour prendre du muscle, il faut viser…",
    "un léger surplus calorique",
    ["un gros déficit", "un jeûne complet", "aucun changement"],
    "Un léger surplus soutient la construction musculaire.",
  ),
  qcm(
    "Pour perdre du gras, il faut viser…",
    "un déficit calorique",
    ["un surplus calorique", "le maintien", "plus de lipides"],
    "Il faut dépenser plus que ce qui est apporté.",
  ),
  qcm(
    "Le maintien du poids correspond à…",
    "apports égaux aux dépenses",
    [
      "apports supérieurs aux dépenses",
      "apports inférieurs aux dépenses",
      "zéro glucide",
    ],
    "C'est l'équilibre de la balance énergétique.",
  ),
  qcm(
    "Le métabolisme de base, c'est…",
    "l'énergie dépensée au repos",
    [
      "l'énergie dépensée à l'entraînement",
      "les calories des aliments",
      "le poids du muscle",
    ],
    "C'est le coût de fonctionnement du corps au repos.",
  ),
  qcm(
    "Les protéines servent surtout à…",
    "réparer et construire les tissus",
    [
      "fournir l'énergie principale",
      "stocker les vitamines",
      "hydrater le corps",
    ],
    "C'est leur rôle structurel.",
  ),
]);

export const NUTRITION_MINI_GAME_QUESTIONS: MiniGameQuestionSeed[] = [
  ...CALORIES,
  ...MACRO_DOMINANTE,
  ...ETIQUETTES,
  ...MICROS,
  ...DIGESTION,
  ...OBJECTIFS,
];
