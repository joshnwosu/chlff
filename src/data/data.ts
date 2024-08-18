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
        { question: '1 + 1?', options: shuffleArray(['1', '2']), answer: '2' },
        { question: '2 + 2?', options: shuffleArray(['3', '4']), answer: '4' },
        { question: '5 - 3?', options: shuffleArray(['2', '3']), answer: '2' },
        { question: '4 + 1?', options: shuffleArray(['4', '5']), answer: '5' },
        { question: '3 + 3?', options: shuffleArray(['6', '7']), answer: '6' },
        { question: '7 - 2?', options: shuffleArray(['5', '6']), answer: '5' },
        { question: '6 + 1?', options: shuffleArray(['7', '8']), answer: '7' },
        { question: '3 - 1?', options: shuffleArray(['2', '3']), answer: '2' },
        { question: '5 + 2?', options: shuffleArray(['6', '7']), answer: '7' },
        { question: '8 - 4?', options: shuffleArray(['3', '4']), answer: '4' },
        { question: '2 + 3?', options: shuffleArray(['4', '5']), answer: '5' },
        { question: '7 + 1?', options: shuffleArray(['7', '8']), answer: '8' },
        { question: '9 - 5?', options: shuffleArray(['4', '5']), answer: '4' },
        { question: '3 + 4?', options: shuffleArray(['7', '8']), answer: '7' },
        { question: '10 - 3?', options: shuffleArray(['6', '7']), answer: '7' },
        { question: '4 + 2?', options: shuffleArray(['5', '6']), answer: '6' },
        { question: '8 - 6?', options: shuffleArray(['2', '3']), answer: '2' },
        { question: '6 + 3?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '5 + 5?',
          options: shuffleArray(['10', '11']),
          answer: '10',
        },
        { question: '7 - 4?', options: shuffleArray(['2', '3']), answer: '3' },
        { question: '9 + 0?', options: shuffleArray(['8', '9']), answer: '9' },
        { question: '8 + 1?', options: shuffleArray(['8', '9']), answer: '9' },
        { question: '5 - 2?', options: shuffleArray(['2', '3']), answer: '3' },
        { question: '3 + 5?', options: shuffleArray(['7', '8']), answer: '8' },
        { question: '10 - 7?', options: shuffleArray(['2', '3']), answer: '3' },
        { question: '2 + 4?', options: shuffleArray(['5', '6']), answer: '6' },
        { question: '6 - 1?', options: shuffleArray(['4', '5']), answer: '5' },
        { question: '7 + 2?', options: shuffleArray(['8', '9']), answer: '9' },
        { question: '4 - 3?', options: shuffleArray(['1', '2']), answer: '1' },
        { question: '8 - 2?', options: shuffleArray(['6', '7']), answer: '6' },
      ];

    case Level.YEAR_2:
      return [
        {
          question: '10 + 5?',
          options: shuffleArray(['14', '15']),
          answer: '15',
        },
        { question: '12 - 7?', options: shuffleArray(['5', '6']), answer: '5' },
        { question: '3 x 2?', options: shuffleArray(['5', '6']), answer: '6' },
        { question: '9 ÷ 3?', options: shuffleArray(['2', '3']), answer: '3' },
        {
          question: '15 + 4?',
          options: shuffleArray(['18', '19']),
          answer: '19',
        },
        {
          question: '20 - 8?',
          options: shuffleArray(['11', '12']),
          answer: '12',
        },
        { question: '2 x 4?', options: shuffleArray(['8', '9']), answer: '8' },
        { question: '16 ÷ 4?', options: shuffleArray(['3', '4']), answer: '4' },
        {
          question: '18 + 2?',
          options: shuffleArray(['19', '20']),
          answer: '20',
        },
        { question: '14 - 9?', options: shuffleArray(['5', '6']), answer: '5' },
        {
          question: '5 x 2?',
          options: shuffleArray(['10', '11']),
          answer: '10',
        },
        { question: '9 ÷ 1?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '17 + 3?',
          options: shuffleArray(['19', '20']),
          answer: '20',
        },
        {
          question: '20 - 15?',
          options: shuffleArray(['4', '5']),
          answer: '5',
        },
        { question: '4 x 2?', options: shuffleArray(['7', '8']), answer: '8' },
        { question: '12 ÷ 6?', options: shuffleArray(['1', '2']), answer: '2' },
        {
          question: '15 + 1?',
          options: shuffleArray(['15', '16']),
          answer: '16',
        },
        { question: '10 - 4?', options: shuffleArray(['5', '6']), answer: '6' },
        { question: '7 x 1?', options: shuffleArray(['7', '8']), answer: '7' },
        { question: '8 ÷ 2?', options: shuffleArray(['3', '4']), answer: '4' },
        {
          question: '11 + 6?',
          options: shuffleArray(['16', '17']),
          answer: '17',
        },
        {
          question: '20 - 10?',
          options: shuffleArray(['9', '10']),
          answer: '10',
        },
        { question: '3 x 3?', options: shuffleArray(['9', '10']), answer: '9' },
        { question: '18 ÷ 9?', options: shuffleArray(['2', '3']), answer: '2' },
        {
          question: '14 + 5?',
          options: shuffleArray(['18', '19']),
          answer: '19',
        },
        { question: '13 - 7?', options: shuffleArray(['5', '6']), answer: '6' },
        {
          question: '6 x 2?',
          options: shuffleArray(['11', '12']),
          answer: '12',
        },
        { question: '16 ÷ 8?', options: shuffleArray(['2', '3']), answer: '2' },
        {
          question: '19 + 1?',
          options: shuffleArray(['19', '20']),
          answer: '20',
        },
        { question: '10 - 5?', options: shuffleArray(['4', '5']), answer: '5' },
      ];

    case Level.YEAR_3:
      return [
        {
          question: '15 + 10?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '20 - 8?',
          options: shuffleArray(['11', '12']),
          answer: '12',
        },
        {
          question: '3 x 4?',
          options: shuffleArray(['11', '12']),
          answer: '12',
        },
        { question: '16 ÷ 4?', options: shuffleArray(['3', '4']), answer: '4' },
        {
          question: '19 + 6?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '30 - 10?',
          options: shuffleArray(['19', '20']),
          answer: '20',
        },
        {
          question: '2 x 5?',
          options: shuffleArray(['9', '10']),
          answer: '10',
        },
        { question: '18 ÷ 3?', options: shuffleArray(['5', '6']), answer: '6' },
        {
          question: '12 + 15?',
          options: shuffleArray(['27', '28']),
          answer: '27',
        },
        {
          question: '23 - 7?',
          options: shuffleArray(['15', '16']),
          answer: '16',
        },
        {
          question: '4 x 4?',
          options: shuffleArray(['15', '16']),
          answer: '16',
        },
        { question: '25 ÷ 5?', options: shuffleArray(['4', '5']), answer: '5' },
        {
          question: '21 + 8?',
          options: shuffleArray(['28', '29']),
          answer: '29',
        },
        {
          question: '35 - 20?',
          options: shuffleArray(['14', '15']),
          answer: '15',
        },
        {
          question: '3 x 6?',
          options: shuffleArray(['17', '18']),
          answer: '18',
        },
        { question: '24 ÷ 6?', options: shuffleArray(['3', '4']), answer: '4' },
        {
          question: '13 + 17?',
          options: shuffleArray(['29', '30']),
          answer: '30',
        },
        {
          question: '27 - 12?',
          options: shuffleArray(['14', '15']),
          answer: '15',
        },
        {
          question: '5 x 5?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '30 ÷ 3?',
          options: shuffleArray(['9', '10']),
          answer: '10',
        },
        {
          question: '17 + 12?',
          options: shuffleArray(['28', '29']),
          answer: '29',
        },
        {
          question: '40 - 15?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '4 x 7?',
          options: shuffleArray(['28', '29']),
          answer: '28',
        },
        { question: '36 ÷ 6?', options: shuffleArray(['5', '6']), answer: '6' },
        {
          question: '18 + 13?',
          options: shuffleArray(['30', '31']),
          answer: '31',
        },
        {
          question: '45 - 20?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '6 x 6?',
          options: shuffleArray(['35', '36']),
          answer: '36',
        },
        { question: '28 ÷ 7?', options: shuffleArray(['3', '4']), answer: '4' },
        {
          question: '19 + 11?',
          options: shuffleArray(['29', '30']),
          answer: '30',
        },
        {
          question: '50 - 25?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
      ];

    case Level.YEAR_4:
      return [
        {
          question: '25 + 15?',
          options: shuffleArray(['39', '40']),
          answer: '40',
        },
        {
          question: '30 - 10?',
          options: shuffleArray(['19', '20']),
          answer: '20',
        },
        {
          question: '5 x 4?',
          options: shuffleArray(['19', '20']),
          answer: '20',
        },
        { question: '24 ÷ 6?', options: shuffleArray(['3', '4']), answer: '4' },
        {
          question: '29 + 11?',
          options: shuffleArray(['39', '40']),
          answer: '40',
        },
        {
          question: '45 - 20?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '3 x 7?',
          options: shuffleArray(['20', '21']),
          answer: '21',
        },
        { question: '36 ÷ 4?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '40 + 10?',
          options: shuffleArray(['49', '50']),
          answer: '50',
        },
        {
          question: '35 - 15?',
          options: shuffleArray(['19', '20']),
          answer: '20',
        },
        {
          question: '6 x 4?',
          options: shuffleArray(['23', '24']),
          answer: '24',
        },
        { question: '32 ÷ 8?', options: shuffleArray(['3', '4']), answer: '4' },
        {
          question: '42 + 8?',
          options: shuffleArray(['49', '50']),
          answer: '50',
        },
        {
          question: '50 - 25?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '8 x 3?',
          options: shuffleArray(['23', '24']),
          answer: '24',
        },
        { question: '48 ÷ 6?', options: shuffleArray(['7', '8']), answer: '8' },
        {
          question: '27 + 13?',
          options: shuffleArray(['39', '40']),
          answer: '40',
        },
        {
          question: '55 - 30?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '4 x 7?',
          options: shuffleArray(['28', '29']),
          answer: '28',
        },
        { question: '40 ÷ 5?', options: shuffleArray(['7', '8']), answer: '8' },
        {
          question: '33 + 17?',
          options: shuffleArray(['49', '50']),
          answer: '50',
        },
        {
          question: '60 - 35?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '5 x 8?',
          options: shuffleArray(['39', '40']),
          answer: '40',
        },
        { question: '54 ÷ 6?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '22 + 18?',
          options: shuffleArray(['39', '40']),
          answer: '40',
        },
        {
          question: '65 - 40?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '3 x 9?',
          options: shuffleArray(['26', '27']),
          answer: '27',
        },
        { question: '56 ÷ 7?', options: shuffleArray(['7', '8']), answer: '8' },
        {
          question: '37 + 13?',
          options: shuffleArray(['49', '50']),
          answer: '50',
        },
        {
          question: '70 - 45?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
      ];

    case Level.YEAR_5:
      return [
        {
          question: '45 + 25?',
          options: shuffleArray(['69', '70']),
          answer: '70',
        },
        {
          question: '50 - 20?',
          options: shuffleArray(['29', '30']),
          answer: '30',
        },
        {
          question: '6 x 7?',
          options: shuffleArray(['41', '42']),
          answer: '42',
        },
        { question: '56 ÷ 8?', options: shuffleArray(['6', '7']), answer: '7' },
        {
          question: '49 + 21?',
          options: shuffleArray(['69', '70']),
          answer: '70',
        },
        {
          question: '75 - 50?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '8 x 5?',
          options: shuffleArray(['39', '40']),
          answer: '40',
        },
        { question: '64 ÷ 8?', options: shuffleArray(['7', '8']), answer: '8' },
        {
          question: '39 + 31?',
          options: shuffleArray(['69', '70']),
          answer: '70',
        },
        {
          question: '70 - 40?',
          options: shuffleArray(['29', '30']),
          answer: '30',
        },
        {
          question: '9 x 4?',
          options: shuffleArray(['35', '36']),
          answer: '36',
        },
        { question: '45 ÷ 5?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '58 + 12?',
          options: shuffleArray(['69', '70']),
          answer: '70',
        },
        {
          question: '80 - 55?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '7 x 6?',
          options: shuffleArray(['41', '42']),
          answer: '42',
        },
        { question: '72 ÷ 9?', options: shuffleArray(['7', '8']), answer: '8' },
        {
          question: '44 + 26?',
          options: shuffleArray(['69', '70']),
          answer: '70',
        },
        {
          question: '85 - 60?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '5 x 8?',
          options: shuffleArray(['39', '40']),
          answer: '40',
        },
        { question: '48 ÷ 6?', options: shuffleArray(['7', '8']), answer: '8' },
        {
          question: '67 + 3?',
          options: shuffleArray(['69', '70']),
          answer: '70',
        },
        {
          question: '90 - 65?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '9 x 7?',
          options: shuffleArray(['62', '63']),
          answer: '63',
        },
        { question: '72 ÷ 8?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '55 + 15?',
          options: shuffleArray(['69', '70']),
          answer: '70',
        },
        {
          question: '95 - 70?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '6 x 9?',
          options: shuffleArray(['53', '54']),
          answer: '54',
        },
        { question: '81 ÷ 9?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '47 + 23?',
          options: shuffleArray(['69', '70']),
          answer: '70',
        },
        {
          question: '100 - 75?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
      ];

    case Level.YEAR_6:
      return [
        {
          question: '50 + 25?',
          options: shuffleArray(['74', '75']),
          answer: '75',
        },
        {
          question: '60 - 20?',
          options: shuffleArray(['39', '40']),
          answer: '40',
        },
        {
          question: '7 x 8?',
          options: shuffleArray(['55', '56']),
          answer: '56',
        },
        { question: '63 ÷ 7?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '54 + 21?',
          options: shuffleArray(['74', '75']),
          answer: '75',
        },
        {
          question: '90 - 65?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '9 x 8?',
          options: shuffleArray(['71', '72']),
          answer: '72',
        },
        { question: '72 ÷ 9?', options: shuffleArray(['7', '8']), answer: '8' },
        {
          question: '68 + 7?',
          options: shuffleArray(['74', '75']),
          answer: '75',
        },
        {
          question: '80 - 40?',
          options: shuffleArray(['39', '40']),
          answer: '40',
        },
        {
          question: '8 x 7?',
          options: shuffleArray(['55', '56']),
          answer: '56',
        },
        { question: '72 ÷ 8?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '59 + 16?',
          options: shuffleArray(['74', '75']),
          answer: '75',
        },
        {
          question: '85 - 60?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '9 x 7?',
          options: shuffleArray(['62', '63']),
          answer: '63',
        },
        { question: '81 ÷ 9?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '57 + 18?',
          options: shuffleArray(['74', '75']),
          answer: '75',
        },
        {
          question: '90 - 50?',
          options: shuffleArray(['39', '40']),
          answer: '40',
        },
        {
          question: '8 x 8?',
          options: shuffleArray(['63', '64']),
          answer: '64',
        },
        { question: '64 ÷ 8?', options: shuffleArray(['7', '8']), answer: '8' },
        {
          question: '49 + 26?',
          options: shuffleArray(['74', '75']),
          answer: '75',
        },
        {
          question: '95 - 70?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '9 x 6?',
          options: shuffleArray(['53', '54']),
          answer: '54',
        },
        { question: '72 ÷ 8?', options: shuffleArray(['8', '9']), answer: '9' },
        {
          question: '65 + 10?',
          options: shuffleArray(['74', '75']),
          answer: '75',
        },
        {
          question: '100 - 75?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
        {
          question: '7 x 9?',
          options: shuffleArray(['62', '63']),
          answer: '63',
        },
        { question: '72 ÷ 9?', options: shuffleArray(['7', '8']), answer: '8' },
        {
          question: '56 + 19?',
          options: shuffleArray(['74', '75']),
          answer: '75',
        },
        {
          question: '105 - 80?',
          options: shuffleArray(['24', '25']),
          answer: '25',
        },
      ];

    default:
      return [];
  }
};
