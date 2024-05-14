export enum Level {
  PRIMARY_1 = 'PRIMARY_1',
  PRIMARY_2 = 'PRIMARY_2',
  PRIMARY_3 = 'PRIMARY_3',
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
  isCorrect?: boolean;
}

export const generateQuestions = (level: Level): Question[] => {
  switch (level) {
    case Level.PRIMARY_1:
      return [
        {
          question: "My father's brother is my _______",
          options: ['Father', 'Uncle', 'Brother', 'Cousin'],
          answer: 'Uncle',
        },
        {
          question: 'What color is the sky?',
          options: ['Blue', 'Red', 'Green', 'Yellow'],
          answer: 'Blue',
        },
        {
          question: 'How many legs does a cat have?',
          options: ['Two', 'Four', 'Six', 'Eight'],
          answer: 'Four',
        },
        {
          question: 'What comes after Monday?',
          options: ['Wednesday', 'Friday', 'Saturday', 'Tuesday'],
          answer: 'Tuesday',
        },
        {
          question: 'What is the capital of France?',
          options: ['Paris', 'London', 'Berlin', 'Rome'],
          answer: 'Paris',
        },
        {
          question: "What is the opposite of 'hot'?",
          options: ['Cold', 'Warm', 'Freezing', 'Boiling'],
          answer: 'Cold',
        },
        {
          question: 'How many continents are there?',
          options: ['Five', 'Six', 'Seven', 'Eight'],
          answer: 'Seven',
        },
        {
          question: 'What do you use to write?',
          options: ['Pencil', 'Knife', 'Spoon', 'Fork'],
          answer: 'Pencil',
        },
        {
          question: "What animal says 'meow'?",
          options: ['Dog', 'Cat', 'Cow', 'Sheep'],
          answer: 'Cat',
        },
        {
          question: "What is the opposite of 'big'?",
          options: ['Small', 'Large', 'Huge', 'Giant'],
          answer: 'Small',
        },
        {
          question: 'What is the name of the largest ocean on Earth?',
          options: [
            'Atlantic Ocean',
            'Indian Ocean',
            'Pacific Ocean',
            'Arctic Ocean',
          ],
          answer: 'Pacific Ocean',
        },
        {
          question: 'What do you use to see things that are far away?',
          options: [
            'Telescope',
            'Microscope',
            'Binoculars',
            'Magnifying Glass',
          ],
          answer: 'Telescope',
        },
        {
          question: "What animal is known as the 'king of the jungle'?",
          options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
          answer: 'Lion',
        },
        {
          question: 'What is the largest planet in our solar system?',
          options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
          answer: 'Jupiter',
        },
        {
          question: 'How many days are in a leap year?',
          options: ['365', '366', '364', '367'],
          answer: '366',
        },
        {
          question: 'What is the capital of Japan?',
          options: ['Kyoto', 'Tokyo', 'Osaka', 'Hiroshima'],
          answer: 'Tokyo',
        },
        {
          question: 'What is the fastest land animal?',
          options: ['Cheetah', 'Lion', 'Gazelle', 'Leopard'],
          answer: 'Cheetah',
        },
        {
          question: 'What is the tallest animal in the world?',
          options: ['Elephant', 'Giraffe', 'Horse', 'Zebra'],
          answer: 'Giraffe',
        },
        {
          question:
            'What is the name of the currency used in the United States?',
          options: ['Dollar', 'Euro', 'Pound', 'Yen'],
          answer: 'Dollar',
        },
        {
          question: 'What do bees collect from flowers?',
          options: ['Nectar', 'Pollen', 'Honey', 'Water'],
          answer: 'Pollen',
        },
        {
          question: 'What is the hardest natural substance on Earth?',
          options: ['Steel', 'Iron', 'Diamond', 'Gold'],
          answer: 'Diamond',
        },
        {
          question: 'What is the main ingredient in bread?',
          options: ['Flour', 'Water', 'Salt', 'Yeast'],
          answer: 'Flour',
        },
        {
          question: 'What do you call a baby cow?',
          options: ['Calf', 'Foal', 'Piglet', 'Kid'],
          answer: 'Calf',
        },
        {
          question: 'What is the name of the tallest mountain in the world?',
          options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
          answer: 'Mount Everest',
        },
        {
          question: 'What is the chemical symbol for water?',
          options: ['W', 'H', 'O', 'H2O'],
          answer: 'H2O',
        },
      ];

    default:
      return [];
  }
};
