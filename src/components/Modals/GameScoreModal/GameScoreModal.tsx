import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function GameScoreModal({ title, children }: Props) {
  return (
      <div className="flex justify-center items-center">
      <div className="bg-gradient-to-b from-indigo-700 to-purple-500  p-4 rounded-2xl shadow-lg min-w-80 h-48 z-10">
      <div className="flex justify-center items-center">
            <p className="text-center text-lg text-gray-300">{title}</p>
          </div>

          <div className="flex justify-center items-center">
            <div className="text-white text-8xl mt-4">{children}</div>
          </div>
        </div>

      </div>
  );
}
