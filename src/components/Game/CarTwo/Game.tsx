import React, { useEffect, useState } from 'react';
import { Level, generateAdditionQuestions, generateSubtractionQuestions, generateMultiplicationQuestions, generateDivisionQuestions } from '../../../data/questions/questions';// Import your questions and levels
import styles from './Game.module.css'
import Leaderboard from './Leaderboard';
import GameArea from './GameArea';
import skyImage1 from '../../../../public/assets/sky/sky3.jpg';
import skyImage2 from '../../../../public/assets/sky/sky2.jpg';
import skyImage3 from '../../../../public/assets/sky/sky3.jpg';
import Scoreboard from './Scoreboard';

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

export interface Question {
  question: string;
  answer: number;
}


const QuizApp: React.FC = () => {
  const [level, setLevel] = useState<Level | null>(null); 
  const [questions, setQuestions] = useState<Question[]>([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0); 
  const [showResult, setShowResult] = useState(false); 
  const [timeLeft, setTimeLeft] = useState<number>(60); 
  const [isTimerRunning, setIsTimerRunning] = useState(false); 
  const [operation, setOperation] = useState<string>('addition');
  const [options, setOptions] = useState<number[]>([]); 

  const [carPosition, setCarPosition] = useState<number>(50); 
  const [sky, setSky] = useState(skyImage1); 
  const [playerImages, setPlayerImages] = useState<string[]>([]);
  const [playerBackgroundColors, setPlayerBackgroundColors] = useState<string[]>([]);

  const leftAnimationClass = styles.fallDiagonalLeft;
  const rightAnimationClass = styles.fallDiagonalRight;

  const handleSkyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSky = event.target.value;
    if (selectedSky === 'sky1') setSky(skyImage1);
    else if (selectedSky === 'sky2') setSky(skyImage2);
    else if (selectedSky === 'sky3') setSky(skyImage3);
  };

  useEffect(() => {
    const images = players.map(() => imageUrls[Math.floor(Math.random() * imageUrls.length)]);
    const colors = players.map(() => backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);
    setPlayerImages(images);
    setPlayerBackgroundColors(colors);
  }, []);


  useEffect(() => {
    if (timeLeft > 0 && isTimerRunning && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); 
    } else if (timeLeft === 0) {
      setShowResult(true);
    }
  }, [timeLeft, showResult, isTimerRunning]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handleAnswer(options[0]);
        setCarPosition(30);
      } else if (event.key === 'ArrowRight') {
        handleAnswer(options[1]);
        setCarPosition(65);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, currentQuestionIndex]);

  useEffect(() => {
    if (questions.length > 0) {
      const newOptions = [
        questions[currentQuestionIndex]?.answer,
        questions[currentQuestionIndex]?.answer + (Math.random() > 0.5 ? 1 : -1),
      ].sort(() => Math.random() - 0.5);
      setOptions(newOptions);
    }
  }, [currentQuestionIndex, questions]);

  const startQuiz = (selectedLevel: Level) => {
    let generatedQuestions: Question[] = [];

    if (operation === 'addition') {
      generatedQuestions = generateAdditionQuestions(selectedLevel);
    } else if (operation === 'subtraction') {
      generatedQuestions = generateSubtractionQuestions(selectedLevel);
    } else if (operation === 'multiplication') {
      generatedQuestions = generateMultiplicationQuestions(selectedLevel);
    } else if (operation === 'division') {
      generatedQuestions = generateDivisionQuestions(selectedLevel);
    }

    setCarPosition(50);
    setLevel(selectedLevel);
    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setShowResult(false);
    setTimeLeft(60); 
    setIsTimerRunning(true); 
  };


  const handleAnswer = (selectedAnswer: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setCorrectAnswers(correctAnswers + 1);
      setTimeLeft((prevTime) => prevTime + 5); 
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true); 
    }
  };

  return (
    <div className=''>
      <main className="flex items-center justify-center h-screen space-x-4 mx-10">
        <div className='md:w-1/5 hidden md:block'>
          <div className='z-50 mt-5'>
            <label>
              Select Sky:
              <select onChange={handleSkyChange}>
                <option value="sky1">Sky 1</option>
                <option value="sky2">Sky 2</option>
                <option value="sky3">Sky 3</option>
              </select>
            </label>
          </div>
          <Leaderboard players={players} playerImages={playerImages} playerBackgroundColors={playerBackgroundColors} />
        </div>

        <div className='h-[38rem] w-2/3 bg-blue-400 rounded-xl p-2 backdrop-blur-sm bg-opacity-10 z-10 backdrop shadow-xl text-gray-800 flex items-center justify-center'>
          {!level && (
            <div className='mt-6'>
              <h1>Select Operation</h1>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className='bg-blue-200 p-2'
              >
                <option value='addition'>Addition</option>
                <option value='subtraction'>Subtraction</option>
                <option value='multiplication'>Multiplication</option>
                <option value='division'>Division</option>
              </select>

              <h1>Select Year to Start Quiz</h1>
              {Object.values(Level).map((lvl) => (
                <button className='bg-blue-200 p-4' key={lvl} onClick={() => startQuiz(lvl)}>
                  {lvl}
                </button>
              ))}
            </div>
          )}

          {level && !showResult && questions.length > 0 && (
            <GameArea
              carPosition={carPosition}
              sky={sky}
              questionText={questions[currentQuestionIndex].question}
              options={options}
              leftAnimationClass={leftAnimationClass}
              rightAnimationClass={rightAnimationClass}
              handleAnswer={handleAnswer} />
          )}


          {showResult && (
            <div>
              <h2>Game Over!</h2>
              <p>Score: {correctAnswers}</p>
              <button onClick={() => {
                setLevel(null);
                setTimeLeft(60); 
              }}>Restart</button>
            </div>
          )}
        </div>

        <div className='w-1/5 hidden md:block'>
          <Scoreboard timeLeft={timeLeft} correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} />
        </div>
      </main>
    </div>
  );

};

export default QuizApp;
