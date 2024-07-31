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

    case Level.YEAR_2:
      return [
        {
          question: '5 + 3?',
          options: shuffleArray(['7', '8', '9', '10']),
          answer: '8',
        },
        {
          question: '10 - 4?',
          options: shuffleArray(['5', '6', '7', '8']),
          answer: '6',
        },
        {
          question: '6 + 6?',
          options: shuffleArray(['11', '12', '13', '14']),
          answer: '12',
        },
        {
          question: '15 - 7?',
          options: shuffleArray(['7', '8', '9', '10']),
          answer: '8',
        },
        {
          question: '9 + 4?',
          options: shuffleArray(['12', '13', '14', '15']),
          answer: '13',
        },
        {
          question: '12 - 5?',
          options: shuffleArray(['6', '7', '8', '9']),
          answer: '7',
        },
        {
          question: '8 + 7?',
          options: shuffleArray(['14', '15', '16', '17']),
          answer: '15',
        },
        {
          question: '14 - 9?',
          options: shuffleArray(['4', '5', '6', '7']),
          answer: '5',
        },
        {
          question: '11 + 3?',
          options: shuffleArray(['13', '14', '15', '16']),
          answer: '14',
        },
        {
          question: '16 - 8?',
          options: shuffleArray(['6', '7', '8', '9']),
          answer: '8',
        },
        {
          question: '7 + 5?',
          options: shuffleArray(['11', '12', '13', '14']),
          answer: '12',
        },
        {
          question: '18 - 10?',
          options: shuffleArray(['6', '7', '8', '9']),
          answer: '8',
        },
        {
          question: '4 + 9?',
          options: shuffleArray(['12', '13', '14', '15']),
          answer: '13',
        },
        {
          question: '13 - 4?',
          options: shuffleArray(['8', '9', '10', '11']),
          answer: '9',
        },
        {
          question: '17 - 6?',
          options: shuffleArray(['9', '10', '11', '12']),
          answer: '11',
        },
        {
          question: '6 + 5?',
          options: shuffleArray(['10', '11', '12', '13']),
          answer: '11',
        },
        {
          question: '8 + 8?',
          options: shuffleArray(['14', '15', '16', '17']),
          answer: '16',
        },
        {
          question: '20 - 12?',
          options: shuffleArray(['7', '8', '9', '10']),
          answer: '8',
        },
        {
          question: '7 + 6?',
          options: shuffleArray(['12', '13', '14', '15']),
          answer: '13',
        },
        {
          question: '15 - 5?',
          options: shuffleArray(['8', '9', '10', '11']),
          answer: '10',
        },
      ];

    case Level.YEAR_3:
      return [
        {
          question: '15 + 5?',
          options: shuffleArray(['19', '20', '21', '22']),
          answer: '20',
        },
        {
          question: '25 - 10?',
          options: shuffleArray(['13', '14', '15', '16']),
          answer: '15',
        },
        {
          question: '12 + 9?',
          options: shuffleArray(['20', '21', '22', '23']),
          answer: '21',
        },
        {
          question: '18 - 7?',
          options: shuffleArray(['10', '11', '12', '13']),
          answer: '11',
        },
        {
          question: '14 + 8?',
          options: shuffleArray(['20', '21', '22', '23']),
          answer: '22',
        },
        {
          question: '21 - 6?',
          options: shuffleArray(['13', '14', '15', '16']),
          answer: '15',
        },
        {
          question: '9 + 14?',
          options: shuffleArray(['21', '22', '23', '24']),
          answer: '23',
        },
        {
          question: '17 - 8?',
          options: shuffleArray(['8', '9', '10', '11']),
          answer: '9',
        },
        {
          question: '16 + 7?',
          options: shuffleArray(['22', '23', '24', '25']),
          answer: '23',
        },
        {
          question: '23 - 12?',
          options: shuffleArray(['10', '11', '12', '13']),
          answer: '11',
        },
        {
          question: '18 + 6?',
          options: shuffleArray(['22', '23', '24', '25']),
          answer: '24',
        },
        {
          question: '20 - 8?',
          options: shuffleArray(['10', '11', '12', '13']),
          answer: '12',
        },
        {
          question: '13 + 10?',
          options: shuffleArray(['21', '22', '23', '24']),
          answer: '23',
        },
        {
          question: '19 - 7?',
          options: shuffleArray(['10', '11', '12', '13']),
          answer: '12',
        },
        {
          question: '22 + 5?',
          options: shuffleArray(['25', '26', '27', '28']),
          answer: '27',
        },
        {
          question: '24 - 9?',
          options: shuffleArray(['14', '15', '16', '17']),
          answer: '15',
        },
        {
          question: '11 + 11?',
          options: shuffleArray(['20', '21', '22', '23']),
          answer: '22',
        },
        {
          question: '27 - 11?',
          options: shuffleArray(['15', '16', '17', '18']),
          answer: '16',
        },
        {
          question: '14 + 12?',
          options: shuffleArray(['24', '25', '26', '27']),
          answer: '26',
        },
        {
          question: '30 - 13?',
          options: shuffleArray(['15', '16', '17', '18']),
          answer: '17',
        },
      ];

    case Level.YEAR_4:
      return [
        {
          question: '20 + 15?',
          options: shuffleArray(['32', '33', '34', '35']),
          answer: '35',
        },
        {
          question: '35 - 18?',
          options: shuffleArray(['15', '16', '17', '18']),
          answer: '17',
        },
        {
          question: '16 + 25?',
          options: shuffleArray(['39', '40', '41', '42']),
          answer: '41',
        },
        {
          question: '40 - 12?',
          options: shuffleArray(['27', '28', '29', '30']),
          answer: '28',
        },
        {
          question: '21 + 19?',
          options: shuffleArray(['38', '39', '40', '41']),
          answer: '40',
        },
        {
          question: '33 - 11?',
          options: shuffleArray(['20', '21', '22', '23']),
          answer: '22',
        },
        {
          question: '14 + 27?',
          options: shuffleArray(['39', '40', '41', '42']),
          answer: '41',
        },
        {
          question: '26 - 13?',
          options: shuffleArray(['11', '12', '13', '14']),
          answer: '13',
        },
        {
          question: '23 + 17?',
          options: shuffleArray(['39', '40', '41', '42']),
          answer: '40',
        },
        {
          question: '47 - 19?',
          options: shuffleArray(['26', '27', '28', '29']),
          answer: '28',
        },
        {
          question: '19 + 16?',
          options: shuffleArray(['33', '34', '35', '36']),
          answer: '35',
        },
        {
          question: '29 - 12?',
          options: shuffleArray(['15', '16', '17', '18']),
          answer: '17',
        },
        {
          question: '32 + 10?',
          options: shuffleArray(['39', '40', '41', '42']),
          answer: '42',
        },
        {
          question: '25 - 11?',
          options: shuffleArray(['12', '13', '14', '15']),
          answer: '14',
        },
        {
          question: '18 + 26?',
          options: shuffleArray(['41', '42', '43', '44']),
          answer: '44',
        },
        {
          question: '49 - 22?',
          options: shuffleArray(['26', '27', '28', '29']),
          answer: '27',
        },
        {
          question: '27 + 14?',
          options: shuffleArray(['40', '41', '42', '43']),
          answer: '41',
        },
        {
          question: '31 - 13?',
          options: shuffleArray(['16', '17', '18', '19']),
          answer: '18',
        },
        {
          question: '24 + 15?',
          options: shuffleArray(['37', '38', '39', '40']),
          answer: '39',
        },
        {
          question: '30 - 9?',
          options: shuffleArray(['19', '20', '21', '22']),
          answer: '21',
        },
      ];
    case Level.YEAR_5:
      return [
        {
          question: '45 + 23?',
          options: shuffleArray(['66', '67', '68', '69']),
          answer: '68',
        },
        {
          question: '60 - 35?',
          options: shuffleArray(['24', '25', '26', '27']),
          answer: '25',
        },
        {
          question: '37 + 29?',
          options: shuffleArray(['63', '64', '65', '66']),
          answer: '66',
        },
        {
          question: '56 - 21?',
          options: shuffleArray(['33', '34', '35', '36']),
          answer: '35',
        },
        {
          question: '28 + 39?',
          options: shuffleArray(['64', '65', '66', '67']),
          answer: '67',
        },
        {
          question: '72 - 28?',
          options: shuffleArray(['42', '43', '44', '45']),
          answer: '44',
        },
        {
          question: '33 + 48?',
          options: shuffleArray(['79', '80', '81', '82']),
          answer: '81',
        },
        {
          question: '50 - 15?',
          options: shuffleArray(['34', '35', '36', '37']),
          answer: '35',
        },
        {
          question: '44 + 27?',
          options: shuffleArray(['69', '70', '71', '72']),
          answer: '71',
        },
        {
          question: '65 - 18?',
          options: shuffleArray(['45', '46', '47', '48']),
          answer: '47',
        },
        {
          question: '54 + 32?',
          options: shuffleArray(['84', '85', '86', '87']),
          answer: '86',
        },
        {
          question: '74 - 29?',
          options: shuffleArray(['42', '43', '44', '45']),
          answer: '45',
        },
        {
          question: '25 + 52?',
          options: shuffleArray(['76', '77', '78', '79']),
          answer: '77',
        },
        {
          question: '68 - 23?',
          options: shuffleArray(['43', '44', '45', '46']),
          answer: '45',
        },
        {
          question: '36 + 42?',
          options: shuffleArray(['76', '77', '78', '79']),
          answer: '78',
        },
        {
          question: '58 - 22?',
          options: shuffleArray(['34', '35', '36', '37']),
          answer: '36',
        },
        {
          question: '29 + 46?',
          options: shuffleArray(['72', '73', '74', '75']),
          answer: '75',
        },
        {
          question: '81 - 34?',
          options: shuffleArray(['45', '46', '47', '48']),
          answer: '47',
        },
        {
          question: '38 + 49?',
          options: shuffleArray(['85', '86', '87', '88']),
          answer: '87',
        },
        {
          question: '92 - 47?',
          options: shuffleArray(['43', '44', '45', '46']),
          answer: '45',
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
