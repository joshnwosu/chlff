import { Level } from '../../interfaces/data';

export interface Question {
  question: string;
  answer: number;
}

export const generateAdditionQuestions = (level: Level): Question[] => {
  switch (level) {
    case Level.YEAR_1:
      return [
        { question: '1 + 1 = ?', answer: 2 },
        { question: '2 + 1 = ?', answer: 3 },
        { question: '3 + 1 = ?', answer: 4 },
        { question: '1 + 2 = ?', answer: 3 },
        { question: '2 + 2 = ?', answer: 4 },
        { question: '1 + 3 = ?', answer: 4 },
        { question: '0 + 1 = ?', answer: 1 },
        { question: '0 + 2 = ?', answer: 2 },
        { question: '0 + 3 = ?', answer: 3 },
        { question: '1 + 0 = ?', answer: 1 },
      ];

    case Level.YEAR_2:
      return [
        { question: '2 + 3 = ?', answer: 5 },
        { question: '4 + 1 = ?', answer: 5 },
        { question: '5 + 2 = ?', answer: 7 },
        { question: '3 + 2 = ?', answer: 5 },
        { question: '4 + 3 = ?', answer: 7 },
        { question: '6 + 2 = ?', answer: 8 },
        { question: '3 + 4 = ?', answer: 7 },
        { question: '2 + 5 = ?', answer: 7 },
        { question: '7 + 1 = ?', answer: 8 },
        { question: '5 + 3 = ?', answer: 8 },
      ];

    case Level.YEAR_3:
      return [
        { question: '7 + 4 = ?', answer: 11 },
        { question: '8 + 3 = ?', answer: 11 },
        { question: '9 + 2 = ?', answer: 11 },
        { question: '6 + 5 = ?', answer: 11 },
        { question: '4 + 7 = ?', answer: 11 },
        { question: '5 + 6 = ?', answer: 11 },
        { question: '3 + 8 = ?', answer: 11 },
        { question: '2 + 9 = ?', answer: 11 },
        { question: '10 + 1 = ?', answer: 11 },
        { question: '11 + 0 = ?', answer: 11 },
      ];

    case Level.YEAR_4:
      return [
        { question: '12 + 3 = ?', answer: 15 },
        { question: '14 + 5 = ?', answer: 19 },
        { question: '16 + 4 = ?', answer: 20 },
        { question: '13 + 6 = ?', answer: 19 },
        { question: '17 + 2 = ?', answer: 19 },
        { question: '18 + 1 = ?', answer: 19 },
        { question: '15 + 4 = ?', answer: 19 },
        { question: '14 + 6 = ?', answer: 20 },
        { question: '19 + 0 = ?', answer: 19 },
        { question: '20 + 0 = ?', answer: 20 },
      ];

    case Level.YEAR_5:
      return [
        { question: '25 + 13 = ?', answer: 38 },
        { question: '30 + 17 = ?', answer: 47 },
        { question: '23 + 19 = ?', answer: 42 },
        { question: '28 + 15 = ?', answer: 43 },
        { question: '35 + 12 = ?', answer: 47 },
        { question: '40 + 18 = ?', answer: 58 },
        { question: '50 + 25 = ?', answer: 75 },
        { question: '60 + 30 = ?', answer: 90 },
        { question: '70 + 20 = ?', answer: 90 },
        { question: '80 + 15 = ?', answer: 95 },
      ];

    case Level.YEAR_6:
      return [
        { question: '123 + 456 = ?', answer: 579 },
        { question: '789 + 321 = ?', answer: 1110 },
        { question: '456 + 654 = ?', answer: 1110 },
        { question: '999 + 111 = ?', answer: 1110 },
        { question: '200 + 800 = ?', answer: 1000 },
        { question: '600 + 300 = ?', answer: 900 },
        { question: '750 + 250 = ?', answer: 1000 },
        { question: '850 + 150 = ?', answer: 1000 },
        { question: '120 + 380 = ?', answer: 500 },
        { question: '130 + 370 = ?', answer: 500 },
      ];

    default:
      return [];
  }
};

export const generateSubtractionQuestions = (level: Level): Question[] => {
  switch (level) {
    case Level.YEAR_1:
      return [
        { question: '1 - 1 = ?', answer: 0 },
        { question: '2 - 1 = ?', answer: 1 },
        { question: '3 - 2 = ?', answer: 1 },
        { question: '4 - 3 = ?', answer: 1 },
        { question: '5 - 4 = ?', answer: 1 },
        { question: '3 - 1 = ?', answer: 2 },
        { question: '4 - 2 = ?', answer: 2 },
        { question: '2 - 2 = ?', answer: 0 },
        { question: '3 - 0 = ?', answer: 3 },
        { question: '5 - 3 = ?', answer: 2 },
      ];

    case Level.YEAR_2:
      return [
        { question: '10 - 5 = ?', answer: 5 },
        { question: '8 - 3 = ?', answer: 5 },
        { question: '7 - 2 = ?', answer: 5 },
        { question: '9 - 4 = ?', answer: 5 },
        { question: '6 - 1 = ?', answer: 5 },
        { question: '11 - 6 = ?', answer: 5 },
        { question: '12 - 7 = ?', answer: 5 },
        { question: '13 - 8 = ?', answer: 5 },
        { question: '14 - 9 = ?', answer: 5 },
        { question: '15 - 10 = ?', answer: 5 },
      ];

    case Level.YEAR_3:
      return [
        { question: '15 - 6 = ?', answer: 9 },
        { question: '14 - 5 = ?', answer: 9 },
        { question: '13 - 4 = ?', answer: 9 },
        { question: '12 - 3 = ?', answer: 9 },
        { question: '11 - 2 = ?', answer: 9 },
        { question: '10 - 1 = ?', answer: 9 },
        { question: '19 - 10 = ?', answer: 9 },
        { question: '18 - 9 = ?', answer: 9 },
        { question: '17 - 8 = ?', answer: 9 },
        { question: '16 - 7 = ?', answer: 9 },
      ];

    case Level.YEAR_4:
      return [
        { question: '25 - 10 = ?', answer: 15 },
        { question: '26 - 11 = ?', answer: 15 },
        { question: '27 - 12 = ?', answer: 15 },
        { question: '28 - 13 = ?', answer: 15 },
        { question: '29 - 14 = ?', answer: 15 },
        { question: '30 - 15 = ?', answer: 15 },
        { question: '35 - 20 = ?', answer: 15 },
        { question: '40 - 25 = ?', answer: 15 },
        { question: '45 - 30 = ?', answer: 15 },
        { question: '50 - 35 = ?', answer: 15 },
      ];

    case Level.YEAR_5:
      return [
        { question: '100 - 25 = ?', answer: 75 },
        { question: '90 - 20 = ?', answer: 70 },
        { question: '80 - 15 = ?', answer: 65 },
        { question: '70 - 10 = ?', answer: 60 },
        { question: '60 - 5 = ?', answer: 55 },
        { question: '50 - 0 = ?', answer: 50 },
        { question: '95 - 25 = ?', answer: 70 },
        { question: '85 - 20 = ?', answer: 65 },
        { question: '75 - 15 = ?', answer: 60 },
        { question: '65 - 10 = ?', answer: 55 },
      ];

    case Level.YEAR_6:
      return [
        { question: '500 - 250 = ?', answer: 250 },
        { question: '600 - 300 = ?', answer: 300 },
        { question: '700 - 350 = ?', answer: 350 },
        { question: '800 - 400 = ?', answer: 400 },
        { question: '900 - 450 = ?', answer: 450 },
        { question: '1000 - 500 = ?', answer: 500 },
        { question: '1100 - 550 = ?', answer: 550 },
        { question: '1200 - 600 = ?', answer: 600 },
        { question: '1300 - 650 = ?', answer: 650 },
        { question: '1400 - 700 = ?', answer: 700 },
      ];

    default:
      return [];
  }
};

export const generateMultiplicationQuestions = (level: Level): Question[] => {
  switch (level) {
    case Level.YEAR_1:
      return [
        { question: '1 × 1 = ?', answer: 1 },
        { question: '2 × 1 = ?', answer: 2 },
        { question: '3 × 1 = ?', answer: 3 },
        { question: '1 × 2 = ?', answer: 2 },
        { question: '2 × 2 = ?', answer: 4 },
        { question: '1 × 3 = ?', answer: 3 },
        { question: '2 × 3 = ?', answer: 6 },
        { question: '3 × 2 = ?', answer: 6 },
        { question: '1 × 4 = ?', answer: 4 },
        { question: '2 × 4 = ?', answer: 8 },
      ];

    case Level.YEAR_2:
      return [
        { question: '2 × 2 = ?', answer: 4 },
        { question: '3 × 2 = ?', answer: 6 },
        { question: '4 × 2 = ?', answer: 8 },
        { question: '5 × 2 = ?', answer: 10 },
        { question: '6 × 2 = ?', answer: 12 },
        { question: '3 × 3 = ?', answer: 9 },
        { question: '4 × 3 = ?', answer: 12 },
        { question: '5 × 3 = ?', answer: 15 },
        { question: '6 × 3 = ?', answer: 18 },
        { question: '4 × 4 = ?', answer: 16 },
      ];

    case Level.YEAR_3:
      return [
        { question: '6 × 4 = ?', answer: 24 },
        { question: '7 × 4 = ?', answer: 28 },
        { question: '8 × 4 = ?', answer: 32 },
        { question: '5 × 5 = ?', answer: 25 },
        { question: '6 × 5 = ?', answer: 30 },
        { question: '7 × 5 = ?', answer: 35 },
        { question: '8 × 5 = ?', answer: 40 },
        { question: '9 × 5 = ?', answer: 45 },
        { question: '6 × 6 = ?', answer: 36 },
        { question: '7 × 6 = ?', answer: 42 },
      ];

    case Level.YEAR_4:
      return [
        { question: '12 × 3 = ?', answer: 36 },
        { question: '14 × 3 = ?', answer: 42 },
        { question: '15 × 3 = ?', answer: 45 },
        { question: '16 × 4 = ?', answer: 64 },
        { question: '18 × 4 = ?', answer: 72 },
        { question: '20 × 4 = ?', answer: 80 },
        { question: '12 × 5 = ?', answer: 60 },
        { question: '15 × 5 = ?', answer: 75 },
        { question: '18 × 5 = ?', answer: 90 },
        { question: '20 × 5 = ?', answer: 100 },
      ];

    case Level.YEAR_5:
      return [
        { question: '25 × 6 = ?', answer: 150 },
        { question: '30 × 6 = ?', answer: 180 },
        { question: '35 × 6 = ?', answer: 210 },
        { question: '40 × 7 = ?', answer: 280 },
        { question: '45 × 7 = ?', answer: 315 },
        { question: '50 × 7 = ?', answer: 350 },
        { question: '55 × 8 = ?', answer: 440 },
        { question: '60 × 8 = ?', answer: 480 },
        { question: '65 × 8 = ?', answer: 520 },
        { question: '70 × 9 = ?', answer: 630 },
      ];

    case Level.YEAR_6:
      return [
        { question: '123 × 4 = ?', answer: 492 },
        { question: '234 × 5 = ?', answer: 1170 },
        { question: '345 × 6 = ?', answer: 2070 },
        { question: '456 × 7 = ?', answer: 3192 },
        { question: '567 × 8 = ?', answer: 4536 },
        { question: '678 × 9 = ?', answer: 6102 },
        { question: '789 × 10 = ?', answer: 7890 },
        { question: '890 × 11 = ?', answer: 9790 },
        { question: '901 × 12 = ?', answer: 10812 },
        { question: '123 × 15 = ?', answer: 1845 },
      ];

    default:
      return [];
  }
};

export const generateDivisionQuestions = (level: Level): Question[] => {
  switch (level) {
    case Level.YEAR_1:
      return [
        { question: '2 ÷ 1 = ?', answer: 2 },
        { question: '4 ÷ 2 = ?', answer: 2 },
        { question: '6 ÷ 3 = ?', answer: 2 },
        { question: '8 ÷ 4 = ?', answer: 2 },
        { question: '10 ÷ 5 = ?', answer: 2 },
        { question: '3 ÷ 1 = ?', answer: 3 },
        { question: '6 ÷ 2 = ?', answer: 3 },
        { question: '9 ÷ 3 = ?', answer: 3 },
        { question: '12 ÷ 4 = ?', answer: 3 },
        { question: '15 ÷ 5 = ?', answer: 3 },
      ];

    case Level.YEAR_2:
      return [
        { question: '6 ÷ 2 = ?', answer: 3 },
        { question: '8 ÷ 4 = ?', answer: 2 },
        { question: '12 ÷ 3 = ?', answer: 4 },
        { question: '15 ÷ 5 = ?', answer: 3 },
        { question: '18 ÷ 6 = ?', answer: 3 },
        { question: '20 ÷ 4 = ?', answer: 5 },
        { question: '24 ÷ 6 = ?', answer: 4 },
        { question: '25 ÷ 5 = ?', answer: 5 },
        { question: '30 ÷ 5 = ?', answer: 6 },
        { question: '36 ÷ 6 = ?', answer: 6 },
      ];

    case Level.YEAR_3:
      return [
        { question: '36 ÷ 4 = ?', answer: 9 },
        { question: '45 ÷ 5 = ?', answer: 9 },
        { question: '54 ÷ 6 = ?', answer: 9 },
        { question: '63 ÷ 7 = ?', answer: 9 },
        { question: '72 ÷ 8 = ?', answer: 9 },
        { question: '81 ÷ 9 = ?', answer: 9 },
        { question: '90 ÷ 10 = ?', answer: 9 },
        { question: '100 ÷ 10 = ?', answer: 10 },
        { question: '108 ÷ 12 = ?', answer: 9 },
        { question: '120 ÷ 15 = ?', answer: 8 },
      ];

    case Level.YEAR_4:
      return [
        { question: '144 ÷ 12 = ?', answer: 12 },
        { question: '160 ÷ 16 = ?', answer: 10 },
        { question: '180 ÷ 15 = ?', answer: 12 },
        { question: '200 ÷ 20 = ?', answer: 10 },
        { question: '225 ÷ 25 = ?', answer: 9 },
        { question: '250 ÷ 25 = ?', answer: 10 },
        { question: '288 ÷ 24 = ?', answer: 12 },
        { question: '324 ÷ 18 = ?', answer: 18 },
        { question: '360 ÷ 30 = ?', answer: 12 },
        { question: '400 ÷ 20 = ?', answer: 20 },
      ];

    case Level.YEAR_5:
      return [
        { question: '450 ÷ 15 = ?', answer: 30 },
        { question: '500 ÷ 20 = ?', answer: 25 },
        { question: '550 ÷ 25 = ?', answer: 22 },
        { question: '600 ÷ 30 = ?', answer: 20 },
        { question: '650 ÷ 25 = ?', answer: 26 },
        { question: '700 ÷ 35 = ?', answer: 20 },
        { question: '750 ÷ 25 = ?', answer: 30 },
        { question: '800 ÷ 40 = ?', answer: 20 },
        { question: '850 ÷ 50 = ?', answer: 17 },
        { question: '900 ÷ 30 = ?', answer: 30 },
      ];

    case Level.YEAR_6:
      return [
        { question: '900 ÷ 18 = ?', answer: 50 },
        { question: '1000 ÷ 20 = ?', answer: 50 },
        { question: '1100 ÷ 22 = ?', answer: 50 },
        { question: '1200 ÷ 30 = ?', answer: 40 },
        { question: '1300 ÷ 25 = ?', answer: 52 },
        { question: '1400 ÷ 28 = ?', answer: 50 },
        { question: '1500 ÷ 50 = ?', answer: 30 },
        { question: '1600 ÷ 40 = ?', answer: 40 },
        { question: '1700 ÷ 34 = ?', answer: 50 },
        { question: '1800 ÷ 45 = ?', answer: 40 },
      ];

    default:
      return [];
  }
};
