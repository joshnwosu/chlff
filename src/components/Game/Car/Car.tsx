import React, { useEffect, useRef, useState } from 'react';
import classes from './Car.module.css';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';
import PlayerStat from '../../UserInfo/PlayerStat';
import { questions as allQuestions } from '../../../data/questions/questions';
import useSound from '../../../utils/useSound';
import Overlay from '../../Shared/Overlay/Overlay';
import GamePopupModal from '../../Modals/GamePopupModal/GamePopupModal';
import ButtonIcon from '../../Shared/CustomButton/ButtonIcon';
import StarRating from '../../Shared/StarRating/StarRating';

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

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState<string>('Year 1');
  const [currentLevel, setCurrentLevel] = useState<string>('Level 1');

  const [showModal, setShowModal] = useState(false);

  const [status, setStatus] = useState<string>('');

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
            prevAnswers.map((answer) => ({ ...answer, left: answer.left - 20 })) // Increased speed by changing 5 to 10
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
                setStatus('correct');
              } else {
                setWrongAnswers(wrongAnswers + 1);
                setStatus('wrong');
              }
              const nextQuestion =
                questions[questions.indexOf(currentQuestion!) + 1];
              setCurrentQuestion(nextQuestion);
              setAnswers([]);

              if (!nextQuestion) {
                setShowModal(true);
              }

              setTimeout(() => {
                setStatus('idle');
              }, 500);
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

  useEffect(() => {
    console.log('status: ', status);
  }, [status]);

  useEffect(() => {
    setIsPaused(false)
    setCurrentYear('Year 1')
    setCurrentLevel('Level 1')
  },[])

  const calculateStars = (): number => {
    const totalQuestions = correctAnswers + wrongAnswers;
    const correctPercentage = (correctAnswers / totalQuestions) * 100;

    if (correctPercentage >= 90) {
      return 3;
    } else if (correctPercentage >= 70) {
      return 2;
    } else {
      return 1;
    }
  };

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
              <h1>{currentQuestion ? currentQuestion.question : ''}</h1>
            </div>
          </div>
          <div className={classes.gameCenterRight}>
            <PlayerStat
              score={score}
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
            <StarRating score={calculateStars()} size='large' />
            <h1 style={{ color: '#ffffff', fontSize: 30 }}>Congratulations!</h1>
            <div
              style={{
                display: 'flex',
                gap: 10,
              }}
            >
              <ButtonIcon>Replay</ButtonIcon>
              <ButtonIcon>Next</ButtonIcon>
              <ButtonIcon>Settings</ButtonIcon>
            </div>
          </div>
        </GamePopupModal>
      </Overlay>

      {status === 'correct' && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(136, 255, 0, 0.2)',
            zIndex: 9,
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}

      {status === 'wrong' && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(255, 85, 0, 0.2)',
            zIndex: 9,
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

export default Car;
