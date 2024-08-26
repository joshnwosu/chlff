import { Question } from '../data/data';
import { Level } from './data';

export interface FishProps {
  lavel?: Level;
  questions: Question[];
}

export interface FishSideBarProps extends FishProps {
  currentQuestionIndex?: number;
  timer: number;
}
