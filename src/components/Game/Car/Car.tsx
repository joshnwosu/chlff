import React, { useEffect, useRef, useState } from 'react';
import classes from './Car.module.css';
import PageWrapper from '../../Shared/PageWrapper/PageWrapper';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';
import PlayerStat from '../../UserInfo/PlayerStat';
import { questions as allQuestions } from '../../../data/questions/questions';
import useSound from '../../../utils/useSound';
import Overlay from '../../Shared/Overlay/Overlay';
import GamePopupModal from '../../Modals/GamePopupModal/GamePopupModal';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import SettingsIcon from '../../../icons/SettingsIcon';
import PlayIcon from '../../../icons/PlayIcon';
import VolumeIcon from '../../../icons/VolumeIcon';
import ButtonIcon from '../../Shared/CustomButton/ButtonIcon';

interface Question {
  question: string;
  answer: number;
}

interface Answer {
  id: number;
  text: number;
  position: number;
  left: number;
}

const Car: React.FC = () => {
  const [position, setPosition] = useState<'up' | 'down'>('down');
  const [move, setMove] = useState<number>(200);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const [score, setScore] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);

  // @ts-ignore
  const [isPaused, setIsPaused] = useState<boolean>(true);
  // @ts-ignore
  const [currentYear, setCurrentYear] = useState<string>('Year 1');
  // @ts-ignore
  const [currentLevel, setCurrentLevel] = useState<string>('Level 1');

  const [showModal, setShowModal] = useState(true);

  const movingDivRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedQuestions = allQuestions[currentYear][currentLevel];
    setQuestions(selectedQuestions);
    setCurrentQuestion(selectedQuestions[0]);
  }, [currentYear, currentLevel]);

  useEffect(() => {
    if (!currentQuestion) return;

    const randomPositions = [20, 200];
    const correctPosition =
      randomPositions[Math.floor(Math.random() * randomPositions.length)];
    const wrongPosition = randomPositions.find(
      (pos) => pos !== correctPosition
    )!;

    const roadWidth = roadRef.current?.clientWidth || 0;

    const newAnswers: Answer[] = [
      {
        id: 1,
        text: currentQuestion.answer,
        position: correctPosition,
        left: roadWidth,
      },
      {
        id: 2,
        text: currentQuestion.answer + Math.floor(Math.random() * 10) + 1,
        position: wrongPosition,
        left: roadWidth,
      },
    ];

    setAnswers(newAnswers);
  }, [currentQuestion]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setAnswers(
          (prevAnswers) =>
            prevAnswers.map((answer) => ({ ...answer, left: answer.left - 10 })) // Increased speed by changing 5 to 10
        );
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const checkCollision = () => {
      const movingDiv = movingDivRef.current;
      if (movingDiv) {
        const carRect = movingDiv.getBoundingClientRect();
        answers.forEach((answer) => {
          const answerElement = document.getElementById(`answer-${answer.id}`);
          if (answerElement) {
            const answerRect = answerElement.getBoundingClientRect();

            const isColliding =
              carRect.left < answerRect.right &&
              carRect.right > answerRect.left &&
              carRect.top < answerRect.bottom &&
              carRect.bottom > answerRect.top;

            if (isColliding) {
              if (answer.text === currentQuestion?.answer) {
                setScore(score + 5);
                setCorrectAnswers(correctAnswers + 1);
              } else {
                setWrongAnswers(wrongAnswers + 1);
              }
              const nextQuestion =
                questions[questions.indexOf(currentQuestion!) + 1];
              setCurrentQuestion(nextQuestion);
              setAnswers([]);
            }
          }
        });
      }
    };

    const interval = setInterval(checkCollision, 100);
    return () => clearInterval(interval);
  }, [
    answers,
    currentQuestion,
    move,
    questions,
    score,
    correctAnswers,
    wrongAnswers,
  ]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setPosition('up');
          break;
        case 'ArrowDown':
          setPosition('down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (position === 'up') {
      setMove(20);
    } else if (position === 'down') {
      setMove(200);
    }
  }, [position]);

  useSound('/sound/background-for-car.mp3');

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: '#444',
      }}
    >
      <div className={classes.gameWrapper}>
        <div className={classes.title}>
          <h1>Addition Challenge</h1>
        </div>

        <div className={classes.gameCenter}>
          <div className={classes.gameCenterLeft}>
            <LeaderBoard />
          </div>
          <div className={classes.gameCenterMiddle}>
            <div className={classes.carContainer}>
              <div ref={roadRef} className={classes.road}>
                <div
                  ref={movingDivRef}
                  className={classes.car}
                  style={{ top: `${move}px` }}
                >
                  <img
                    src='/assets/car/smoke.png'
                    className={classes.smokeImage}
                  />
                  <img src='/assets/car/red.png' className={classes.carImage} />
                </div>
                <div className={classes.lane}></div>
                <div className={classes.centerLine}></div>
                <div className={classes.lane}></div>
                {answers.map((answer) => (
                  <div
                    key={answer.id}
                    id={`answer-${answer.id}`}
                    className={classes.answer}
                    style={{
                      top: `${answer.position}px`,
                      left: `${answer.left}px`,
                    }}
                  >
                    {answer.text}
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.question}>
              <h1>
                {currentQuestion ? currentQuestion.question : 'Game Over'}
              </h1>
            </div>
          </div>
          <div className={classes.gameCenterRight}>
            <PlayerStat
              // score={score}
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
            />
          </div>
        </div>
      </div>

      <Overlay opened={showModal} close={() => setShowModal(false)}>
        <GamePopupModal title='You Win'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <h1 style={{ color: '#ffffff', fontSize: 30 }}>Congratulations!</h1>
            <div
              style={{
                display: 'flex',
                gap: 10,
              }}
            >
              <ButtonIcon>
                <VolumeIcon size={30} />
              </ButtonIcon>
              <ButtonIcon>
                <PlayIcon size={30} />
              </ButtonIcon>
              <ButtonIcon>
                <SettingsIcon size={30} />
              </ButtonIcon>
            </div>
          </div>
        </GamePopupModal>
      </Overlay>
    </div>
  );
};

export default Car;
