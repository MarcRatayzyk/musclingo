import { multi, order, tf, type SeedQuestion } from "../anatomie-quiz-helpers";

/** 2 TRUE_FALSE + 1 MULTI + 1 ORDER — pas de MATCH (les MATCH image restent appendés au thème 0). */
export type DiversifiedExtras = [
  SeedQuestion,
  SeedQuestion,
  SeedQuestion,
  SeedQuestion,
];

/** Thème 0 — Bras et avant-bras */
export const THEME_0_EXTRAS_0: DiversifiedExtras = [
  tf(
    "Le radius est du côté du pouce.",
    true,
    "Le radius est latéral, aligné avec le pouce ; l'ulna est du côté du petit doigt.",
  ),
  tf(
    "En pronation, la paume est orientée vers le haut.",
    false,
    "Pronation = paume vers le bas. Supination = paume vers le haut.",
  ),
  multi(
    "Quels os forment l'avant-bras ?",
    ["Le radius", "L'ulna"],
    ["L'humérus", "Le fémur"],
    "L'avant-bras est le couple radius / ulna. L'humérus est l'os unique du bras.",
  ),
  order(
    "Du haut vers le bas, ordonne ces segments du membre supérieur.",
    ["Bras (humérus)", "Avant-bras (radius / ulna)", "Main"],
    "La chaîne osseuse descend : humérus, puis radius/ulna, puis main.",
  ),
];

/** Thème 0 — Cage thoracique */
export const THEME_0_EXTRAS_1: DiversifiedExtras = [
  tf(
    "L'omoplate est verrouillée dans une cavité osseuse fixe.",
    false,
    "L'omoplate glisse librement sur la cage thoracique ; elle n'est pas emboîtée comme une hanche.",
  ),
  tf(
    "La clavicule relie le sternum à l'épaule.",
    true,
    "La clavicule transmet les forces du bras vers le tronc via le sternum.",
  ),
  multi(
    "Quels éléments appartiennent à la ceinture scapulaire ?",
    ["Omoplate", "Clavicule"],
    ["Sternum seul", "Fémur"],
    "La ceinture scapulaire = omoplate + clavicule, socle mobile du bras.",
  ),
  order(
    "Ordre des structures, de l'avant vers l'arrière de la cage.",
    ["Sternum", "Côtes", "Vertèbres thoraciques"],
    "Devant le sternum, sur les côtés les côtes, derrière les vertèbres thoraciques.",
  ),
];

/** Thème 0 — Bassin */
export const THEME_0_EXTRAS_2: DiversifiedExtras = [
  tf(
    "Les cinq vertèbres lombaires sont les plus massives de la colonne.",
    true,
    "L1–L5 portent le poids du tronc ; leur lordose doit rester proche du neutre sous charge.",
  ),
  tf(
    "Le sacrum est un os mobile indépendant du bassin.",
    false,
    "Le sacrum s'encastre entre les os coxaux et solidarise le bassin.",
  ),
  multi(
    "Quelles structures font partie du bassin osseux ?",
    ["Sacrum", "Os coxal (ilion)"],
    ["Patella", "Radius"],
    "Le bassin unit le sacrum aux os coxaux ; patella et radius sont ailleurs.",
  ),
  order(
    "De haut en bas, ordonne ces niveaux du rachis bas / bassin.",
    ["Vertèbres lombaires", "Sacrum", "Coccyx"],
    "Lombaires, puis sacrum, puis coccyx en bas.",
  ),
];

/** Thème 0 — Cuisse / genou / jambe */
export const THEME_0_EXTRAS_3: DiversifiedExtras = [
  tf(
    "Le fémur est l'os de la cuisse.",
    true,
    "Le fémur relie la hanche au genou ; c'est l'os le plus long du corps.",
  ),
  tf(
    "La fibula porte la majeure partie du poids du corps.",
    false,
    "C'est le tibia qui porte le poids ; la fibula sert surtout d'ancrage et de stabilité latérale.",
  ),
  multi(
    "Quels os participent au genou ?",
    ["Fémur", "Tibia", "Patella"],
    ["Radius"],
    "Le genou articule fémur, tibia et patella (rotule).",
  ),
  order(
    "Du haut vers le bas, ordonne les os du membre inférieur.",
    ["Fémur", "Tibia / fibula", "Pied"],
    "Cuisse (fémur), jambe (tibia/fibula), puis pied.",
  ),
];

export const THEME_0_EXTRAS: DiversifiedExtras[] = [
  THEME_0_EXTRAS_0,
  THEME_0_EXTRAS_1,
  THEME_0_EXTRAS_2,
  THEME_0_EXTRAS_3,
];

/** Thème 1 — Les bras */
export const THEME_1_EXTRAS_0: DiversifiedExtras = [
  tf(
    "Le triceps a trois chefs.",
    true,
    "Tri = trois : le triceps occupe la face postérieure du bras.",
  ),
  tf(
    "Le volume du bras vient surtout du biceps.",
    false,
    "La majorité du volume est derrière, du côté du triceps.",
  ),
  multi(
    "Quels exercices ciblent surtout le triceps ?",
    ["Dips", "Développé serré", "Extensions"],
    ["Curl biceps classique"],
    "Dips, développé serré et extensions étendent le coude : domaine du triceps.",
  ),
  order(
    "Ordre logique pour construire des bras : volume puis détail.",
    ["Travailler le triceps (volume)", "Travailler le biceps (galbe)", "Varier les prises"],
    "D’abord le volume (triceps), puis le galbe (biceps), puis la variété de prises.",
  ),
];

/** Thème 1 — Pectoraux et épaules */
export const THEME_1_EXTRAS_1: DiversifiedExtras = [
  tf(
    "Le grand pectoral est le muscle principal de la poitrine.",
    true,
    "Le grand pectoral couvre la face antérieure du thorax et pousse les bras en avant.",
  ),
  tf(
    "Le deltoïde moyen abaisse surtout les bras le long du corps.",
    false,
    "Le deltoïde moyen élève le bras sur le côté (abduction).",
  ),
  multi(
    "Quels muscles participent à une poussée horizontale type développé couché ?",
    ["Grand pectoral", "Triceps", "Deltoïde antérieur"],
    ["Grand dorsal"],
    "Pectoral, deltoïde antérieur et triceps coopèrent en poussée ; le dorsal est un tireur.",
  ),
  order(
    "Ordre d’activation typique d’un développé couché contrôlé.",
    ["Fixer les omoplates", "Descendre la barre", "Pousser jusqu’à l’extension"],
    "Stabiliser d’abord, descendre, puis pousser.",
  ),
];

/** Thème 1 — Tronc et abdominaux */
export const THEME_1_EXTRAS_2: DiversifiedExtras = [
  tf(
    "Le grand droit fléchit le tronc (crunch).",
    true,
    "Le grand droit rapproche le sternum du pubis : flexion du tronc.",
  ),
  tf(
    "Les obliques n’agissent que sur la respiration.",
    false,
    "Les obliques tournent et inclinent le tronc, et aident à la stabilité.",
  ),
  multi(
    "Quels muscles font partie de la sangle abdominale ?",
    ["Grand droit", "Obliques", "Transverse"],
    ["Grand fessier"],
    "Droit, obliques et transverse forment la sangle ; le fessier est à l’arrière.",
  ),
  order(
    "Du superficiel vers le profond, ordonne ces couches abdominales.",
    ["Grand droit / obliques externes", "Obliques internes", "Transverse"],
    "Les couches s’empilent : externes, puis internes, puis transverse en profondeur.",
  ),
];

/** Thème 1 — Le dos */
export const THEME_1_EXTRAS_3: DiversifiedExtras = [
  tf(
    "Le grand dorsal tire le bras vers le bas et l’arrière.",
    true,
    "Tractions et rowings : le grand dorsal rapproche le bras du tronc.",
  ),
  tf(
    "Les rhomboïdes écartent les omoplates.",
    false,
    "Les rhomboïdes rapprochent les omoplates de la colonne.",
  ),
  multi(
    "Quels muscles sont sollicités dans un tirage vertical ?",
    ["Grand dorsal", "Biceps"],
    ["Grand pectoral", "Soléaire"],
    "Tirage = dorsal + fléchisseurs du coude (biceps) ; le pectoral pousse.",
  ),
  order(
    "Séquence typique d’une traction contrôlée.",
    ["Gainer le tronc", "Tirer les coudes vers le bas", "Contrôler la descente"],
    "Stabiliser, tirer, puis redescendre sans lâcher.",
  ),
];

/** Thème 1 — Trapèze et érecteurs */
export const THEME_1_EXTRAS_4: DiversifiedExtras = [
  tf(
    "Le trapèze supérieur élève les épaules (haussement).",
    true,
    "Faisceau supérieur du trapèze : élévation des omoplates / épaules.",
  ),
  tf(
    "Les érecteurs du rachis fléchissent surtout le tronc vers l’avant.",
    false,
    "Les érecteurs étendent et stabilisent le rachis ; la flexion avant sollicite plutôt les abdos.",
  ),
  multi(
    "Quels muscles stabilisent le dos lors d’un soulevé de terre ?",
    ["Érecteurs du rachis", "Trapèze"],
    ["Tibial antérieur", "Brachial"],
    "Érecteurs et trapèze maintiennent le tronc et les épaules sous charge.",
  ),
  order(
    "Du haut vers le bas, ordonne les zones du trapèze.",
    ["Faisceau supérieur", "Faisceau moyen", "Faisceau inférieur"],
    "Trapèze : supérieur (hausse), moyen (rapproche), inférieur (abaisse).",
  ),
];

export const THEME_1_EXTRAS: DiversifiedExtras[] = [
  THEME_1_EXTRAS_0,
  THEME_1_EXTRAS_1,
  THEME_1_EXTRAS_2,
  THEME_1_EXTRAS_3,
  THEME_1_EXTRAS_4,
];

/** Thème 2 — Devant de cuisse (1ʳᵉ leçon seulement) */
export const THEME_2_EXTRAS_0: DiversifiedExtras = [
  tf(
    "Le quadriceps a quatre chefs.",
    true,
    "Vaste latéral, médial, intermédiaire et droit fémoral.",
  ),
  tf(
    "Tous les chefs du quadriceps croisent aussi la hanche.",
    false,
    "Seul le droit fémoral est bi-articulaire ; les vastes agissent surtout sur le genou.",
  ),
  multi(
    "Quels chefs font partie du quadriceps ?",
    ["Droit fémoral", "Vaste latéral", "Vaste médial"],
    ["Biceps fémoral"],
    "Le biceps fémoral est un ischio-jambier, pas un chef du quadriceps.",
  ),
  order(
    "Ordre de la chaîne d’extension du genou.",
    ["Contraction du quadriceps", "Tension via la rotule", "Extension du tibia"],
    "Le quadriceps tire via la rotule pour tendre le genou.",
  ),
];
