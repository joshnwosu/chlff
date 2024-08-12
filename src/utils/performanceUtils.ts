export enum StrengthLevel {
  Diamond = 'Diamond Level',
  Gold = 'Gold Level',
  Silver = 'Silver Level',
  None = 'No Level',
}

export const determineStrengthLevel = (score: number): StrengthLevel => {
  if (score >= 60) {
    return StrengthLevel.Diamond;
  } else if (score >= 50) {
    return StrengthLevel.Gold;
  } else if (score >= 40) {
    return StrengthLevel.Silver;
  } else {
    return StrengthLevel.None;
  }
};

export const calculatePercentage = (
  correctAnswers: number,
  totalQuestions: number = 30
): number => {
  return (correctAnswers / totalQuestions) * 100;
};
