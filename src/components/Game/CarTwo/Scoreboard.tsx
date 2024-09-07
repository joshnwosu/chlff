import React from 'react';
import Progress from '../../Shared/Progress/Progress';
import profilePhoto from '../../../../public/assets/bear-profile-photo.png';

 interface ScoreboardProps {
  incorrectAnswers: number
  correctAnswers: number
  progress: number
  timeLeft: number
}

const Scoreboard:React.FC<ScoreboardProps> = ({incorrectAnswers, correctAnswers, progress, timeLeft}) => {
  
  return (
    <div className='h-[38rem] bg-blue-400 rounded-xl backdrop-blur-sm bg-opacity-20 z-10 backdrop shadow-xl text-gray-800'>
      <div>
        <div className="flex items-center p-2">
          <span className="w-16 h-16 rounded-full object-cover mr-4 bg-blue-400 flex justify-center items-center">
            <img src={profilePhoto} alt="Nathan's profile" className='h-12' />
          </span>
          <div className="flex-1">
            <h2 className="text-2xl text-black font-semibold">Nathan</h2>
            <p className="text-gray-800 text-sm"><span className='mr-2'> &#x2022;</span>Class</p>
            <p className="text-gray-800 text-sm"> <span className='mr-2'> &#x2022;</span>School</p>
          </div>
        </div>
        <p className='text-center text-black'>LEVEL</p>
        <Progress progress={progress}/>
      </div>
      <div>
        <div className='flex items-center mt-3 bg-[#397eb7]'>
          <p className='bg-black mr-2 text-center p-3.5 py-5 text-yellow-400'>TIME</p>
          <div className='ml-6'>
            <p className='text-yellow-400 text-center text-xl'>{timeLeft}</p>
            <p className='text-sm text-yellow-400 text-center '>Seconds Left</p>
          </div>
        </div>
        <div className='flex justify-apart items-center py-1'>
          <p className='w-1/3 mr-2 text-center py-3 text-black'>{correctAnswers}</p>
          <p className='text-lg text-black'>Correct answers</p>
        </div>
        <hr className="border-gray-500 border-t-2" />
        <div className='flex justify-apart items-center py-1'>
          <p className='w-1/3 mr-2 text-center py-3 text-black'>{incorrectAnswers}</p>
          <p className='text-lg text-black'>Incorrect answers</p>
        </div>
      </div>
      <div className='bg-[#397eb7] pb-4'>
        <h3 className='text-center text-white pt-2'>INSTRUCTIONS</h3>
        {/* <p className='text-center text-sm  mt-2'>1.) Click on the correct option to reveal a picture piece</p> */}
        <p className='text-center text-sm  mt-2'>Drive through the correct answer using the arrow keys on your keyboard
        or by clicking on the lane.</p>
      </div>
    </div>
  );
};

export default Scoreboard;
