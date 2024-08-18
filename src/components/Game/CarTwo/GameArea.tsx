import React from 'react';
import Car from './Car';
import Road from './Road';
import Surroundings from './Surroundings';
import TheSky from './TheSky';
import road1 from '../../../../public/assets/road/road6.png';

interface GameAreaProps {
  carPosition: number;
  sky: string;
  questionText: string;
  options: number[];
  handleAnswer: (selectedAnswer: number) => void;
  leftAnimationClass: string;
  rightAnimationClass: string;}

const GameArea: React.FC<GameAreaProps> = ({ carPosition, questionText, sky, options, handleAnswer, leftAnimationClass, rightAnimationClass }) => {
  return (
    <div className="h-[40rem] relative bg-white p-6 rounded shadow-lg overflow-hidden flex justify-center items-center flex-row">
    <div className='absolute z-40 top-20 flex justify-around w-full'>
      <button
            className={`bg-green-200 h-12 w-12 mx-2 p-4 rounded-full flex justify-center items-center ${leftAnimationClass}`}
            onClick={() => handleAnswer(options[0])}>
        {options[0]}
      </button>
      <button
            className={`bg-green-200 h-12 w-12 mx-2 p-4 rounded-full  flex justify-center items-center ${rightAnimationClass}`}
            onClick={() => handleAnswer(options[1])}>
        {options[1]}
      </button>
    </div>
    <div>
      <div className="h-1/2 relative">
        <div className='w-full flex justify-center'>
          <div className="absolute z-30 bottom-[20rem] w-[50%] py-4 bg-gradient-to-b from-[#397eb7] to-blue-400 rounded-lg shadow-2xl flex items-center justify-center">
            <h1 className='text-4xl'>{questionText}</h1>
          </div>
        </div>
        
        <div className="relative z-10">
          <TheSky skyImage={sky} />
        </div>
      </div>
      <div className="h-1/2 -mt-44 relative z-20 border-0">
        <Surroundings surroundingsImage={road1} />
        <Road />
        <Car position={`${carPosition}%`} />
      </div>
     
    </div>
  </div>
  
  );
};

export default GameArea;
