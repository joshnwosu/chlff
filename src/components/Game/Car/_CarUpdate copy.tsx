// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useRef, useState } from 'react';
// import LeaderBoard from '../../LeaderBoard/LeaderBoard';
// import PlayerStat from '../../UserInfo/PlayerStat';
// import classes from './Car.module.css';
// import {
//   generateAdditionQuestions,
//   generateDivisionQuestions,
//   generateMultiplicationQuestions,
//   generateSubtractionQuestions,
//   Level,
//   Question,
// } from '../../../data/questions/questions';
// import CustomButton from '../../Shared/CustomButton/CsutomButton';
// import { soundPlayer } from '../../../utils/sound';
// import { useAppSelector } from '../../../app/hooks';

// interface Answer {
//   id: number;
//   text: number;
//   position: number;
//   left: number;
// }

// // Define the speed type
// interface StageSpeeds {
//   [key: number]: number; // This allows indexing with numbers
// }

// const stageSpeeds: StageSpeeds = {
//   1: 20,
//   2: 30,
//   3: 40,
// };

// export default function CarUpdate() {
//   const [position, setPosition] = useState<'up' | 'down'>('down');
//   const [move, setMove] = useState<number>(200);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
//   const [answers, setAnswers] = useState<Answer[]>([]);
//   const [score, setScore] = useState<number>(0);
//   const [correctAnswers, setCorrectAnswers] = useState<number>(0);
//   const [wrongAnswers, setWrongAnswers] = useState<number>(0);
//   const [isGameActive, setIsGameActive] = useState<boolean>(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [stage, setStage] = useState<number>(1);
//   const [stageMessage, setStageMessage] = useState<string>('');
//   const [showStageMessage, setShowStageMessage] = useState<boolean>(false);
//   const [replayStage, setReplayStage] = useState<boolean>(false);
//   const [timer, setTimer] = useState<number>(60);

//   const movingDivRef = useRef<HTMLDivElement>(null);
//   const roadRef = useRef<HTMLDivElement>(null);

//   const randomPositions = [32, 192];

//   const { selectedYear } = useAppSelector((state) => state.control);
//   const { gameMode, selectedGame } = useAppSelector((state) => state.game);

//   useEffect(() => {
//     const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
//     let questions: Question[] = [];

//     switch (selectedGame?.name) {
//       case 'ADDITION':
//         questions = generateAdditionQuestions(Level[selectedLevel]);
//         break;
//       case 'SUBTRACTION':
//         questions = generateSubtractionQuestions(Level[selectedLevel]);
//         break;
//       case 'MULTIPLICATION':
//         questions = generateMultiplicationQuestions(Level[selectedLevel]);
//         break;
//       case 'DIVISION':
//         questions = generateDivisionQuestions(Level[selectedLevel]);
//         break;
//       default:
//         questions = generateAdditionQuestions(Level[selectedLevel]);
//     }

//     setQuestions(questions);
//   }, [selectedYear, selectedGame]);

//   useEffect(() => {
//     if (!currentQuestion) return;

//     const correctPosition =
//       randomPositions[Math.floor(Math.random() * randomPositions.length)];
//     const wrongPosition = randomPositions.find(
//       (pos) => pos !== correctPosition
//     )!;
//     const roadWidth = roadRef.current?.clientWidth || 0;

//     const newAnswers: Answer[] = [
//       {
//         id: 1,
//         text: currentQuestion.answer,
//         position: correctPosition,
//         left: roadWidth,
//       },
//       {
//         id: 2,
//         text: currentQuestion.answer + Math.floor(Math.random() * 10) + 1,
//         position: wrongPosition,
//         left: roadWidth,
//       },
//     ];

//     setAnswers(newAnswers);
//   }, [currentQuestion]);

//   useEffect(() => {
//     if (isGameActive) {
//       const speed = stageSpeeds[stage] || stageSpeeds[1];

//       const interval = setInterval(() => {
//         setAnswers((prevAnswers) =>
//           prevAnswers.map((answer) => ({
//             ...answer,
//             left: answer.left - speed,
//           }))
//         );
//       }, 100);

//       return () => clearInterval(interval);
//     }
//   }, [isGameActive, stage]);

//   useEffect(() => {
//     // let intervalId: NodeJS.Timeout;

//     if (isGameActive) {
//       const intervalId = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer <= 0) {
//             setIsGameActive(false);
//             setStageMessage('Time is up! You need to replay the stage.');
//             setShowStageMessage(true);
//             setReplayStage(true);
//             clearInterval(intervalId);
//             return 0;
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);

//       return () => clearInterval(intervalId);
//     }
//   }, [isGameActive]);

//   const handleStartClick = () => {
//     soundPlayer.playSound('carbackground');
//     soundPlayer.setVolume('startgame', 0.2);

//     if (questions.length > 0) {
//       const question = questions[currentQuestionIndex];
//       setCurrentQuestion(question);
//       setIsGameActive(true);
//       setCurrentQuestionIndex(0);
//       setStage(1);
//       setStageMessage('');
//       setShowStageMessage(false);
//       setCorrectAnswers(0);
//       setWrongAnswers(0);
//       setScore(0);
//       setTimer(60);
//     }
//   };

//   const handleNextStage = () => {
//     if (stage < 3) {
//       setStage((prevStage) => prevStage + 1);
//       setShowStageMessage(false);
//       setCurrentQuestionIndex(0);
//       setAnswers([]);
//       setCurrentQuestion(questions[0]);
//       setIsGameActive(true);
//       setCorrectAnswers(0);
//       setWrongAnswers(0);
//       setTimer(60);
//     } else {
//       // Optionally handle game completion logic
//       // setIsGameActive(false);
//       handleStartClick();
//     }
//   };

//   const handleReplayStage = () => {
//     setReplayStage(true);
//     setCurrentQuestionIndex(0); // Reset question index for the stage
//     setAnswers([]); // Clear previous answers
//     setCurrentQuestion(questions[0]); // Reset current question
//     setIsGameActive(true); // Restart the game for the current stage
//     setCorrectAnswers(0); // Reset correct answers for the current stage
//     setWrongAnswers(0); // Reset wrong answers for the current stage
//     setTimer(60);
//   };

//   useEffect(() => {
//     const handleKeyPress = (event: KeyboardEvent) => {
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
//     };

//     window.addEventListener('keydown', handleKeyPress);

//     return () => {
//       window.removeEventListener('keydown', handleKeyPress);
//     };
//   }, []);

//   useEffect(() => {
//     setMove(position === 'up' ? randomPositions[0] : randomPositions[1]);
//   }, [position]);

//   useEffect(() => {
//     if (movingDivRef.current && answers.length > 0) {
//       const carRect = movingDivRef.current.getBoundingClientRect();
//       answers.forEach((answer) => {
//         const answerRect = roadRef
//           .current!.querySelector(`#answer-${answer.id}`)!
//           .getBoundingClientRect();
//         if (
//           carRect.left < answerRect.left + answerRect.width &&
//           carRect.left + carRect.width > answerRect.left &&
//           carRect.top < answerRect.top + answerRect.height &&
//           carRect.top + carRect.height > answerRect.top
//         ) {
//           if (answer.text === currentQuestion?.answer) {
//             handleCollision(true);
//           } else {
//             handleCollision(false);
//           }
//         }
//       });
//     }
//   }, [answers, move, currentQuestion]);

//   const handleCollision = (isCorrect: boolean) => {
//     const animatePointElement = movingDivRef.current?.querySelector(
//       `.${classes.animatePoint}`
//     );

//     const gasPointElement = roadRef.current?.querySelector(
//       `.${classes.gasPoint}`
//     );

//     if (isCorrect) {
//       setScore((prevScore) => prevScore + 5);
//       setCorrectAnswers((prev) => prev + 1);
//       setTimer((prevTimer) => prevTimer + 5);

//       soundPlayer.playSound('correct');

//       animatePointElement?.classList.add(classes.showScore);

//       setTimeout(() => {
//         gasPointElement?.classList.add(classes.showGasPoint);
//       }, 300);

//       setTimeout(() => {
//         animatePointElement?.classList.remove(classes.showScore);
//         gasPointElement?.classList.remove(classes.showGasPoint);
//       }, 1000);
//     } else {
//       setWrongAnswers((prev) => prev + 1);
//       soundPlayer.playSound('wrong');
//     }

//     if (currentQuestionIndex + 1 === 10 && stage < 3) {
//       if (correctAnswers > wrongAnswers) {
//         setStageMessage(
//           `Stage ${stage} completed, moving to Stage ${stage + 1}`
//         );
//         setShowStageMessage(true);
//         setIsGameActive(false);
//         setReplayStage(false);
//       } else {
//         setStageMessage('You failed this stage, try again!');
//         setShowStageMessage(true);
//         setIsGameActive(false);
//         setReplayStage(true); // Need to replay the current stage
//       }
//     } else if (currentQuestionIndex + 1 === 10 && stage === 3) {
//       if (correctAnswers > wrongAnswers) {
//         setStageMessage('Game completed, you finished all stages!');
//         setShowStageMessage(true);
//         setIsGameActive(false);
//         soundPlayer.stopSound('carbackground');
//         soundPlayer.playSound('levelup');
//       } else {
//         setStageMessage('You failed this stage, try again!');
//         setShowStageMessage(true);
//         setIsGameActive(false);
//         setReplayStage(true); // Need to replay the current stage
//       }
//     } else {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//       const nextQuestion = questions[questions.indexOf(currentQuestion!) + 1];
//       setCurrentQuestion(nextQuestion);
//       setAnswers([]);
//     }
//   };

//   return (
//     <div className={classes.gameWrapper}>
//       <div className={classes.title}>
//         <h1>{selectedGame?.name} Challenge</h1>
//       </div>

//       <div className={classes.gameCenter}>
//         <div className={classes.gameCenterLeft}>
//           <LeaderBoard />
//         </div>

//         <div className={classes.gameCenterMiddle}>
//           <div className={classes.carContainer}>
//             <div
//               className={classes['cu-road']}
//               style={{
//                 backgroundImage: `url(${
//                   gameMode?.mode.image || 'assets/car/street_snow.jpg'
//                 })`,
//               }}
//             ></div>
//             <div ref={roadRef} className={classes.road}>
//               <h1 className={classes.gasPoint}>(Gas +5)</h1>
//               <div
//                 ref={movingDivRef}
//                 className={classes.car}
//                 style={{ top: `${move}px` }}
//               >
//                 <h1 className={classes.animatePoint}>+5</h1>
//                 <img src='/assets/car/red.png' className={classes.carImage} />
//               </div>
//               <div className={classes.lane}></div>
//               <div className={classes.lane}></div>
//               {answers.map((answer) => (
//                 <div
//                   key={answer.id}
//                   id={`answer-${answer.id}`}
//                   className={classes.answer}
//                   style={{
//                     top: `${answer.position - 6}px`,
//                     left: `${answer.left}px`,
//                   }}
//                 >
//                   {answer.text}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className={classes.question}>
//             {isGameActive ? (
//               <div>
//                 <h1>{currentQuestion ? currentQuestion.question : ''}</h1>

//                 {questions.length > currentQuestionIndex + 1 && (
//                   <div className={classes.questionQueue}>
//                     <p className={classes.questionQueueLabel}>Queue:</p>
//                     <div style={{ display: 'flex', gap: 20 }}>
//                       {questions
//                         .slice(
//                           currentQuestionIndex + 1,
//                           currentQuestionIndex + 4
//                         )
//                         .map((question, index) => (
//                           <div
//                             className={classes.questionQueueText}
//                             key={index.toString()}
//                           >
//                             <p key={index}>{question.question}</p>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : showStageMessage ? (
//               <div className={classes.stageMessage}>
//                 {/* <h2>{stageMessage}</h2>
//                 <CustomButton onClick={handleNextStage}>
//                   {stage === 3 ? 'Finish Game' : `Start Stage ${stage + 1}`}
//                 </CustomButton> */}

//                 <h2>{stageMessage}</h2>
//                 <CustomButton
//                   onClick={replayStage ? handleReplayStage : handleNextStage}
//                 >
//                   {replayStage
//                     ? 'Replay Stage'
//                     : stage === 3
//                     ? 'Play Again'
//                     : `Start Stage ${stage + 1}`}
//                 </CustomButton>
//               </div>
//             ) : (
//               <div>
//                 <CustomButton onClick={handleStartClick}>
//                   Start Game
//                 </CustomButton>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className={classes.gameCenterRight}>
//           <PlayerStat
//             unit={timer}
//             correctAnswers={correctAnswers}
//             wrongAnswers={wrongAnswers}
//             stage={stage}
//             score={score}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
