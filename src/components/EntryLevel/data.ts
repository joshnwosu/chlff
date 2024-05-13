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
      ];

    default:
      return [];
  }
};
