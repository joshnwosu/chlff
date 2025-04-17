// Placeholder for the Level enum, representing school year levels (Year 1 to Year 6).
// Replace with `import { Level } from '../../interfaces/data'` if the actual enum is defined elsewhere.
// This enum ensures type safety when specifying the year level for question generation.
enum Level {
  YEAR_1 = 'YEAR_1',
  YEAR_2 = 'YEAR_2',
  YEAR_3 = 'YEAR_3',
  YEAR_4 = 'YEAR_4',
  YEAR_5 = 'YEAR_5',
  YEAR_6 = 'YEAR_6',
}

// Interface defining the structure of a math question.
// - question: A string representing the math expression (e.g., "2 + 3 = ?").
// - answer: The correct numerical answer to the question.
export interface Question {
  question: string;
  answer: number;
}

// Interface for arithmetic operations (addition, subtraction, multiplication).
// Defines the range of operands (a and b) for generating questions.
// - minA, maxA: Range for the first operand.
// - minB, maxB: Range for the second operand.
interface ArithmeticConfig {
  minA: number;
  maxA: number;
  minB: number;
  maxB: number;
}

// Interface for division operation.
// Defines the range of quotient and divisor to ensure integer answers.
// - minQuotient, maxQuotient: Range for the quotient (answer).
// - minDivisor, maxDivisor: Range for the divisor.
interface DivisionConfig {
  minQuotient: number;
  maxQuotient: number;
  minDivisor: number;
  maxDivisor: number;
}

// Configuration object mapping each year level to operation-specific constraints.
// Each level specifies ranges for addition, subtraction, multiplication, and division.
// The ranges are tuned to match the difficulty progression for Year 1 to Year 6,
// starting with small numbers for younger students and increasing complexity for older ones.
const levelConstraints: {
  [key in Level]: {
    addition: ArithmeticConfig;
    subtraction: ArithmeticConfig;
    multiplication: ArithmeticConfig;
    division: DivisionConfig;
  };
} = {
  [Level.YEAR_1]: {
    addition: { minA: 0, maxA: 5, minB: 0, maxB: 5 }, // Simple additions (e.g., 0+0 to 5+5).
    subtraction: { minA: 0, maxA: 5, minB: 0, maxB: 5 }, // Small numbers, non-negative results.
    multiplication: { minA: 1, maxA: 4, minB: 1, maxB: 4 }, // Basic multiplication (e.g., 1×1 to 4×4).
    division: { minQuotient: 1, maxQuotient: 5, minDivisor: 1, maxDivisor: 5 }, // Simple division (e.g., 4÷2=2).
  },
  [Level.YEAR_2]: {
    addition: { minA: 1, maxA: 10, minB: 1, maxB: 10 }, // Slightly larger numbers (e.g., 5+7).
    subtraction: { minA: 5, maxA: 15, minB: 1, maxB: 10 }, // Ensure results are non-negative.
    multiplication: { minA: 2, maxA: 6, minB: 2, maxB: 5 }, // Focus on 2-6 times tables.
    division: { minQuotient: 2, maxQuotient: 6, minDivisor: 2, maxDivisor: 6 }, // Basic division (e.g., 12÷3=4).
  },
  [Level.YEAR_3]: {
    addition: { minA: 2, maxA: 15, minB: 2, maxB: 15 }, // Numbers up to 15 for sums.
    subtraction: { minA: 10, maxA: 20, minB: 1, maxB: 10 }, // Differences up to 20.
    multiplication: { minA: 4, maxA: 9, minB: 4, maxB: 6 }, // Higher times tables (e.g., 7×5).
    division: {
      minQuotient: 5,
      maxQuotient: 10,
      minDivisor: 4,
      maxDivisor: 10,
    }, // Larger quotients (e.g., 45÷5=9).
  },
  [Level.YEAR_4]: {
    addition: { minA: 10, maxA: 25, minB: 0, maxB: 20 }, // Sums up to 45.
    subtraction: { minA: 20, maxA: 50, minB: 5, maxB: 35 }, // Differences up to 50.
    multiplication: { minA: 10, maxA: 20, minB: 3, maxB: 5 }, // Two-digit × single-digit.
    division: {
      minQuotient: 9,
      maxQuotient: 20,
      minDivisor: 10,
      maxDivisor: 30,
    }, // Larger divisions (e.g., 180÷15=12).
  },
  [Level.YEAR_5]: {
    addition: { minA: 20, maxA: 100, minB: 0, maxB: 50 }, // Larger sums up to 150.
    subtraction: { minA: 50, maxA: 100, minB: 0, maxB: 50 }, // Differences up to 100.
    multiplication: { minA: 20, maxA: 70, minB: 6, maxB: 9 }, // Two-digit × single-digit (e.g., 50×7).
    division: {
      minQuotient: 15,
      maxQuotient: 30,
      minDivisor: 15,
      maxDivisor: 50,
    }, // Larger quotients (e.g., 450÷15=30).
  },
  [Level.YEAR_6]: {
    addition: { minA: 100, maxA: 1000, minB: 100, maxB: 900 }, // Three-digit sums (e.g., 456+789).
    subtraction: { minA: 500, maxA: 1500, minB: 100, maxB: 700 }, // Large differences (e.g., 1200-600).
    multiplication: { minA: 100, maxA: 1000, minB: 4, maxB: 15 }, // Three-digit × single-digit.
    division: {
      minQuotient: 30,
      maxQuotient: 50,
      minDivisor: 15,
      maxDivisor: 50,
    }, // Large divisions (e.g., 1500÷50=30).
  },
};

// Utility function to generate a random integer between min and max (inclusive).
// Used to select operands or quotients/divisors within the specified ranges.
// - min: The lower bound (inclusive).
// - max: The upper bound (inclusive).
// Returns a random integer in the range [min, max].
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Core function to generate 10 unique math questions for a given level and operation.
// - level: The year level (e.g., YEAR_1 to YEAR_6).
// - operation: The math operation ('addition', 'subtraction', 'multiplication', 'division').
// Returns an array of 10 Question objects, each with a unique question string and answer.
// The function ensures:
// - Questions are unique within a single call (using a Set).
// - Subtraction results are non-negative (by swapping operands if needed).
// - Division questions yield integer answers (by generating quotient and divisor first).
const generateQuestions = (
  level: Level,
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division'
): Question[] => {
  const questions: Question[] = [];
  const config = levelConstraints[level][operation];
  const seenQuestions = new Set<string>(); // Tracks question strings to avoid duplicates.

  // Continue generating until 10 unique questions are created.
  while (questions.length < 10) {
    let question: string;
    let answer: number;
    let a: number;
    let b: number;

    if (operation === 'division') {
      // Handle division separately to ensure integer answers.
      const divisionConfig = config as DivisionConfig;
      // Generate quotient (answer) and divisor within configured ranges.
      const quotient = getRandomInt(
        divisionConfig.minQuotient,
        divisionConfig.maxQuotient
      );
      const divisor = getRandomInt(
        divisionConfig.minDivisor,
        divisionConfig.maxDivisor
      );
      a = quotient * divisor; // Calculate dividend (a = quotient × divisor).
      b = divisor;
      question = `${a} ÷ ${b} = ?`;
      answer = quotient;
    } else {
      // Handle addition, subtraction, and multiplication.
      const arithmeticConfig = config as ArithmeticConfig;
      // Generate two operands (a and b) within configured ranges.
      a = getRandomInt(arithmeticConfig.minA, arithmeticConfig.maxA);
      b = getRandomInt(arithmeticConfig.minB, arithmeticConfig.maxB);

      if (operation === 'subtraction') {
        // Ensure non-negative result by swapping if a < b.
        if (a < b) {
          [a, b] = [b, a]; // Swap to make a >= b.
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

    // Only add the question if it hasn’t been generated before in this call.
    if (!seenQuestions.has(question)) {
      seenQuestions.add(question);
      questions.push({ question, answer });
    }
  }

  return questions;
};

// Generates 10 unique addition questions for the specified year level.
// - level: The year level (e.g., YEAR_1 to YEAR_6).
// Returns an array of 10 Question objects with addition problems.
export const generateAdditionQuestions = (level: Level): Question[] => {
  return generateQuestions(level, 'addition');
};

// Generates 10 unique subtraction questions for the specified year level.
// - level: The year level (e.g., YEAR_1 to YEAR_6).
// Returns an array of 10 Question objects with subtraction problems.
export const generateSubtractionQuestions = (level: Level): Question[] => {
  return generateQuestions(level, 'subtraction');
};

// Generates 10 unique multiplication questions for the specified year level.
// - level: The year level (e.g., YEAR_1 to YEAR_6).
// Returns an array of 10 Question objects with multiplication problems.
export const generateMultiplicationQuestions = (level: Level): Question[] => {
  return generateQuestions(level, 'multiplication');
};

// Generates 10 unique division questions for the specified year level.
// - level: The year level (e.g., YEAR_1 to YEAR_6).
// Returns an array of 10 Question objects with division problems.
export const generateDivisionQuestions = (level: Level): Question[] => {
  return generateQuestions(level, 'division');
};
