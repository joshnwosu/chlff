export interface Question {
    id: number;
    question: string;
    answer: number;
  }
  
  export interface GameMode {
    mode: { name: string, image: string };
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