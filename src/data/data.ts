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
          options: shuffleArray(['1', '2']),
          answer: '2',
        },
        {
          question: '2 - 1?',
          options: shuffleArray(['1', '2']),
          answer: '1',
        },
        {
          question: '3 + 2?',
          options: shuffleArray(['4', '5']),
          answer: '5',
        },
        {
          question: '4 - 2?',
          options: shuffleArray(['2', '3']),
          answer: '2',
        },
        {
          question: '5 + 1?',
          options: shuffleArray(['6', '7']),
          answer: '6',
        },
        {
          question: '6 - 3?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
        {
          question: '2 + 3?',
          options: shuffleArray(['5', '6']),
          answer: '5',
        },
        {
          question: '7 - 4?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
        {
          question: '3 + 4?',
          options: shuffleArray(['6', '7']),
          answer: '7',
        },
        {
          question: '8 - 5?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
        {
          question: '4 + 4?',
          options: shuffleArray(['8', '9']),
          answer: '8',
        },
        {
          question: '9 - 6?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
        {
          question: '5 + 3?',
          options: shuffleArray(['8', '9']),
          answer: '8',
        },
        {
          question: '10 - 7?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
        {
          question: '6 + 2?',
          options: shuffleArray(['8', '9']),
          answer: '8',
        },
        {
          question: '11 - 8?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
        {
          question: '7 + 1?',
          options: shuffleArray(['8', '9']),
          answer: '8',
        },
        {
          question: '12 - 9?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
        {
          question: '8 + 2?',
          options: shuffleArray(['10', '11']),
          answer: '10',
        },
        {
          question: '13 - 10?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
        {
          question: '1 + 1?',
          options: shuffleArray(['1', '2']),
          answer: '2',
        },
        {
          question: '2 - 1?',
          options: shuffleArray(['1', '2']),
          answer: '1',
        },
        {
          question: '3 + 2?',
          options: shuffleArray(['4', '5']),
          answer: '5',
        },
        {
          question: '4 - 2?',
          options: shuffleArray(['2', '3']),
          answer: '2',
        },
        {
          question: '5 + 1?',
          options: shuffleArray(['6', '7']),
          answer: '6',
        },
        {
          question: '6 - 3?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
        {
          question: '2 + 3?',
          options: shuffleArray(['5', '6']),
          answer: '5',
        },
        {
          question: '7 - 4?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
        {
          question: '3 + 4?',
          options: shuffleArray(['6', '7']),
          answer: '7',
        },
        {
          question: '8 - 5?',
          options: shuffleArray(['3', '4']),
          answer: '3',
        },
      ];

    case Level.YEAR_2:
      return [
        {
          question: '5 + 3?',
          options: shuffleArray(['8', '9']),
          answer: '8',
        },
        {
          question: '10 - 4?',
          options: shuffleArray(['6', '7']),
          answer: '6',
        },
        {
          question: '6 + 6?',
          options: shuffleArray(['12', '13']),
          answer: '12',
        },
        {
          question: '15 - 7?',
          options: shuffleArray(['8', '9']),
          answer: '8',
        },
        {
          question: '9 + 4?',
          options: shuffleArray(['13', '14']),
          answer: '13',
        },
        {
          question: '12 - 5?',
          options: shuffleArray(['7', '8']),
          answer: '7',
        },
        {
          question: '8 + 7?',
          options: shuffleArray(['15', '16']),
          answer: '15',
        },
        {
          question: '14 - 9?',
          options: shuffleArray(['5', '6']),
          answer: '5',
        },
        {
          question: '11 + 3?',
          options: shuffleArray(['14', '15']),
          answer: '14',
        },
        {
          question: '16 - 8?',
          options: shuffleArray(['8', '9']),
          answer: '8',
        },
        {
          question: '7 + 5?',
          options: shuffleArray(['12', '13']),
          answer: '12',
        },
        {
          question: '18 - 10?',
          options: shuffleArray(['8', '9']),
          answer: '8',
        },
        {
          question: '4 + 9?',
          options: shuffleArray(['13', '14']),
          answer: '13',
        },
        {
          question: '13 - 4?',
          options: shuffleArray(['9', '10']),
          answer: '9',
        },
        {
          question: '17 - 6?',
          options: shuffleArray(['11', '12']),
          answer: '11',
        },
        {
          question: '6 + 5?',
          options: shuffleArray(['11', '12']),
          answer: '11',
        },
        {
          question: '8 + 8?',
          options: shuffleArray(['16', '17']),
          answer: '16',
        },
        {
          question: '20 - 12?',
          options: shuffleArray(['8', '9']),
          answer: '8',
        },
        {
          question: '7 + 6?',
          options: shuffleArray(['13', '14']),
          answer: '13',
        },
        {
          question: '15 - 5?',
          options: shuffleArray(['10', '11']),
          answer: '10',
        },
      ];

    case Level.YEAR_3:
      return [
        {
          question: '15 + 5?',
          options: shuffleArray(['20', '21']),
          answer: '20',
        },
        {
          question: '25 - 10?',
          options: shuffleArray(['15', '16']),
          answer: '15',
        },
        {
          question: '12 + 9?',
          options: shuffleArray(['21', '22']),
          answer: '21',
        },
        {
          question: '18 - 7?',
          options: shuffleArray(['11', '12']),
          answer: '11',
        },
        {
          question: '14 + 8?',
          options: shuffleArray(['22', '23']),
          answer: '22',
        },
        {
          question: '21 - 6?',
          options: shuffleArray(['15', '16']),
          answer: '15',
        },
        {
          question: '9 + 14?',
          options: shuffleArray(['23', '24']),
          answer: '23',
        },
        {
          question: '17 - 8?',
          options: shuffleArray(['9', '10']),
          answer: '9',
        },
        {
          question: '16 + 7?',
          options: shuffleArray(['23', '24']),
          answer: '23',
        },
        {
          question: '23 - 12?',
          options: shuffleArray(['11', '12']),
          answer: '11',
        },
        {
          question: '18 + 6?',
          options: shuffleArray(['24', '25']),
          answer: '24',
        },
        {
          question: '20 - 8?',
          options: shuffleArray(['12', '13']),
          answer: '12',
        },
        {
          question: '13 + 10?',
          options: shuffleArray(['23', '24']),
          answer: '23',
        },
        {
          question: '19 - 7?',
          options: shuffleArray(['12', '13']),
          answer: '12',
        },
        {
          question: '22 + 5?',
          options: shuffleArray(['27', '28']),
          answer: '27',
        },
        {
          question: '24 - 9?',
          options: shuffleArray(['15', '16']),
          answer: '15',
        },
        {
          question: '11 + 11?',
          options: shuffleArray(['22', '23']),
          answer: '22',
        },
        {
          question: '27 - 11?',
          options: shuffleArray(['16', '17']),
          answer: '16',
        },
        {
          question: '14 + 12?',
          options: shuffleArray(['26', '27']),
          answer: '26',
        },
        {
          question: '30 - 13?',
          options: shuffleArray(['17', '18']),
          answer: '17',
        },
      ];

    case Level.YEAR_4:
      return [
        {
          question: '25 + 15?',
          options: shuffleArray(['40', '41']),
          answer: '40',
        },
        {
          question: '50 - 20?',
          options: shuffleArray(['30', '31']),
          answer: '30',
        },
        {
          question: '22 + 18?',
          options: shuffleArray(['40', '41']),
          answer: '40',
        },
        {
          question: '35 - 15?',
          options: shuffleArray(['20', '21']),
          answer: '20',
        },
        {
          question: '27 + 14?',
          options: shuffleArray(['41', '42']),
          answer: '41',
        },
        {
          question: '29 - 9?',
          options: shuffleArray(['20', '21']),
          answer: '20',
        },
        {
          question: '18 + 22?',
          options: shuffleArray(['40', '41']),
          answer: '40',
        },
        {
          question: '40 - 15?',
          options: shuffleArray(['25', '26']),
          answer: '25',
        },
        {
          question: '21 + 19?',
          options: shuffleArray(['40', '41']),
          answer: '40',
        },
        {
          question: '38 - 18?',
          options: shuffleArray(['20', '21']),
          answer: '20',
        },
        {
          question: '19 + 21?',
          options: shuffleArray(['40', '41']),
          answer: '40',
        },
        {
          question: '45 - 20?',
          options: shuffleArray(['25', '26']),
          answer: '25',
        },
        {
          question: '32 + 10?',
          options: shuffleArray(['42', '43']),
          answer: '42',
        },
        {
          question: '50 - 25?',
          options: shuffleArray(['25', '26']),
          answer: '25',
        },
        {
          question: '28 + 12?',
          options: shuffleArray(['40', '41']),
          answer: '40',
        },
        {
          question: '30 - 10?',
          options: shuffleArray(['20', '21']),
          answer: '20',
        },
        {
          question: '14 + 27?',
          options: shuffleArray(['41', '42']),
          answer: '41',
        },
        {
          question: '47 - 22?',
          options: shuffleArray(['25', '26']),
          answer: '25',
        },
        {
          question: '29 + 11?',
          options: shuffleArray(['40', '41']),
          answer: '40',
        },
        {
          question: '50 - 25?',
          options: shuffleArray(['25', '26']),
          answer: '25',
        },
      ];

    case Level.YEAR_5:
      return [
        {
          question: '60 + 20?',
          options: shuffleArray(['80', '81']),
          answer: '80',
        },
        {
          question: '100 - 40?',
          options: shuffleArray(['60', '61']),
          answer: '60',
        },
        {
          question: '45 + 35?',
          options: shuffleArray(['80', '81']),
          answer: '80',
        },
        {
          question: '85 - 25?',
          options: shuffleArray(['60', '61']),
          answer: '60',
        },
        {
          question: '38 + 42?',
          options: shuffleArray(['80', '81']),
          answer: '80',
        },
        {
          question: '70 - 30?',
          options: shuffleArray(['40', '41']),
          answer: '40',
        },
        {
          question: '19 + 61?',
          options: shuffleArray(['80', '81']),
          answer: '80',
        },
        {
          question: '90 - 25?',
          options: shuffleArray(['65', '66']),
          answer: '65',
        },
        {
          question: '21 + 59?',
          options: shuffleArray(['80', '81']),
          answer: '80',
        },
        {
          question: '88 - 28?',
          options: shuffleArray(['60', '61']),
          answer: '60',
        },
        {
          question: '47 + 33?',
          options: shuffleArray(['80', '81']),
          answer: '80',
        },
        {
          question: '75 - 15?',
          options: shuffleArray(['60', '61']),
          answer: '60',
        },
        {
          question: '60 + 20?',
          options: shuffleArray(['80', '81']),
          answer: '80',
        },
        {
          question: '95 - 30?',
          options: shuffleArray(['65', '66']),
          answer: '65',
        },
        {
          question: '41 + 39?',
          options: shuffleArray(['80', '81']),
          answer: '80',
        },
        {
          question: '50 - 10?',
          options: shuffleArray(['40', '41']),
          answer: '40',
        },
        {
          question: '33 + 47?',
          options: shuffleArray(['80', '81']),
          answer: '80',
        },
        {
          question: '88 - 23?',
          options: shuffleArray(['65', '66']),
          answer: '65',
        },
        {
          question: '25 + 55?',
          options: shuffleArray(['80', '81']),
          answer: '80',
        },
        {
          question: '90 - 30?',
          options: shuffleArray(['60', '61']),
          answer: '60',
        },
      ];

    case Level.YEAR_6:
      return [
        {
          question: '100 + 50?',
          options: shuffleArray(['150', '151']),
          answer: '150',
        },
        {
          question: '200 - 75?',
          options: shuffleArray(['125', '126']),
          answer: '125',
        },
        {
          question: '70 + 80?',
          options: shuffleArray(['150', '151']),
          answer: '150',
        },
        {
          question: '170 - 45?',
          options: shuffleArray(['125', '126']),
          answer: '125',
        },
        {
          question: '90 + 60?',
          options: shuffleArray(['150', '151']),
          answer: '150',
        },
        {
          question: '130 - 30?',
          options: shuffleArray(['100', '101']),
          answer: '100',
        },
        {
          question: '40 + 110?',
          options: shuffleArray(['150', '151']),
          answer: '150',
        },
        {
          question: '180 - 55?',
          options: shuffleArray(['125', '126']),
          answer: '125',
        },
        {
          question: '50 + 100?',
          options: shuffleArray(['150', '151']),
          answer: '150',
        },
        {
          question: '200 - 75?',
          options: shuffleArray(['125', '126']),
          answer: '125',
        },
        {
          question: '60 + 90?',
          options: shuffleArray(['150', '151']),
          answer: '150',
        },
        {
          question: '175 - 50?',
          options: shuffleArray(['125', '126']),
          answer: '125',
        },
        {
          question: '80 + 70?',
          options: shuffleArray(['150', '151']),
          answer: '150',
        },
        {
          question: '150 - 50?',
          options: shuffleArray(['100', '101']),
          answer: '100',
        },
        {
          question: '20 + 130?',
          options: shuffleArray(['150', '151']),
          answer: '150',
        },
        {
          question: '185 - 60?',
          options: shuffleArray(['125', '126']),
          answer: '125',
        },
        {
          question: '55 + 95?',
          options: shuffleArray(['150', '151']),
          answer: '150',
        },
        {
          question: '190 - 65?',
          options: shuffleArray(['125', '126']),
          answer: '125',
        },
        {
          question: '45 + 105?',
          options: shuffleArray(['150', '151']),
          answer: '150',
        },
        {
          question: '200 - 75?',
          options: shuffleArray(['125', '126']),
          answer: '125',
        },
      ];

    default:
      return [];
  }
};
