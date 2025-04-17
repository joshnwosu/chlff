import { Level } from '../../interfaces/data';

export interface Question {
  question: string;
  answer: number;
}

// Interfaces for different config shapes
interface ArithmeticConfig {
  minA: number;
  maxA: number;
  minB: number;
  maxB: number;
}

interface DivisionConfig {
  minQuotient: number;
  maxQuotient: number;
  minDivisor: number;
  maxDivisor: number;
}

// Configuration for number ranges and constraints by level and operation
const levelConstraints: {
  [key in Level]: {
    addition: ArithmeticConfig;
    subtraction: ArithmeticConfig;
    multiplication: ArithmeticConfig;
    division: DivisionConfig;
  };
} = {
  [Level.YEAR_1]: {
    addition: { minA: 0, maxA: 5, minB: 0, maxB: 5 },
    subtraction: { minA: 0, maxA: 5, minB: 0, maxB: 5 },
    multiplication: { minA: 1, maxA: 4, minB: 1, maxB: 4 },
    division: { minQuotient: 1, maxQuotient: 5, minDivisor: 1, maxDivisor: 5 },
  },
  [Level.YEAR_2]: {
    addition: { minA: 1, maxA: 10, minB: 1, maxB: 10 },
    subtraction: { minA: 5, maxA: 15, minB: 1, maxB: 10 },
    multiplication: { minA: 2, maxA: 6, minB: 2, maxB: 5 },
    division: { minQuotient: 2, maxQuotient: 6, minDivisor: 2, maxDivisor: 6 },
  },
  [Level.YEAR_3]: {
    addition: { minA: 2, maxA: 15, minB: 2, maxB: 15 },
    subtraction: { minA: 10, maxA: 20, minB: 1, maxB: 10 },
    multiplication: { minA: 4, maxA: 9, minB: 4, maxB: 6 },
    division: {
      minQuotient: 5,
      maxQuotient: 10,
      minDivisor: 4,
      maxDivisor: 10,
    },
  },
  [Level.YEAR_4]: {
    addition: { minA: 10, maxA: 25, minB: 0, maxB: 20 },
    subtraction: { minA: 20, maxA: 50, minB: 5, maxB: 35 },
    multiplication: { minA: 10, maxA: 20, minB: 3, maxB: 5 },
    division: {
      minQuotient: 9,
      maxQuotient: 20,
      minDivisor: 10,
      maxDivisor: 30,
    },
  },
  [Level.YEAR_5]: {
    addition: { minA: 20, maxA: 100, minB: 0, maxB: 50 },
    subtraction: { minA: 50, maxA: 100, minB: 0, maxB: 50 },
    multiplication: { minA: 20, maxA: 70, minB: 6, maxB: 9 },
    division: {
      minQuotient: 15,
      maxQuotient: 30,
      minDivisor: 15,
      maxDivisor: 50,
    },
  },
  [Level.YEAR_6]: {
    addition: { minA: 100, maxA: 1000, minB: 100, maxB: 900 },
    subtraction: { minA: 500, maxA: 1500, minB: 100, maxB: 700 },
    multiplication: { minA: 100, maxA: 1000, minB: 4, maxB: 15 },
    division: {
      minQuotient: 30,
      maxQuotient: 50,
      minDivisor: 15,
      maxDivisor: 50,
    },
  },
};

// Utility to generate random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate 10 unique questions for a given operation
const generateQuestions = (
  level: Level,
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division'
): Question[] => {
  const questions: Question[] = [];
  const config = levelConstraints[level][operation];
  const seenQuestions = new Set<string>();

  while (questions.length < 10) {
    let question: string;
    let answer: number;
    let a: number;
    let b: number;

    if (operation === 'division') {
      // For division, start with quotient and divisor to ensure integer answers
      const divisionConfig = config as DivisionConfig;
      const quotient = getRandomInt(
        divisionConfig.minQuotient,
        divisionConfig.maxQuotient
      );
      const divisor = getRandomInt(
        divisionConfig.minDivisor,
        divisionConfig.maxDivisor
      );
      a = quotient * divisor; // Dividend
      b = divisor;
      question = `${a} ÷ ${b} = ?`;
      answer = quotient;
    } else {
      // For addition, subtraction, multiplication
      const arithmeticConfig = config as ArithmeticConfig;
      a = getRandomInt(arithmeticConfig.minA, arithmeticConfig.maxA);
      b = getRandomInt(arithmeticConfig.minB, arithmeticConfig.maxB);

      if (operation === 'subtraction') {
        // Ensure non-negative result
        if (a < b) {
          [a, b] = [b, a]; // Swap to make a >= b
        }
        question = `${a} - ${b} = ?`;
        answer = a - b;
      } else if (operation === 'multiplication') {
        question = `${a} × ${b} = ?`;
        answer = a * b;
      } else {
        // Addition
        question = `${a} + ${b} = ?`;
        answer = a + b;
      }
    }

    // Avoid duplicate questions
    if (!seenQuestions.has(question)) {
      seenQuestions.add(question);
      questions.push({ question, answer });
    }
  }

  return questions;
};

export const generateAdditionQuestions = (level: Level): Question[] => {
  return generateQuestions(level, 'addition');
};

export const generateSubtractionQuestions = (level: Level): Question[] => {
  return generateQuestions(level, 'subtraction');
};

export const generateMultiplicationQuestions = (level: Level): Question[] => {
  return generateQuestions(level, 'multiplication');
};

export const generateDivisionQuestions = (level: Level): Question[] => {
  return generateQuestions(level, 'division');
};
