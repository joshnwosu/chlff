export enum Level {
  YEAR_1 = 'YEAR_1',
  YEAR_2 = 'YEAR_2',
  YEAR_3 = 'YEAR_3',
  YEAR_4 = 'YEAR_4',
  YEAR_5 = 'YEAR_5',
  YEAR_6 = 'YEAR_6',
}

export interface Question {
  id: number;
  question: string;
  answer: number;
}

export interface GameMode {
  mode: { name: string; image: string };
}

export interface GameLevel {
  status: 'locked' | 'unlocked';
  star: number;
}

export interface GameOptions {
  name: string;
  color: string;
  img: string;
  link: string;
  disabled?: boolean;
  levels: GameLevel[];
  currentLevel: number;
}
