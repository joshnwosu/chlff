interface Question {
  question: string;
  answer: number;
  options: number[];
}

interface QuestionsByLevel {
  [level: string]: Question[];
}

interface QuestionsByYear {
  [year: string]: QuestionsByLevel;
}

export const questions: QuestionsByYear = {
  'Year 1': {
    'Level 1': [
      { question: '1 + 1 = ?', answer: 2, options: [2, 3] },
      { question: '2 + 1 = ?', answer: 3, options: [3, 4] },
      { question: '3 + 1 = ?', answer: 4, options: [4, 5] },
      { question: '1 + 2 = ?', answer: 3, options: [3, 4] },
      { question: '2 + 2 = ?', answer: 4, options: [4, 5] },
      { question: '1 + 3 = ?', answer: 4, options: [4, 5] },
      { question: '0 + 1 = ?', answer: 1, options: [1, 2] },
      { question: '0 + 2 = ?', answer: 2, options: [2, 3] },
      { question: '0 + 3 = ?', answer: 3, options: [3, 4] },
      { question: '1 + 0 = ?', answer: 1, options: [1, 2] },
    ],
    'Level 2': [
      { question: '3 + 2 = ?', answer: 5, options: [5, 6] },
      { question: '4 + 1 = ?', answer: 5, options: [5, 6] },
      { question: '5 + 1 = ?', answer: 6, options: [6, 7] },
      { question: '2 + 3 = ?', answer: 5, options: [5, 6] },
      { question: '4 + 2 = ?', answer: 6, options: [6, 7] },
      { question: '3 + 3 = ?', answer: 6, options: [6, 7] },
      { question: '2 + 4 = ?', answer: 6, options: [6, 7] },
      { question: '1 + 4 = ?', answer: 5, options: [5, 6] },
      { question: '0 + 4 = ?', answer: 4, options: [4, 5] },
      { question: '1 + 3 = ?', answer: 4, options: [4, 5] },
    ],
    'Level 3': [
      { question: '5 + 2 = ?', answer: 7, options: [7, 8] },
      { question: '3 + 3 = ?', answer: 6, options: [6, 7] },
      { question: '6 + 1 = ?', answer: 7, options: [7, 8] },
      { question: '2 + 4 = ?', answer: 6, options: [6, 7] },
      { question: '5 + 3 = ?', answer: 8, options: [8, 9] },
      { question: '4 + 3 = ?', answer: 7, options: [7, 8] },
      { question: '6 + 2 = ?', answer: 8, options: [8, 9] },
      { question: '5 + 2 = ?', answer: 7, options: [7, 8] },
      { question: '4 + 4 = ?', answer: 8, options: [8, 9] },
      { question: '3 + 5 = ?', answer: 8, options: [8, 9] },
    ],
    'Level 4': [
      { question: '6 + 2 = ?', answer: 8, options: [8, 9] },
      { question: '4 + 3 = ?', answer: 7, options: [7, 8] },
      { question: '7 + 1 = ?', answer: 8, options: [8, 9] },
      { question: '3 + 4 = ?', answer: 7, options: [7, 8] },
      { question: '6 + 3 = ?', answer: 9, options: [9, 10] },
      { question: '5 + 4 = ?', answer: 9, options: [9, 10] },
      { question: '7 + 2 = ?', answer: 9, options: [9, 10] },
      { question: '8 + 1 = ?', answer: 9, options: [9, 10] },
      { question: '6 + 3 = ?', answer: 9, options: [9, 10] },
      { question: '4 + 5 = ?', answer: 9, options: [9, 10] },
    ],
    'Level 5': [
      { question: '7 + 2 = ?', answer: 9, options: [9, 10] },
      { question: '5 + 4 = ?', answer: 9, options: [9, 10] },
      { question: '8 + 1 = ?', answer: 9, options: [9, 10] },
      { question: '4 + 4 = ?', answer: 8, options: [8, 9] },
      { question: '7 + 3 = ?', answer: 10, options: [10, 11] },
      { question: '6 + 4 = ?', answer: 10, options: [10, 11] },
      { question: '5 + 5 = ?', answer: 10, options: [10, 11] },
      { question: '7 + 2 = ?', answer: 9, options: [9, 10] },
      { question: '8 + 2 = ?', answer: 10, options: [10, 11] },
      { question: '9 + 1 = ?', answer: 10, options: [10, 11] },
    ],
    'Level 6': [
      { question: '8 + 2 = ?', answer: 10, options: [10, 11] },
      { question: '5 + 5 = ?', answer: 10, options: [10, 11] },
      { question: '9 + 1 = ?', answer: 10, options: [10, 11] },
      { question: '4 + 5 = ?', answer: 9, options: [9, 10] },
      { question: '8 + 3 = ?', answer: 11, options: [11, 12] },
      { question: '7 + 4 = ?', answer: 11, options: [11, 12] },
      { question: '6 + 5 = ?', answer: 11, options: [11, 12] },
      { question: '9 + 2 = ?', answer: 11, options: [11, 12] },
      { question: '10 + 1 = ?', answer: 11, options: [11, 12] },
      { question: '7 + 3 = ?', answer: 10, options: [10, 11] },
    ],
    'Level 7': [
      { question: '9 + 2 = ?', answer: 11, options: [11, 12] },
      { question: '6 + 4 = ?', answer: 10, options: [10, 11] },
      { question: '10 + 1 = ?', answer: 11, options: [11, 12] },
      { question: '5 + 6 = ?', answer: 11, options: [11, 12] },
      { question: '9 + 3 = ?', answer: 12, options: [12, 13] },
      { question: '8 + 4 = ?', answer: 12, options: [12, 13] },
      { question: '7 + 5 = ?', answer: 12, options: [12, 13] },
      { question: '10 + 2 = ?', answer: 12, options: [12, 13] },
      { question: '6 + 6 = ?', answer: 12, options: [12, 13] },
      { question: '8 + 3 = ?', answer: 11, options: [11, 12] },
    ],
    'Level 8': [
      { question: '10 + 2 = ?', answer: 12, options: [12, 13] },
      { question: '6 + 5 = ?', answer: 11, options: [11, 12] },
      { question: '7 + 4 = ?', answer: 11, options: [11, 12] },
      { question: '8 + 4 = ?', answer: 12, options: [12, 13] },
      { question: '9 + 4 = ?', answer: 13, options: [13, 14] },
      { question: '7 + 6 = ?', answer: 13, options: [13, 14] },
      { question: '10 + 3 = ?', answer: 13, options: [13, 14] },
      { question: '6 + 7 = ?', answer: 13, options: [13, 14] },
      { question: '8 + 5 = ?', answer: 13, options: [13, 14] },
      { question: '9 + 3 = ?', answer: 12, options: [12, 13] },
    ],
    'Level 9': [
      { question: '10 + 3 = ?', answer: 13, options: [13, 14] },
      { question: '7 + 5 = ?', answer: 12, options: [12, 13] },
      { question: '6 + 6 = ?', answer: 12, options: [12, 13] },
      { question: '8 + 5 = ?', answer: 13, options: [13, 14] },
      { question: '9 + 5 = ?', answer: 14, options: [14, 15] },
      { question: '7 + 7 = ?', answer: 14, options: [14, 15] },
      { question: '10 + 4 = ?', answer: 14, options: [14, 15] },
      { question: '8 + 6 = ?', answer: 14, options: [14, 15] },
      { question: '6 + 8 = ?', answer: 14, options: [14, 15] },
      { question: '9 + 4 = ?', answer: 13, options: [13, 14] },
    ],
    'Level 10': [
      { question: '10 + 4 = ?', answer: 14, options: [14, 15] },
      { question: '7 + 6 = ?', answer: 13, options: [13, 14] },
      { question: '8 + 6 = ?', answer: 14, options: [14, 15] },
      { question: '9 + 6 = ?', answer: 15, options: [15, 16] },
      { question: '10 + 5 = ?', answer: 15, options: [15, 16] },
      { question: '7 + 8 = ?', answer: 15, options: [15, 16] },
      { question: '6 + 9 = ?', answer: 15, options: [15, 16] },
      { question: '8 + 7 = ?', answer: 15, options: [15, 16] },
      { question: '10 + 5 = ?', answer: 15, options: [15, 16] },
      { question: '9 + 5 = ?', answer: 14, options: [14, 15] },
    ],
  },
};

export const subtractionQuestions: QuestionsByYear = {
  'Year 1': {
    'Level 1': [
      { question: '3 - 1 = ?', answer: 2, options: [2, 1] },
      { question: '4 - 2 = ?', answer: 2, options: [2, 3] },
      { question: '5 - 3 = ?', answer: 2, options: [2, 1] },
      { question: '6 - 4 = ?', answer: 2, options: [2, 3] },
      { question: '7 - 5 = ?', answer: 2, options: [2, 1] },
      { question: '8 - 6 = ?', answer: 2, options: [2, 3] },
      { question: '9 - 7 = ?', answer: 2, options: [2, 1] },
      { question: '10 - 8 = ?', answer: 2, options: [2, 3] },
      { question: '11 - 9 = ?', answer: 2, options: [2, 1] },
      { question: '12 - 10 = ?', answer: 2, options: [2, 3] },
    ],
    'Level 2': [
      { question: '5 - 2 = ?', answer: 3, options: [3, 4] },
      { question: '6 - 3 = ?', answer: 3, options: [3, 4] },
      { question: '7 - 4 = ?', answer: 3, options: [3, 2] },
      { question: '8 - 5 = ?', answer: 3, options: [3, 4] },
      { question: '9 - 6 = ?', answer: 3, options: [3, 2] },
      { question: '10 - 7 = ?', answer: 3, options: [3, 4] },
      { question: '11 - 8 = ?', answer: 3, options: [3, 2] },
      { question: '12 - 9 = ?', answer: 3, options: [3, 4] },
      { question: '13 - 10 = ?', answer: 3, options: [3, 2] },
      { question: '14 - 11 = ?', answer: 3, options: [3, 4] },
    ],
    'Level 3': [
      { question: '7 - 2 = ?', answer: 5, options: [5, 4] },
      { question: '8 - 3 = ?', answer: 5, options: [5, 4] },
      { question: '9 - 4 = ?', answer: 5, options: [5, 6] },
      { question: '10 - 5 = ?', answer: 5, options: [5, 4] },
      { question: '11 - 6 = ?', answer: 5, options: [5, 6] },
      { question: '12 - 7 = ?', answer: 5, options: [5, 4] },
      { question: '13 - 8 = ?', answer: 5, options: [5, 6] },
      { question: '14 - 9 = ?', answer: 5, options: [5, 4] },
      { question: '15 - 10 = ?', answer: 5, options: [5, 6] },
      { question: '16 - 11 = ?', answer: 5, options: [5, 4] },
    ],
    // Continue adding more levels...
  },
  'Year 2': {
    'Level 1': [
      { question: '10 - 5 = ?', answer: 5, options: [5, 4] },
      { question: '11 - 6 = ?', answer: 5, options: [5, 4] },
      { question: '12 - 7 = ?', answer: 5, options: [5, 6] },
      { question: '13 - 8 = ?', answer: 5, options: [5, 4] },
      { question: '14 - 9 = ?', answer: 5, options: [5, 6] },
      { question: '15 - 10 = ?', answer: 5, options: [5, 4] },
      { question: '16 - 11 = ?', answer: 5, options: [5, 6] },
      { question: '17 - 12 = ?', answer: 5, options: [5, 4] },
      { question: '18 - 13 = ?', answer: 5, options: [5, 6] },
      { question: '19 - 14 = ?', answer: 5, options: [5, 4] },
    ],
    // Continue adding more levels...
  },
  // Continue adding more years...
};
