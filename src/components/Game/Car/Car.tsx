// import classes from './Car.module.css';
// import PageWrapper from '../../Shared/PageWrapper/PageWrapper';
// import LeaderBoard from '../../LeaderBoard/LeaderBoard';
// import { useEffect, useRef, useState } from 'react';

// export default function Car() {
//   const [position, setPosition] = useState<string>('center');
//   const [move, setMove] = useState(110);
//   const movingDivRef = useRef<HTMLDivElement>(null);
//   // @ts-ignore
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const movingDiv = movingDivRef.current;
//       if (movingDiv) {
//         const offsetLeft = movingDiv.offsetLeft;
//         console.log('Offset Left:', offsetLeft);

//         // Check if it's reached a certain left position
//         if (offsetLeft <= 200) {
//           // Do something when it reaches a certain left position
//           setIsPaused(true);
//           clearInterval(interval);
//           console.log('Reached a certain left position!');
//         }
//       }
//     }, 100);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     function handleKeyPress(event: KeyboardEvent) {
//       switch (event.key) {
//         case 'ArrowUp':
//           setPosition('up');
//           break;
//         case 'ArrowDown':
//           setPosition('down');
//           break;
//         default:
//           break;
//       }
//     }

//     window.addEventListener('keydown', handleKeyPress);

//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   });

//   useEffect(() => {
//     if (position === 'up') {
//       setMove(20);
//     }

//     if (position === 'down') {
//       setMove(200);
//     }
//   }, [position]);

//   function generateMultiplicationQuestion() {
//     const num1 = Math.floor(Math.random() * 10) + 1;
//     const num2 = Math.floor(Math.random() * 10) + 1;
//     const question = `${num1} x ${num2}`;
//     const answer = num1 * num2;
//     return { question, answer };
//   }

//   return (
//     <PageWrapper>
//       <div className={classes.gameWrapper}>
//         <div className={classes.title}>
//           <h1>Multiplication</h1>
//         </div>

//         <div className={classes.gameCenter}>
//           <div className={classes.gameCenterLeft}>
//             <LeaderBoard />
//           </div>
//           <div className={classes.gameCenterMiddle}>
//             <div className={classes.carContainer}>
//               <div className={classes.road}>
//                 <div className={classes.car} style={{ top: `${move}px` }}></div>

//                 <div className={classes.lane}></div>
//                 <div className={classes.centerLine}></div>
//                 <div className={classes.lane}></div>
//               </div>
//             </div>
//             <div className={classes.question}>
//               <h1>{generateMultiplicationQuestion().question} = ?</h1>
//             </div>
//           </div>
//           <div className={classes.gameCenterRight}></div>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import classes from './Car.module.css';
import PageWrapper from '../../Shared/PageWrapper/PageWrapper';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';

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
  // @ts-ignore
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const movingDivRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generatedQuestions: Question[] = Array.from(
      { length: 10 },
      generateMultiplicationQuestion
    );
    setQuestions(generatedQuestions);
    setCurrentQuestion(generatedQuestions[0]);
  }, []);

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
  }, [answers, currentQuestion, move, questions, score]);

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

  const generateMultiplicationQuestion = (): Question => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const question = `${num1} x ${num2}`;
    const answer = num1 * num2;
    return { question, answer };
  };

  return (
    <PageWrapper>
      <div className={classes.gameWrapper}>
        <div className={classes.title}>
          <h1>Multiplication</h1>
        </div>

        <div className={classes.gameCenter}>
          <div className={classes.gameCenterLeft}>
            <p>score: {score}</p>
            <LeaderBoard />
          </div>
          <div className={classes.gameCenterMiddle}>
            <div className={classes.carContainer}>
              <div ref={roadRef} className={classes.road}>
                <div
                  ref={movingDivRef}
                  className={classes.car}
                  style={{ top: `${move}px` }}
                ></div>
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
          <div className={classes.gameCenterRight}></div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Car;
