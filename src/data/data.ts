export enum Level {
  YEAR_1 = 'YEAR_1',
  YEAR_2 = 'YEAR_2',
  YEAR_3 = 'YEAR_3',
  YEAR_4 = 'YEAR_4',
  YEAR_5 = 'YEAR_5',
  YEAR_6 = 'YEAR_6',
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
  isCorrect?: boolean;
}

// Shuffle function to randomize array elements
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const generateQuestions = (level: Level): Question[] => {
  switch (level) {
    case Level.YEAR_1:
      return [
        {
          question: '1 + 1?',
          options: shuffleArray(['1', '2', '3', '4']),
          answer: '2',
        },
        {
          question: '2 - 1?',
          options: shuffleArray(['1', '2', '3', '4']),
          answer: '1',
        },
        {
          question: '3 + 2?',
          options: shuffleArray(['4', '5', '6', '7']),
          answer: '5',
        },
        {
          question: '4 - 2?',
          options: shuffleArray(['1', '2', '3', '4']),
          answer: '2',
        },
        {
          question: '5 + 1?',
          options: shuffleArray(['5', '6', '7', '8']),
          answer: '6',
        },
        {
          question: '6 - 3?',
          options: shuffleArray(['2', '3', '4', '5']),
          answer: '3',
        },
        {
          question: '2 + 3?',
          options: shuffleArray(['4', '5', '6', '7']),
          answer: '5',
        },
        {
          question: '7 - 4?',
          options: shuffleArray(['2', '3', '4', '5']),
          answer: '3',
        },
        {
          question: '3 + 4?',
          options: shuffleArray(['6', '7', '8', '9']),
          answer: '7',
        },
        {
          question: '8 - 5?',
          options: shuffleArray(['2', '3', '4', '5']),
          answer: '3',
        },
        {
          question: '4 + 4?',
          options: shuffleArray(['7', '8', '9', '10']),
          answer: '8',
        },
        {
          question: '9 - 6?',
          options: shuffleArray(['2', '3', '4', '5']),
          answer: '3',
        },
        {
          question: '5 + 3?',
          options: shuffleArray(['7', '8', '9', '10']),
          answer: '8',
        },
        {
          question: '10 - 7?',
          options: shuffleArray(['2', '3', '4', '5']),
          answer: '3',
        },
        {
          question: '6 + 2?',
          options: shuffleArray(['7', '8', '9', '10']),
          answer: '8',
        },
        {
          question: '11 - 8?',
          options: shuffleArray(['2', '3', '4', '5']),
          answer: '3',
        },
        {
          question: '7 + 1?',
          options: shuffleArray(['7', '8', '9', '10']),
          answer: '8',
        },
        {
          question: '12 - 9?',
          options: shuffleArray(['2', '3', '4', '5']),
          answer: '3',
        },
        {
          question: '8 + 2?',
          options: shuffleArray(['9', '10', '11', '12']),
          answer: '10',
        },
        {
          question: '13 - 10?',
          options: shuffleArray(['2', '3', '4', '5']),
          answer: '3',
        },
      ];

    case Level.YEAR_6:
      return [
        {
          question: '54 + 32?',
          options: shuffleArray(['86', '76', '84', '66']),
          answer: '86',
        },
        {
          question: '120 - 75?',
          options: shuffleArray(['45', '55', '65', '75']),
          answer: '45',
        },
        {
          question: '8 * 7?',
          options: shuffleArray(['54', '56', '58', '60']),
          answer: '56',
        },
        {
          question: '64 / 8?',
          options: shuffleArray(['6', '7', '8', '9']),
          answer: '8',
        },
        {
          question: '15 * 5?',
          options: shuffleArray(['65', '70', '75', '80']),
          answer: '75',
        },
        {
          question: '144 / 12?',
          options: shuffleArray(['10', '11', '12', '13']),
          answer: '12',
        },
        {
          question: '99 - 27?',
          options: shuffleArray(['72', '73', '74', '75']),
          answer: '72',
        },
        {
          question: '21 + 45?',
          options: shuffleArray(['66', '64', '63', '62']),
          answer: '66',
        },
        {
          question: '7 * 8?',
          options: shuffleArray(['54', '56', '58', '60']),
          answer: '56',
        },
        {
          question: '81 / 9?',
          options: shuffleArray(['7', '8', '9', '10']),
          answer: '9',
        },
        {
          question: '105 - 48?',
          options: shuffleArray(['55', '56', '57', '58']),
          answer: '57',
        },
        {
          question: '36 + 29?',
          options: shuffleArray(['64', '65', '66', '67']),
          answer: '65',
        },
        {
          question: '14 * 3?',
          options: shuffleArray(['42', '43', '44', '45']),
          answer: '42',
        },
        {
          question: '132 / 11?',
          options: shuffleArray(['10', '11', '12', '13']),
          answer: '12',
        },
        {
          question: '88 - 36?',
          options: shuffleArray(['51', '52', '53', '54']),
          answer: '52',
        },
        {
          question: '27 + 39?',
          options: shuffleArray(['65', '66', '67', '68']),
          answer: '66',
        },
        {
          question: '12 * 6?',
          options: shuffleArray(['70', '71', '72', '73']),
          answer: '72',
        },
        {
          question: '144 / 16?',
          options: shuffleArray(['7', '8', '9', '10']),
          answer: '9',
        },
        {
          question: '99 - 54?',
          options: shuffleArray(['44', '45', '46', '47']),
          answer: '45',
        },
        {
          question: '37 + 28?',
          options: shuffleArray(['64', '65', '66', '67']),
          answer: '65',
        },
      ];

    default:
      return [];
  }
};
