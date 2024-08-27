import {
  generateAdditionQuestions,
  generateDivisionQuestions,
  generateMultiplicationQuestions,
  generateSubtractionQuestions,
  Question,
} from '../data/questions/questions';
import { Level } from '../interfaces/data';

export function generateQuestionsForGame(
  selectedYear: number,
  selectedGame: { name: string } | null
): Question[] {
  const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
  let questions: Question[] = [];

  switch (selectedGame?.name) {
    case 'ADDITION':
      questions = generateAdditionQuestions(Level[selectedLevel]);
      break;
    case 'SUBTRACTION':
      questions = generateSubtractionQuestions(Level[selectedLevel]);
      break;
    case 'MULTIPLICATION':
      questions = generateMultiplicationQuestions(Level[selectedLevel]);
      break;
    case 'DIVISION':
      questions = generateDivisionQuestions(Level[selectedLevel]);
      break;
    default:
      questions = generateAdditionQuestions(Level[selectedLevel]);
  }

  // console.log(`generated question for ${selectedYear} `, questions);
  return questions;
}
