import { MBTIProfile } from '../data/mbtiData';
import { DimensionScores } from '../data/questions';

export interface Participant {
  nom: string;
  prenom: string;
  email?: string;
  context?: string;
}

export interface Submission {
  id: string;
  nom: string;
  prenom: string;
  email?: string;
  mbtiType: string;
  title: string;
  scores: DimensionScores;
  timeSpentSeconds: number;
  submittedAt: string;
  notes?: string;
}

export type AppView = 'welcome' | 'test' | 'result' | 'admin' | 'catalog';
