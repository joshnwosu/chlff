import React, { useState } from 'react';
import Car from './Car';
import Road from './Road';
import Surroundings from './Surroundings';
import TheSky from './TheSky';
import road1 from '../../../../public/assets/road/road4.png';
import DifficultySelector from './DifficultySelector';
import SideImage from './SideImage';
import destination from '../../../../public/assets/surrounding/tower2.png'

interface GameAreaProps {
  carPosition: number;
  carRotation: number;
  sky: string;
  questionText: string;
  options: number[];
  handleAnswer: (selectedAnswer: number) => void;
  leftAnimationClass: string;
  rightAnimationClass: string;
}

const GameArea: React.FC<GameAreaProps> = ({ carPosition, carRotation, questionText, sky, options, handleAnswer, leftAnimationClass, rightAnimationClass }) => {
  const [difficulty, setDifficulty] = useState<number>(1); // Default difficulty level

  const handleDifficultyChange = (newDifficulty: number) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className="h-[40rem] relative bg-white w-full rounded shadow-lg overflow-hidden flex justify-center items-center flex-row">
      <div className='absolute top-[4rem] left-40% p-5 z-10'>
          Destination
          <img src={destination} alt='finishLine'className='h-[12rem]'/>
        </div>
      <div className='absolute z-40 top-20 flex justify-around w-full'>
        <Road />

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
      <div className="relative w-full h-screen overflow-hidden">
        <div className='absolute top-10 left-0 z-20'>
          <DifficultySelector
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
          />
        </div>

        <div className='w-full flex justify-center'>
          <div className="absolute z-30 top-[5rem] w-[50%] py-4 bg-gradient-to-b from-[#397eb7] to-blue-400 rounded-lg shadow-2xl flex items-center justify-center">
            <h1 className='text-4xl'>{questionText}</h1>
          </div>
        </div>

        <div className="w-full h-1/4">
          <TheSky skyImage={sky} />
        </div>
        <div className="w-full h-1/2">
          <Road />
          <Surroundings surroundingsImage={road1} />
          <Car position={`${carPosition}%`} rotation={carRotation} />


          <SideImage position="left" difficulty={difficulty} />
          <SideImage position="right" difficulty={difficulty} />
        </div>
      </div>

      {/* <div>
      <div className="h-1/2 relative w-full">
        <div className='w-full flex justify-center'>
          <div className="absolute z-30 bottom-[20rem] w-[50%] py-4 bg-gradient-to-b from-[#397eb7] to-blue-400 rounded-lg shadow-2xl flex items-center justify-center">
            <h1 className='text-4xl'>{questionText}</h1>
          </div>
        </div>
        
        <div className="relative z-10">
          <TheSky skyImage={sky} />
        </div>
      </div>
      <div className="h-1/2 w-[70rem] -mt-44 relative z-20 border-0">
        <Surroundings surroundingsImage={road1} />
        <Road />
        <Car position={`${carPosition}%`} />
      </div>
     
    </div> */}
    </div>

  );
};

export default GameArea;
