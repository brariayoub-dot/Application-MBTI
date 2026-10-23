export interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  direction: 1 | -1; // 1 = favors first letter (E, S, T, J), -1 = favors second letter (I, N, F, P)
  subCategory: string;
}

export const QUESTIONS: Question[] = [
  // --- DIMENSION E / I (Énergie sociale vs Ressourcement intérieur) ---
  {
    id: 1,
    dimension: 'EI',
    direction: 1,
    subCategory: 'Énergie & Relations',
    text: 'Après une journée éprouvante, vous ressentez le besoin de sortir voir du monde plutôt que de rester seul chez vous.'
  },
  {
    id: 2,
    dimension: 'EI',
    direction: -1,
    subCategory: 'Énergie & Relations',
    text: 'Vous avez tendance à réfléchir longuement à vos idées avant de les partager à haute voix en réunion ou en groupe.'
  },
  {
    id: 3,
    dimension: 'EI',
    direction: 1,
    subCategory: 'Énergie & Relations',
    text: 'Lors d\'une soirée ou d\'un événement, vous engagez facilement la conversation avec des personnes que vous ne connaissez pas.'
  },
  {
    id: 4,
    dimension: 'EI',
    direction: -1,
    subCategory: 'Énergie & Relations',
    text: 'Les longues interactions sociales consécutives ont tendance à vider votre énergie et nécessitent un temps de retrait au calme.'
  },
  {
    id: 5,
    dimension: 'EI',
    direction: 1,
    subCategory: 'Énergie & Relations',
    text: 'Vous préférez généralement échanger de vive voix par appel ou face à face plutôt que par messages écrits.'
  },
  {
    id: 6,
    dimension: 'EI',
    direction: -1,
    subCategory: 'Énergie & Relations',
    text: 'Vous privilégiez un cercle restreint d\'amis très proches plutôt qu\'un vaste réseau de connaissances diverses.'
  },
  {
    id: 7,
    dimension: 'EI',
    direction: 1,
    subCategory: 'Énergie & Relations',
    text: 'Dans un groupe de travail, vous vous retrouvez naturellement à animer la discussion et à exprimer vos impressions spontanément.'
  },

  // --- DIMENSION S / N (Sensation concrète vs Intuition abstraite) ---
  {
    id: 8,
    dimension: 'SN',
    direction: 1,
    subCategory: 'Perception & Information',
    text: 'Vous faites davantage confiance aux données factuelles éprouvées et à l\'expérience passée qu\'aux intuitions ou théories abstraites.'
  },
  {
    id: 9,
    dimension: 'SN',
    direction: -1,
    subCategory: 'Perception & Information',
    text: 'Vous êtes souvent fasciné(e) par la signification cachée derrière les événements et par les perspectives futures inexplorées.'
  },
  {
    id: 10,
    dimension: 'SN',
    direction: 1,
    subCategory: 'Perception & Information',
    text: 'Lorsque vous apprenez quelque chose de nouveau, vous voulez d\'abord comprendre son application pratique et tangible dans le présent.'
  },
  {
    id: 11,
    dimension: 'SN',
    direction: -1,
    subCategory: 'Perception & Information',
    text: 'Vous vous surprenez régulièrement à rêvasser ou à imaginer des scénarios hypothétiques sur ce que le monde pourrait devenir.'
  },
  {
    id: 12,
    dimension: 'SN',
    direction: 1,
    subCategory: 'Perception & Information',
    text: 'Vous préférez suivre des consignes étape par étape plutôt que d\'improviser à partir d\'une vague directive générale.'
  },
  {
    id: 13,
    dimension: 'SN',
    direction: -1,
    subCategory: 'Perception & Information',
    text: 'Vous appréciez les métaphores, les symboles et l\'art abstrait plus que la simple reproduction fidèle du réel.'
  },
  {
    id: 14,
    dimension: 'SN',
    direction: -1,
    subCategory: 'Perception & Information',
    text: 'Vous préférez concevoir de nouveaux concepts originaux plutôt que d\'optimiser et maintenir des méthodes déjà existantes.'
  },

  // --- DIMENSION T / F (Pensée rationnelle vs Sentiment & Valeurs) ---
  {
    id: 15,
    dimension: 'TF',
    direction: 1,
    subCategory: 'Prise de décision',
    text: 'Face à un dilemme, vous privilégiez la logique implacable et l\'équité des règles plutôt que l\'impact émotionnel sur les personnes.'
  },
  {
    id: 16,
    dimension: 'TF',
    direction: -1,
    subCategory: 'Prise de décision',
    text: 'Vous accordez une importance primordiale à maintenir l\'harmonie dans le groupe, quitte à tempérer une vérité brutale.'
  },
  {
    id: 17,
    dimension: 'TF',
    direction: 1,
    subCategory: 'Prise de décision',
    text: 'Lorsqu\'un ami vous fait part d\'un problème, votre premier réflexe est de chercher une solution rationnelle plutôt que du réconfort.'
  },
  {
    id: 18,
    dimension: 'TF',
    direction: -1,
    subCategory: 'Prise de décision',
    text: 'Vos choix de vie fondamentaux sont dictés par vos valeurs personnelles et votre cœur plutôt que par de purs calculs de rentabilité.'
  },
  {
    id: 19,
    dimension: 'TF',
    direction: 1,
    subCategory: 'Prise de décision',
    text: 'Il est plus essentiel d\'avoir raison et d\'être objectif que de chercher à plaire à son auditoire.'
  },
  {
    id: 20,
    dimension: 'TF',
    direction: -1,
    subCategory: 'Prise de décision',
    text: 'Vous ressentez profondément la détresse ou les émotions négatives d\'une personne assise à côté de vous, même sans qu\'elle parle.'
  },
  {
    id: 21,
    dimension: 'TF',
    direction: 1,
    subCategory: 'Prise de décision',
    text: 'Dans un débat intellectuel, vous vous attachez scrupuleusement à la cohérence des arguments sans vous formaliser du ton employé.'
  },

  // --- DIMENSION J / P (Jugement structuré vs Perception adaptative) ---
  {
    id: 22,
    dimension: 'JP',
    direction: 1,
    subCategory: 'Organisation de vie',
    text: 'Vous aimez planifier votre semaine à l\'avance avec des listes précises et appréciez que chaque chose soit à sa place.'
  },
  {
    id: 23,
    dimension: 'JP',
    direction: -1,
    subCategory: 'Organisation de vie',
    text: 'Vous préférez garder vos options ouvertes jusqu\'au dernier moment pour pouvoir vous adapter aux opportunités imprévues.'
  },
  {
    id: 24,
    dimension: 'JP',
    direction: 1,
    subCategory: 'Organisation de vie',
    text: 'Vous mettez un point d\'honneur à terminer un travail bien avant la date limite pour éviter le stress de dernière minute.'
  },
  {
    id: 25,
    dimension: 'JP',
    direction: -1,
    subCategory: 'Organisation de vie',
    text: 'Vous travaillez souvent mieux sous l\'effet de la pression ou à l\'approche immédiate de la deadline.'
  },
  {
    id: 26,
    dimension: 'JP',
    direction: 1,
    subCategory: 'Organisation de vie',
    text: 'Le désordre et l\'incertitude prolongée dans votre emploi du temps vous créent un réel sentiment d\'inconfort.'
  },
  {
    id: 27,
    dimension: 'JP',
    direction: -1,
    subCategory: 'Organisation de vie',
    text: 'Lors de vos vacances ou week-ends, vous détestez les itinéraires trop verrouillés et privilégiez l\'aventure spontanée.'
  },
  {
    id: 28,
    dimension: 'JP',
    direction: 1,
    subCategory: 'Organisation de vie',
    text: 'Une fois qu\'une décision est arrêtée et validée, vous ressentez un soulagement immédiat et n\'y revenez que très rarement.'
  }
];

export const ANSWER_CHOICES = [
  { value: -2, label: 'Pas du tout d\'accord', shortLabel: 'Désaccord total', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30 hover:border-rose-400' },
  { value: -1, label: 'Plutôt pas d\'accord', shortLabel: 'Pas d\'accord', color: 'text-rose-300 bg-rose-500/5 border-rose-500/20 hover:border-rose-400' },
  { value: 0, label: 'Neutre / Mitigé', shortLabel: 'Neutre', color: 'text-slate-300 bg-slate-500/10 border-slate-500/30 hover:border-slate-300' },
  { value: 1, label: 'Plutôt d\'accord', shortLabel: 'D\'accord', color: 'text-emerald-300 bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-400' },
  { value: 2, label: 'Tout à fait d\'accord', shortLabel: 'Accord total', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-400' }
];

export interface DimensionScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export function calculateMBTI(answers: Record<number, number>): {
  type: string;
  scores: DimensionScores;
  percentages: {
    EI: { labelA: string; labelB: string; valA: number; valB: number; winner: string; diff: number };
    SN: { labelA: string; labelB: string; valA: number; valB: number; winner: string; diff: number };
    TF: { labelA: string; labelB: string; valA: number; valB: number; winner: string; diff: number };
    JP: { labelA: string; labelB: string; valA: number; valB: number; winner: string; diff: number };
  };
} {
  let scoreEI = 0; // > 0 favors E, < 0 favors I
  let scoreSN = 0; // > 0 favors S, < 0 favors N
  let scoreTF = 0; // > 0 favors T, < 0 favors F
  let scoreJP = 0; // > 0 favors J, < 0 favors P

  const maxPointsPerDimension = 7 * 2; // 14 points maximum delta

  QUESTIONS.forEach(q => {
    const val = answers[q.id] ?? 0;
    const contribution = val * q.direction;
    if (q.dimension === 'EI') scoreEI += contribution;
    if (q.dimension === 'SN') scoreSN += contribution;
    if (q.dimension === 'TF') scoreTF += contribution;
    if (q.dimension === 'JP') scoreJP += contribution;
  });

  const pct = (score: number) => {
    // scale from [-14, +14] to [0, 100]% for first letter
    const ratio = (score + maxPointsPerDimension) / (2 * maxPointsPerDimension);
    const clamped = Math.max(0.05, Math.min(0.95, ratio));
    return Math.round(clamped * 100);
  };

  const pctE = pct(scoreEI);
  const pctI = 100 - pctE;

  const pctS = pct(scoreSN);
  const pctN = 100 - pctS;

  const pctT = pct(scoreTF);
  const pctF = 100 - pctT;

  const pctJ = pct(scoreJP);
  const pctP = 100 - pctJ;

  const letterEI = pctE >= pctI ? 'E' : 'I';
  const letterSN = pctS >= pctN ? 'S' : 'N';
  const letterTF = pctT >= pctF ? 'T' : 'F';
  const letterJP = pctJ >= pctP ? 'J' : 'P';

  const type = `${letterEI}${letterSN}${letterTF}${letterJP}`;

  return {
    type,
    scores: {
      E: pctE,
      I: pctI,
      S: pctS,
      N: pctN,
      T: pctT,
      F: pctF,
      J: pctJ,
      P: pctP
    },
    percentages: {
      EI: { labelA: 'Extraversion (E)', labelB: 'Introversion (I)', valA: pctE, valB: pctI, winner: letterEI, diff: Math.abs(pctE - pctI) },
      SN: { labelA: 'Sensation (S)', labelB: 'Intuition (N)', valA: pctS, valB: pctN, winner: letterSN, diff: Math.abs(pctS - pctN) },
      TF: { labelA: 'Pensée (T)', labelB: 'Sentiment (F)', valA: pctT, valB: pctF, winner: letterTF, diff: Math.abs(pctT - pctF) },
      JP: { labelA: 'Jugement (J)', labelB: 'Perception (P)', valA: pctJ, valB: pctP, winner: letterJP, diff: Math.abs(pctJ - pctP) }
    }
  };
}
