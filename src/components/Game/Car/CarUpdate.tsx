import { useEffect, useRef, useState } from 'react';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';
import PlayerStat from '../../UserInfo/PlayerStat';
import classes from './Car.module.css';
import {
  generateAdditionQuestions,
  generateDivisionQuestions,
  generateMultiplicationQuestions,
  generateSubtractionQuestions,
  Level,
  Question,
} from '../../../data/questions/questions';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { soundPlayer } from '../../../utils/sound';
import { useAppSelector } from '../../../app/hooks';

interface Answer {
  id: number;
  text: number;
  position: number;
  left: number;
}

export default function CarUpdate() {
  // const [level, setLevel] = useState<Level>(Level.YEAR_1);
  const [position, setPosition] = useState<'up' | 'down'>('down');
  const [move, setMove] = useState<number>(200);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const movingDivRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

  const randomPositions = [32, 192];

  const { selectedYear } = useAppSelector((state) => state.control);
  const { gameMode, selectedGame } = useAppSelector((state) => state.game);

  // Dynamically update questions and level based on selectedYear
  useEffect(() => {
    const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
    let questions: Question[] = [];

    if (selectedGame?.name === 'ADDITION') {
      questions = generateAdditionQuestions(Level[selectedLevel]);
    } else if (selectedGame?.name === 'SUBTRACTION') {
      questions = generateSubtractionQuestions(Level[selectedLevel]);
    } else if (selectedGame?.name === 'MULTIPLICATION') {
      questions = generateMultiplicationQuestions(Level[selectedLevel]);
    } else if (selectedGame?.name === 'DIVISION') {
      questions = generateDivisionQuestions(Level[selectedLevel]);
    } else {
      generateAdditionQuestions(Level[selectedLevel]);
    }

    setQuestions(questions);
  }, [selectedYear, selectedGame]);

  useEffect(() => {
    if (!currentQuestion) return;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  useEffect(() => {
    if (isGameActive) {
      const interval = setInterval(() => {
        setAnswers((prevAnswers) =>
          prevAnswers.map((answer) => ({ ...answer, left: answer.left - 20 }))
        );
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isGameActive]);

  const handleStartClick = () => {
    soundPlayer.playSound('carbackground');
    soundPlayer.setVolume('startgame', 0.2);

    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      setCurrentQuestion(question);
      setIsGameActive(true);
      setCurrentQuestionIndex(0);
    }
  };

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
    setMove(position === 'up' ? randomPositions[0] : randomPositions[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  useEffect(() => {
    if (movingDivRef.current && answers.length > 0) {
      const carRect = movingDivRef.current.getBoundingClientRect();
      answers.forEach((answer) => {
        const answerRect = roadRef
          .current!.querySelector(`#answer-${answer.id}`)!
          .getBoundingClientRect();
        if (
          carRect.left < answerRect.left + answerRect.width &&
          carRect.left + carRect.width > answerRect.left &&
          carRect.top < answerRect.top + answerRect.height &&
          carRect.top + carRect.height > answerRect.top
        ) {
          if (answer.text === currentQuestion?.answer) {
            handleCollision(true);
          } else {
            handleCollision(false);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, move, currentQuestion]);

  const handleCollision = (isCorrect: boolean) => {
    const animatePointElement = movingDivRef.current?.querySelector(
      `.${classes.animatePoint}`
    );
    if (isCorrect) {
      setScore((prevScore) => prevScore + 5);
      setCorrectAnswers((prev) => prev + 1);

      soundPlayer.playSound('correct');

      animatePointElement?.classList.add(classes.showScore);

      setTimeout(() => {
        animatePointElement?.classList.remove(classes.showScore);
      }, 1000);
    } else {
      setWrongAnswers((prev) => prev + 1);
      soundPlayer.playSound('wrong');
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    const nextQuestion = questions[questions.indexOf(currentQuestion!) + 1];
    setCurrentQuestion(nextQuestion);
    setAnswers([]);

    if (!nextQuestion) {
      setIsGameActive(false);
      soundPlayer.stopSound('carbackground');
      soundPlayer.playSound('levelup');
    }
  };

  return (
    <div className={classes.gameWrapper}>
      <div className={classes.title}>
        <h1>{selectedGame?.name} Challenge</h1>
      </div>

      <div className={classes.gameCenter}>
        <div className={classes.gameCenterLeft}>
          <LeaderBoard />
        </div>

        <div className={classes.gameCenterMiddle}>
          <div className={classes.carContainer}>
            <div
              className={classes['cu-road']}
              style={{
                backgroundImage: `url(${
                  gameMode?.mode.image || 'assets/car/street_snow.jpg'
                })`,
              }}
            ></div>
            <div ref={roadRef} className={classes.road}>
              <div
                ref={movingDivRef}
                className={classes.car}
                style={{ top: `${move}px` }}
              >
                <h1 className={classes.animatePoint}>+5</h1>
                <img src='/assets/car/red.png' className={classes.carImage} />
              </div>
              <div className={classes.lane}></div>

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
            {isGameActive ? (
              <div>
                <h1>{currentQuestion ? currentQuestion.question : ''}</h1>

                <div className={classes.questionQueue}>
                  <p className={classes.questionQueueLabel}>
                    Upcoming Questions:
                  </p>
                  <div style={{ display: 'flex', gap: 20 }}>
                    {questions
                      .slice(currentQuestionIndex + 1, currentQuestionIndex + 4)
                      .map((question, index) => (
                        <div
                          className={classes.questionQueueText}
                          key={index.toString()}
                        >
                          <p key={index}>{question.question}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <CustomButton onClick={handleStartClick}>
                  Start Game
                </CustomButton>
              </div>
            )}
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
  );
}
