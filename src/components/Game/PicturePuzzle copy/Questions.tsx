import React, { FC, useState } from 'react';

interface QuestionProps {
  question: { question: string; answer: string };
  onAnswerSubmit: (answer: string) => void;
}

const QuestionsPage: FC<QuestionProps> = ({ question, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswerSubmit(answer);
    setAnswer("");
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <div className="text-xl font-bold mb-2">{question.question}</div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 w-full text-black"
          placeholder="Your answer..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestionsPage;
