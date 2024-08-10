import { FC, useEffect, useState } from 'react';

interface QuestionProps {
  question: { question: string; answer: string; options: string[] };
  onAnswerSubmit: (answer: string) => void;
}

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuestionsPage: FC<QuestionProps> = ({ question, onAnswerSubmit }) => {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    setShuffledOptions(shuffleArray([...question.options]));
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    onAnswerSubmit(answer);
  };

  return (
    <div className='w-[90%] p-2 rounded-lg'>
      <div className="text-3xl font-bold mb-2 text-center text-white">{question.question}</div>
      <div className="flex space-x-2">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className="bg-[#163a56] text-white p-2 w-full text-center rounded-lg hover:bg-[#0b2539]"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
