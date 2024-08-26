export const generateRandomAnswer = (
  correctAnswer: number,
  range: number
): number => {
  let randomAnswer;
  do {
    randomAnswer =
      correctAnswer + Math.floor(Math.random() * (2 * range + 1)) - range;
  } while (randomAnswer === correctAnswer);
  return randomAnswer;
};
