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
//   Question,
// } from '../../../data/questions/questions';
// import CustomButton from '../../Shared/CustomButton/CsutomButton';
// import { useAppDispatch, useAppSelector } from '../../../app/hooks';
// import { Level } from '../../../interfaces/data';
// import Mission from '../../Mission/Mission';
// import { generateRandomAnswer } from '../../../utils/generateRandomAnswer';
// import StreetObject from './StreetObject/StrettObject';
// import { useNavigate } from 'react-router-dom';
// import { unlockItem } from '../../../features/characters/charactersSlice';
// import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
// import { firestore } from '../../../path-to-your-firebase-config'; // Update path

// const imagePath = '/assets/showroom/avatar';

// interface Answer {
//   id: number;
//   text: number;
//   position: number;
//   left: number;
// }

// interface Item {
//   id: number;
//   name: string;
//   image: string;
//   locked: boolean;
// }

// const defaultTime = 60;
// const baseSpeed = 15; // Base speed for level 1
// const speedIncrement = 5; // Speed increment for each level

// const getSpeedForLevel = (level: number) =>
//   baseSpeed + (level - 1) * speedIncrement;

// const totalQuestionsPerStage = 10; // Number of questions per stage
// const totalStages = 3; // Total number of stages

// type MissionImagePaths = {
//   mission: string;
//   gameOver: string;
//   missionPassed: string;
// };

// type MissionModalImages = {
//   [key in
//     | 'doctor'
//     | 'firefighter'
//     | 'engineer'
//     | 'police'
//     | 'scientist']: MissionImagePaths;
// };

// const missionModalImages: MissionModalImages = {
//   doctor: {
//     mission: 'assets/mission/doctor_mission/mission1_modal.png',
//     gameOver: 'assets/mission/doctor_mission/mission1_gameover_modal.png',
//     missionPassed: 'assets/mission/doctor_mission/mission1_passed_modal.png',
//   },
//   firefighter: {
//     mission: 'assets/mission/firefighter_mission/mission2_modal.png',
//     gameOver: 'assets/mission/firefighter_mission/mission2_gameover_modal.png',
//     missionPassed:
//       'assets/mission/firefighter_mission/mission2_passed_modal.png',
//   },
//   police: {
//     mission: 'assets/mission/police_mission/mission3_modal.png',
//     gameOver: 'assets/mission/police_mission/mission3_gameover_modal.png',
//     missionPassed: 'assets/mission/police_mission/mission3_passed_modal.png',
//   },
//   scientist: {
//     mission: 'assets/mission/scientist_mission/mission4_modal.png',
//     gameOver: 'assets/mission/scientist_mission/mission4_gameover_modal.png',
//     missionPassed: 'assets/mission/scientist_mission/mission4_passed_modal.png',
//   },
//   engineer: {
//     mission: 'assets/mission/engineer_mission/mission5_modal.png',
//     gameOver: 'assets/mission/engineer_mission/mission5_gameover_modal.png',
//     missionPassed: 'assets/mission/engineer_mission/mission5_passed_modal.png',
//   },
// };

// export default function Car() {
//   const [position, setPosition] = useState<'up' | 'down'>('down');
//   const [move, setMove] = useState<number>(200);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
//   const [answers, setAnswers] = useState<Answer[]>([]);
//   const [correctAnswers, setCorrectAnswers] = useState<number>(0);
//   const [wrongAnswers, setWrongAnswers] = useState<number>(0);
//   const [isGameActive, setIsGameActive] = useState<boolean>(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [stage, setStage] = useState<number>(1);
//   const [stageMessage, setStageMessage] = useState<string>('');
//   const [showStageMessage, setShowStageMessage] = useState<boolean>(false);
//   const [replayStage, setReplayStage] = useState<boolean>(false);
//   const [timer, setTimer] = useState<number>(defaultTime);
//   const [level, setLevel] = useState<number>(1);
//   const [showNextLevelButton, setShowNextLevelButton] =
//     useState<boolean>(false);
//   const [progressPercentage, setProgressPercentage] = useState<number>(0);
//   const [showMissionModal, setShowMissionModal] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [unlockedItem, setUnlockedItem] = useState<Item>();
//   const [currentLevelFromDB, setCurrentLevelFromDB] = useState(1);
//   const [isLoadingLevel, setIsLoadingLevel] = useState(true);

//   const movingDivRef = useRef<HTMLDivElement>(null);
//   const roadRef = useRef<HTMLDivElement>(null);
//   const startTimeRef = useRef<number>(Date.now());

//   const randomPositions = [28, 198];

//   const { selectedYear } = useAppSelector((state) => state.control);
//   const { gameMode, selectedOperator } = useAppSelector((state) => state.game);
//   const { selectedCharacter } = useAppSelector((state) => state.characters);
//   const { user } = useAppSelector((state) => state.user);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   // Load saved progress from Firestore
//   useEffect(() => {
//     const loadSavedProgress = async () => {
//       if (user) {
//         try {
//           const userDoc = await getDoc(doc(firestore, 'users', user.uid));
//           if (userDoc.exists()) {
//             const data = userDoc.data();
//             setCurrentLevelFromDB(data.currentLevel || 1);
//             setLevel(data.currentLevel || 1);
//           }
//         } catch (error) {
//           console.error('Error loading progress:', error);
//         } finally {
//           setIsLoadingLevel(false);
//         }
//       } else {
//         setIsLoadingLevel(false);
//       }
//     };

//     loadSavedProgress();
//   }, [user]);

//   // Track time spent per level
//   useEffect(() => {
//     const handleBeforeUnload = async () => {
//       const timeSpent = Date.now() - startTimeRef.current;
//       await updateLevelTime(level, timeSpent);
//     };

//     startTimeRef.current = Date.now();
//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       const timeSpent = Date.now() - startTimeRef.current;
//       updateLevelTime(level, timeSpent);
//     };
//   }, [level]);

//   // Update level time in Firestore
//   const updateLevelTime = async (level: number, timeSpent: number) => {
//     if (!user) return;

//     try {
//       const userRef = doc(firestore, 'users', user.uid);
//       await updateDoc(userRef, {
//         [`levelTimes.${level}`]: increment(timeSpent),
//       });
//     } catch (error) {
//       console.error('Error updating level time:', error);
//     }
//   };

//   // Initialize questions based on selected year and operator
//   useEffect(() => {
//     const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
//     let questions: Question[] = [];

//     switch (selectedOperator?.name) {
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
//   }, [selectedYear, selectedOperator]);

//   // Handle game logic for answers and collisions
//   useEffect(() => {
//     if (isGameActive && movingDivRef.current && answers.length > 0) {
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

//   // Handle game start
//   const handleStartClick = () => {
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
//       setTimer(defaultTime);
//       setProgressPercentage(0);
//     } else {
//       console.error(
//         'Questions not initialized. Restart the game to load questions.'
//       );
//     }
//   };

//   // Handle next stage or level
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
//       setTimer(defaultTime);
//     } else {
//       const newLevel = level + 1;
//       setLevel(newLevel);
//       setStage(1);
//       setShowStageMessage(false);
//       setShowNextLevelButton(true);

//       // Update Firestore with new level
//       if (user) {
//         updateDoc(doc(firestore, 'users', user.uid), {
//           currentLevel: newLevel,
//         });
//       }

//       handleStartClick();
//     }
//   };

//   // Handle replaying a stage
//   const handleReplayStage = () => {
//     setReplayStage(true);
//     setCurrentQuestionIndex(0);
//     setAnswers([]);
//     setCurrentQuestion(questions[0]);
//     setIsGameActive(true);
//     setCorrectAnswers(0);
//     setWrongAnswers(0);
//     setTimer(defaultTime);
//     setProgressPercentage((prev) => prev - 100);
//   };

//   // Handle collision with answers
//   const handleCollision = (isCorrect: boolean) => {
//     if (isCorrect) {
//       setCorrectAnswers((prev) => prev + 1);
//       setTimer((prevTimer) => prevTimer + 5);
//     } else {
//       setWrongAnswers((prev) => prev + 1);
//     }

//     if (currentQuestionIndex + 1 === totalQuestionsPerStage && stage < 3) {
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
//         setReplayStage(true);
//       }
//     } else if (
//       currentQuestionIndex + 1 === totalQuestionsPerStage &&
//       stage === 3
//     ) {
//       if (correctAnswers > wrongAnswers) {
//         setStageMessage(
//           `Level ${level} completed, moving to Level ${level + 1}`
//         );
//         setShowStageMessage(true);
//         setIsGameActive(false);
//         setShowNextLevelButton(true);
//       } else {
//         setStageMessage('You failed this stage, try again!');
//         setShowStageMessage(true);
//         setIsGameActive(false);
//         setReplayStage(true);
//       }
//     } else {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//       const nextQuestion = questions[questions.indexOf(currentQuestion!) + 1];
//       setCurrentQuestion(nextQuestion);
//       setAnswers([]);
//     }
//   };

//   // Render the game UI
//   return (
//     <div className={classes.gameWrapper}>
//       <div className={classes.title}>
//         <h1>{selectedOperator?.name} Challenge</h1>
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
//                   gameMode?.mode.image || 'assets/car/street_grass.jpg'
//                 })`,
//               }}
//             />

//             <div ref={roadRef} className={classes.road}>
//               <StreetObject />
//               <h1 className={classes.gasPoint}>(Gas +5)</h1>
//               <div
//                 ref={movingDivRef}
//                 className={classes.car}
//                 style={{ top: `${move}px` }}
//               >
//                 <h1 className={classes.animatePoint}>+5</h1>
//                 <h1 className={classes.animateNoPoint}>wrong</h1>
//                 <img
//                   src={`/assets/car/car${stage}.png`}
//                   className={classes.carImage}
//                 />
//               </div>
//               <div
//                 className={classes.lane}
//                 onClick={() => handleLaneClick('up')}
//               ></div>
//               <div
//                 className={classes.lane}
//                 onClick={() => handleLaneClick('down')}
//               ></div>

//               {isGameActive &&
//                 answers.map((answer) => (
//                   <div
//                     key={answer.id}
//                     id={`answer-${answer.id}`}
//                     className={`${classes.answer}`}
//                     style={{
//                       top: `${answer.position - 6}px`,
//                       left: `${answer.left}px`,
//                     }}
//                   >
//                     {answer.text}
//                   </div>
//                 ))}
//             </div>
//           </div>

//           <div className={classes.question}>
//             {isGameActive ? (
//               <div>
//                 <h1>
//                   {currentQuestion ? `What is ${currentQuestion.question}` : ''}
//                 </h1>

//                 {questions.length > currentQuestionIndex + 1 && (
//                   <div className={classes.questionQueue}>
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
//                 <h2>{stageMessage}</h2>
//                 {showNextLevelButton ? (
//                   <CustomButton onClick={handleNextStage}>
//                     Next Level
//                   </CustomButton>
//                 ) : (
//                   <CustomButton
//                     onClick={replayStage ? handleReplayStage : handleNextStage}
//                   >
//                     {replayStage
//                       ? 'Replay Stage'
//                       : stage === 3
//                       ? 'Play Again'
//                       : `Start Stage ${stage + 1}`}
//                   </CustomButton>
//                 )}
//               </div>
//             ) : (
//               <div style={{ display: 'flex', gap: 10 }}>
//                 <CustomButton onClick={handleStartClick}>
//                   Start Game
//                 </CustomButton>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className={classes.gameCenterRight}>
//           <PlayerStat
//             timer={timer}
//             correctAnswers={correctAnswers}
//             wrongAnswers={wrongAnswers}
//             totalStage={totalStages}
//             stage={stage}
//             level={level}
//             progress={progressPercentage}
//             gameType='car'
//           />
//         </div>
//       </div>

//       {showMissionModal && (
//         <Mission
//           onPress={() => {
//             setShowMissionModal(false);
//           }}
//           image={getMissionImage('mission')}
//         />
//       )}

//       {replayStage && (
//         <Mission
//           onPress={() => {
//             restartGame();
//           }}
//           image={getMissionImage('gameOver')}
//         />
//       )}

//       {showNextLevelButton && (
//         <Mission
//           onPress={() => {
//             setShowModal(true);
//             unlockItemForLevel(level);
//           }}
//           image={getMissionImage('missionPassed')}
//         />
//       )}

//       {showModal && (
//         <div className={classes.modal}>
//           <div className={classes['modal-content']}>
//             <h2>Congratulations!</h2>
//             <p>You've unlocked an item: {unlockedItem?.name}</p>
//             <img
//               src={`${imagePath}/${unlockedItem?.image}`}
//               alt={unlockedItem?.name}
//               className={classes['modal-img']}
//             />
//             <div>
//               <CustomButton onClick={handleNavigateToShowroom}>
//                 View in Showroom
//               </CustomButton>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
