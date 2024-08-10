import classes from './Game.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import Puzzle from './Puzzle';
import QuestionsPage from './Questions';
import { revealPiece, selectRandomPiece, addTime, decrementTimer, resetGame } from '../../../features/puzzleSlice';
import questionsData from '../../../data/questions/questions.json'; 
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import profilePhoto from '../../../../public/assets/bear-profile-photo.png';
import Progress from '../../Shared/Progress/Progress';
import Overlay from '../../Shared/Overlay/Overlay';
import GameScoreModal from '../../Modals/GameScoreModal/GameScoreModal';

const imageUrls = [
  '/assets/bear-profile-photo.png',
  '/assets/avatar/african avatar.png',
  '/assets/avatar/asian avatar.png',
  '/assets/avatar/boy avatar.png',
  '/assets/avatar/cute avatar.png',
  '/assets/avatar/excited avatar.png',
  '/assets/avatar/fashion boy.png',
  '/assets/avatar/girl avatar.png',
  '/assets/avatar/glass-girl avatar.png',
  '/assets/avatar/teacher avatar.png',
];

const backgroundColors = [
  'bg-blue-400',
  'bg-green-400',
  'bg-red-400',
  'bg-yellow-400',
];


interface QuestionType {
  id: number;
  question: string;
  answer: string;
  options: string[]; 
}

const players = [
  { first_name: 'Ziyech', last_name: 'Hakim', level: 5 },
  { first_name: 'Mount', last_name: 'Mason', level: 4 },
  { first_name: 'Mainoo', last_name: 'Kobbie', level: 3 },
  { first_name: 'Garnacho', last_name: 'Alejandro', level: 2 },
  { first_name: 'Ziyech', last_name: 'Hakim', level: 5 },
  { first_name: 'Mount', last_name: 'Mason', level: 4 },
  { first_name: 'Mainoo', last_name: 'Kobbie', level: 3 },
  { first_name: 'Garnacho', last_name: 'Alejandro', level: 2 },
];


const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};


const Game: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.puzzle);
  const [feedbackPiece, setFeedbackPiece] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>('');
  const [questions] = useState<QuestionType[]>(questionsData); 
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [gameRunning, setGameRunning] = useState<boolean>(false);


  const [playerImages, setPlayerImages] = useState<string[]>([]);
  const [playerBackgroundColors, setPlayerBackgroundColors] = useState<string[]>([]);

  useEffect(() => {
    const images = players.map(() => imageUrls[Math.floor(Math.random() * imageUrls.length)]);
    const colors = players.map(() => backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);

    setPlayerImages(images);
    setPlayerBackgroundColors(colors);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setGameRunning(false); 
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (state.timeLeft > 0 && !gameEnded && gameRunning) {
      const timer = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
      return () => clearInterval(timer);
    } else if (state.timeLeft <= 0 && !gameEnded) {
      handleGameEnd();
    }
  }, [dispatch, state.timeLeft, gameEnded, gameRunning]);


  const wonAudio = new Audio('./sound/point.wav');
  const lostAudio = new Audio('./sound/negative.wav');



  const handleGameEnd = () => {
    setGameEnded(true);
    setShowModal(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleAnswerSubmit = (answer: string) => {
    if (state.timeLeft <= 0 || state.selectedPiece === null || gameEnded) return;

    const question = questions[state.selectedPiece];
    if (!question) return;

    if (answer.toLowerCase() === question.answer.toLowerCase()) {
      dispatch(revealPiece());
      setCorrectAnswers((prev) => prev + 1);

      if (state.revealedPieces.length + 1 === questions.length) {
        handleGameEnd();
        return;
      }

      dispatch(selectRandomPiece());
      dispatch(addTime(3));
      setFeedbackPiece(state.selectedPiece);
      setBorderColor('border-green-500');
      setShowPopup(true);
      wonAudio.play();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => setShowPopup(false), 1000);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
      setFeedbackPiece(state.selectedPiece);
      setBorderColor('border-red-500');
      lostAudio.play();
    }

    setTimeout(() => {
      setFeedbackPiece(null);
      setBorderColor('');
    }, 1000);
  };


  const restartGame = () => {
    setShowModal(false);
    dispatch(resetGame());
    setCorrectAnswers(0); 
    setIncorrectAnswers(0); 
    setGameEnded(false);
    dispatch(selectRandomPiece());
    setGameRunning(true); 
  };

  const currentQuestion = state.selectedPiece !== null ? questions[state.selectedPiece] : null;

  return (
    <main className="min-h-screen container mx-auto p-5">
      {!gameRunning && !gameEnded && (
        <Overlay opened={true}>

          <div className="flex justify-center items-center h-screen">
            <button
              onClick={restartGame}
              className="bg-blue-500 text-white p-4 rounded-lg shadow-lg"
            >
              Start Game
            </button>
          </div>
        </Overlay >

      )}

      {gameRunning && (
        <div>
          <div className={classes.title}>
            <h1>Picture Puzzle</h1>
          </div>
          <div className='flex justify-center items-center space-x-3 mx-10'>
            <div className='md:w-1/5 hidden md:block'>
              <div className='h-[38rem] bg-blue-400 rounded-xl p-2 backdrop-blur-sm bg-opacity-10 z-10 backdrop shadow-xl text-gray-800'>
                <div className='leader-board'>
                  <p className='leader-board-title'>LeaderBoard</p>
                  <div className='leader-board-players'>
                    {players.map((item, index) => (
                      <motion.div
                        variants={variants}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className='leader-board-player'
                        key={index.toString()}
                      >
                        <div className='mx-auto w-full'>
                          <div className='flex items-center py-1 px-1'>
                            <span className={`w-10 h-10 rounded-full object-cover ${playerBackgroundColors[index]} flex justify-center items-center`}>
                              <img src={playerImages[index]} alt={`${item.first_name}'s profile`} className='h-9' />
                            </span>
                            <div className='flex items-center px-2'>
                              <p className='text-lg mr-4 text-black'>{item.first_name}</p>
                              <p className='text-sm text-black'>Lv{index + 1}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='md:w-3/5 lg:w-3/5'>
              <section className="flex-1 bg-blue-400 bg-opacity-10 backdrop-blur-sm rounded-2xl mb-2">
                <Puzzle feedbackPiece={feedbackPiece} revealedPieces={state.revealedPieces} borderColor={borderColor} />
              </section>


              <section className="flex-1 bg-gradient-to-b  from-[#397eb7] to-blue-400 rounded-lg shadow-lg flex items-center justify-center">
                {currentQuestion ? (
                  <QuestionsPage question={currentQuestion} onAnswerSubmit={handleAnswerSubmit} />
                ) : (
                  <p>No question selected</p>
                )}
              </section>
            </div>

            <div className='w-1/5 hidden md:block'>
              <div className='h-[38rem] bg-blue-400 rounded-xl backdrop-blur-sm bg-opacity-20 z-10 backdrop shadow-xl text-gray-800'>
                <div>
                  <div className="flex items-center p-2">
                    <span className="w-16 h-16 rounded-full object-cover mr-4 bg-blue-400 flex justify-center items-center">
                      <img src={profilePhoto} alt={`${name}'s profile`} className='h-12' />

                    </span>
                    <div className="flex-1">
                      <h2 className="text-2xl text-black font-semibold">Nathan</h2>
                      <p className="text-gray-800 text-sm"><span className='mr-2'> &#x2022;</span>Class</p>
                      <p className="text-gray-800 text-sm"> <span className='mr-2'> &#x2022;</span>School</p>
                    </div>
                  </div>
                  <p className='text-center text-black'>LEVEL</p>

                  <Progress />
                </div>
                <div>
                  <div className='flex items-center mt-3 bg-[#397eb7]'>
                    <p className='bg-black mr-2 text-center p-3.5 py-5 text-yellow-400'>TIME</p>
                    <div className='ml-6'>
                      <p className='text-yellow-400 text-center text-6xl'>{state.timeLeft}</p>
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
                  <p className='text-center text-sm  mt-2'>1.) Click on the correct option to reveal a picture piece</p>
                </div>
              </div>


            </div>
          </div>


          {showPopup && (
            <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 rounded shadow-lg">
              +3 seconds!
            </div>
          )}

        </div>
      )}

      <Overlay opened={showModal}>
        <GameScoreModal title="Your Result">
          <div className="mt-2 py-12">
            <div className="h-24 w-24 bg-indigo-800 rounded-full mx-auto flex justify-center items-center">
              <div>
                <p className="text-7xl text-center"> {correctAnswers}</p>
                <p className="text-xs text-gray-300 text-center">of 30</p>
              </div>
            </div>
            <div
              onClick={restartGame}
              className="flex mt-12 cursor-pointer justify-center items-center text-white bg-indigo-900 hover:bg-indigo-700 py-1 px-4 rounded"
            >
              Replay
            </div>
          </div>
        </GameScoreModal>
      </Overlay>
    </main>
  );
};

export default Game;
