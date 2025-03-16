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
// // import { soundPlayer } from '../../../utils/sound';
// import { useAppDispatch, useAppSelector } from '../../../app/hooks';
// import { Level } from '../../../interfaces/data';
// import Mission from '../../Mission/Mission';
// import { generateRandomAnswer } from '../../../utils/generateRandomAnswer';
// import StreetObject from './StreetObject/StrettObject';
// import { useNavigate } from 'react-router-dom';
// import { unlockItem } from '../../../features/characters/charactersSlice';
// import { formatTime } from '../../../utils/formatTime';
// import {
//   getUserProfile,
//   updateUserProfile,
// } from '../../../features/user/userSlice';
// import { getLeaderBoard } from '../../../features/leaderBoard/leaderBoardSlice';
// import { _useAudio } from '../../../hook/_useAudio';

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
//   const [, setCount] = useState<number>(0);
//   const [progressPercentage, setProgressPercentage] = useState<number>(0);
//   const [showMissionModal, setShowMissionModal] = useState(true);
//   const [unlockedItem, setUnlockedItem] = useState<Item>();
//   const [carImage, setCarImage] = useState<string>('');
//   const [elapsedTime, setElapsedTime] = useState<number>(0);
//   const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

//   const movingDivRef = useRef<HTMLDivElement>(null);
//   const roadRef = useRef<HTMLDivElement>(null);

//   const randomPositions = [65, 168];

//   const { selectedYear } = useAppSelector((state) => state.control);
//   const { gameMode, selectedOperator } = useAppSelector((state) => state.game);
//   const { selectedCharacter } = useAppSelector((state) => state.characters);
//   const { user } = useAppSelector((state) => state.user);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { play, setBackgroundVolume, stop } = _useAudio();

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
//         text: generateRandomAnswer(currentQuestion.answer, 2),
//         position: wrongPosition,
//         left: roadWidth,
//       },
//     ];

//     setAnswers(newAnswers);
//   }, [currentQuestion]);

//   useEffect(() => {
//     if (isGameActive) {
//       const speed = getSpeedForLevel(level);

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
//   }, [isGameActive, level]); // Updated dependency to include level

//   useEffect(() => {
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
//     play('driving');
//     setBackgroundVolume(0.1);

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
//       setCount(0);
//     } else {
//       console.error(
//         'Questions not initialized. Restart the game to load questions.'
//       );
//     }
//   };

//   // Updated: Handle stage progression and level transition
//   const handleNextStage = () => {
//     if (stage < totalStages) {
//       // Move to next stage
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
//       // Stage 3 completed, prepare for next level
//       setStage(1); // Reset to Stage 1
//       setShowStageMessage(false);
//       setShowNextLevelButton(true); // Show "Next Level" button
//       setIsGameActive(false); // Pause game until player proceeds
//     }
//   };

//   const handleReplayStage = () => {
//     setReplayStage(true);
//     setCurrentQuestionIndex(0);
//     setAnswers([]);
//     setCurrentQuestion(questions[0]);
//     setIsGameActive(true);
//     setCorrectAnswers(0);
//     setWrongAnswers(0);
//     setTimer(defaultTime);
//     setCount((prevCount) => prevCount - totalQuestionsPerStage);
//     setProgressPercentage((prev) => prev - 100);
//   };

//   // Updated: Reset game for new level
//   const handleNextLevel = () => {
//     setStage(1); // Reset to Stage 1
//     setCurrentQuestionIndex(0);
//     setCurrentQuestion(questions[0]);
//     setShowStageMessage(false);
//     setIsGameActive(true);
//     setCorrectAnswers(0);
//     setWrongAnswers(0);
//     setTimer(defaultTime);
//     setShowNextLevelButton(false); // Hide "Next Level" button
//     setAnswers([]);
//     setProgressPercentage(0);
//     setCount(0);
//     setLevel((prevLevel) => prevLevel + 1); // Increment level

//     // update user profile
//     dispatch(getUserProfile());
//     dispatch(getLeaderBoard(selectedYear));
//   };

//   // Ensure PlayerStat re-renders with updated level
//   useEffect(() => {
//     console.log(`Current Level: ${level}, Stage: ${stage}`); // Debug log
//   }, [level, stage]);

//   const handleNavigateToShowroom = () => {
//     navigate('/show-room', {
//       state: { unlockedItem, character: selectedCharacter?.name },
//     });
//     console.log('Unlocked Item: ', unlockedItem);
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
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, []);

//   useEffect(() => {
//     setMove(position === 'up' ? randomPositions[0] : randomPositions[1]);
//   }, [position]);

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

//   const calculateProgress = (count: number) => {
//     const totalQuestions = totalQuestionsPerStage * totalStages * 2;
//     return (count / totalQuestions) * 100 * 2;
//   };

//   // Updated: Handle collision with level transition logic
//   const handleCollision = async (isCorrect: boolean) => {
//     setCount((prev) => {
//       const newCount = prev + 1;
//       const progressPercentage = calculateProgress(newCount);
//       setProgressPercentage(progressPercentage * totalStages);
//       return newCount;
//     });

//     const animatePointElement = movingDivRef.current?.querySelector(
//       `.${classes.animatePoint}`
//     );
//     const animateNoPointElement = movingDivRef.current?.querySelector(
//       `.${classes.animateNoPoint}`
//     );
//     const gasPointElement = roadRef.current?.querySelector(
//       `.${classes.gasPoint}`
//     );

//     if (isCorrect) {
//       play('correct');
//       setCorrectAnswers((prev) => prev + 1);
//       setTimer((prevTimer) => prevTimer + 5);
//       animatePointElement?.classList.add(classes.showScore);
//       setTimeout(() => {
//         gasPointElement?.classList.add(classes.showGasPoint);
//       }, 300);
//       setTimeout(() => {
//         animatePointElement?.classList.remove(classes.showScore);
//         gasPointElement?.classList.remove(classes.showGasPoint);
//       }, 1000);
//     } else {
//       play('wrong');
//       setWrongAnswers((prev) => prev + 1);
//       animateNoPointElement?.classList.add(classes.showScore);
//       setTimeout(() => {
//         animateNoPointElement?.classList.remove(classes.showScore);
//       }, 1000);
//     }

//     if (
//       currentQuestionIndex + 1 === totalQuestionsPerStage &&
//       stage < totalStages
//     ) {
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
//       stage === totalStages
//     ) {
//       if (correctAnswers > wrongAnswers) {
//         setStageMessage(
//           `Level ${level} completed, moving to Level ${level + 1}`
//         );
//         setShowStageMessage(true);
//         setIsGameActive(false);
//         setShowNextLevelButton(true);

//         play('levelUp');
//         stop('driving');

//         if (user) {
//           dispatch(
//             updateUserProfile({
//               uid: user.uid,
//               updatedData: {
//                 carGameInfo: {
//                   level: (user?.carGameInfo.level || 0) + level,
//                   totalTimePlayed:
//                     (user?.carGameInfo?.totalTimePlayed || 0) + elapsedTime,
//                   totalFailedMissions:
//                     user?.carGameInfo?.totalFailedMissions || 0,
//                   totalSuccessfulMissions:
//                     (user?.carGameInfo?.totalSuccessfulMissions || 0) + 1,
//                 },
//               },
//             })
//           )
//             .unwrap()
//             .then(() => {
//               console.log('Profile updated successfully');
//               dispatch(getUserProfile());
//               dispatch(getLeaderBoard(selectedYear));
//             })
//             .catch((error) =>
//               console.error('Failed to update profile:', error)
//             );
//         }
//       } else {
//         setStageMessage('You failed this stage, try again!');
//         setShowStageMessage(true);
//         setIsGameActive(false);
//         setReplayStage(true);
//         if (user) {
//           await dispatch(
//             updateUserProfile({
//               uid: user?.uid,
//               updatedData: {
//                 carGameInfo: {
//                   level: (user?.carGameInfo.level || 0) + level,
//                   totalTimePlayed:
//                     (user?.carGameInfo?.totalTimePlayed || 0) + elapsedTime,
//                   totalFailedMissions:
//                     (user?.carGameInfo?.totalFailedMissions || 0) + 1,
//                   totalSuccessfulMissions:
//                     user?.carGameInfo?.totalSuccessfulMissions || 0,
//                 },
//               },
//             })
//           )
//             .unwrap()
//             .then(() => {
//               console.log('Profile updated successfully');
//               dispatch(getUserProfile());
//               dispatch(getLeaderBoard(selectedYear));
//             })
//             .catch((error) =>
//               console.error('Failed to update profile:', error)
//             );
//         }
//       }
//     } else {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//       const nextQuestion = questions[questions.indexOf(currentQuestion!) + 1];
//       setCurrentQuestion(nextQuestion);
//       setAnswers([]);
//     }
//   };

//   const handleLaneClick = (lane: 'up' | 'down') => {
//     setPosition(lane);
//   };

//   const restartGame = () => {
//     setLevel(1);
//     setStage(1);
//     setCurrentQuestionIndex(0);
//     setCurrentQuestion(null);
//     setQuestions([]);
//     setAnswers([]);
//     setCorrectAnswers(0);
//     setWrongAnswers(0);
//     setTimer(defaultTime);
//     setIsGameActive(false);
//     setProgressPercentage(0);
//     setStageMessage('');
//     setShowStageMessage(false);
//     setReplayStage(false);
//     setShowNextLevelButton(false);

//     const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
//     let newQuestions: Question[] = [];

//     switch (selectedOperator?.name) {
//       case 'ADDITION':
//         newQuestions = generateAdditionQuestions(Level[selectedLevel]);
//         break;
//       case 'SUBTRACTION':
//         newQuestions = generateSubtractionQuestions(Level[selectedLevel]);
//         break;
//       case 'MULTIPLICATION':
//         newQuestions = generateMultiplicationQuestions(Level[selectedLevel]);
//         break;
//       case 'DIVISION':
//         newQuestions = generateDivisionQuestions(Level[selectedLevel]);
//         break;
//       default:
//         newQuestions = generateAdditionQuestions(Level[selectedLevel]);
//     }

//     setQuestions(newQuestions);
//     setPosition('down');
//     setMove(200);
//   };

//   const unlockItemForLevel = (level: number) => {
//     if (selectedCharacter) {
//       const itemId = level;
//       dispatch(
//         unlockItem({
//           characterName: selectedCharacter.name,
//           itemId,
//         })
//       );
//       const unlockedItem = selectedCharacter.items.find(
//         (item) => item.id === itemId
//       );
//       if (unlockedItem) {
//         setUnlockedItem(unlockedItem);
//       } else {
//         console.error('Unlocked item not found in selected character items.');
//       }
//     } else {
//       console.error('No character selected.');
//     }
//   };

//   const getMissionImage = (type: keyof MissionImagePaths) => {
//     if (user && user?.character?.toLowerCase() in missionModalImages) {
//       const characterImages =
//         missionModalImages[
//           user?.character.toLowerCase() as keyof MissionModalImages
//         ];
//       return characterImages[type] || 'assets/mission/default_mission.png';
//     } else {
//       console.log('Error: Invalid or missing character selection.');
//     }
//   };

//   useEffect(() => {
//     unlockItemForLevel(level);
//   }, []);

//   useEffect(() => {
//     if (user && user.character) {
//       const carMapping: { [key: string]: string } = {
//         police: '/assets/car/vehicles/police.png',
//         engineer: '/assets/car/vehicles/engineer.png',
//         doctor: '/assets/car/vehicles/doctor.png',
//         scientist: '/assets/car/vehicles/scientist.png',
//         firefighter: '/assets/car/vehicles/firefighter.png',
//       };
//       setCarImage(
//         carMapping[user?.character?.toLowerCase()] ||
//           '/assets/car/vehicles/police.png'
//       );
//     }
//   }, []);

//   const startTimer = () => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
//     timerIntervalRef.current = setInterval(() => {
//       setElapsedTime((prev) => prev + 1);
//     }, 1000);
//   };

//   const stopTimer = () => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }
//   };

//   useEffect(() => {
//     if (isGameActive) {
//       startTimer();
//     } else {
//       stopTimer();
//     }
//     return () => stopTimer();
//   }, [isGameActive]);

//   return (
//     <div className={classes.gameWrapper}>
//       {false && (
//         <div className={classes.title}>
//           <h1>{selectedOperator?.name} Challenge</h1>
//         </div>
//       )}

//       <div className={classes.gameCenter}>
//         <LeaderBoard type='car' />

//         <div className={classes.gameCenterMiddle}>
//           <div className={classes.carContainer}>
//             <div
//               className={classes['cu-road']}
//               style={{
//                 backgroundImage: `url(${gameMode?.mode.image})`,
//               }}
//             />

//             <div ref={roadRef} className={classes.road}>
//               {false && <StreetObject />}
//               <h1 className={classes.gasPoint}>(Gas +5)</h1>

//               <div className={classes.timer}>
//                 <h3>Time: {formatTime(elapsedTime)}</h3>
//               </div>
//               <div
//                 ref={movingDivRef}
//                 className={classes.car}
//                 style={{ top: `${move}px` }}
//               >
//                 <h1 className={classes.animatePoint}>+5</h1>
//                 <h1 className={classes.animateNoPoint}>wrong</h1>
//                 <img src={carImage} className={classes.carImage} />
//                 {false && (
//                   <img
//                     src={`/assets/car/car${stage}.png`}
//                     className={classes.carImage}
//                   />
//                 )}
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
//                   <div>
//                     <CustomButton onClick={handleNextLevel}>
//                       Next Level
//                     </CustomButton>
//                   </div>
//                 ) : (
//                   <div>
//                     <CustomButton
//                       onClick={
//                         replayStage ? handleReplayStage : handleNextStage
//                       }
//                     >
//                       {replayStage
//                         ? 'Replay Stage'
//                         : stage === 3
//                         ? 'Play Again'
//                         : `Start Stage ${stage + 1}`}
//                     </CustomButton>
//                   </div>
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
//             level={user?.carGameInfo.level ?? level}
//             progress={progressPercentage}
//             gameType='car'
//             gameTitle={`${selectedOperator?.name} Challenge`}
//           />
//         </div>
//       </div>

//       {!showMissionModal && (
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

//       {/* {showNextLevelButton && (
//         <Mission
//           onPress={() => {
//             unlockItemForLevel(level);
//           }}
//           image={getMissionImage('missionPassed')}
//         />
//       )} */}

//       {false && (
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
// import { formatTime } from '../../../utils/formatTime';
// import {
//   getUserProfile,
//   updateUserProfile,
// } from '../../../features/user/userSlice';
// import { getLeaderBoard } from '../../../features/leaderBoard/leaderBoardSlice';
// import { _useAudio } from '../../../hook/_useAudio';

// const imagePath = '/assets/showroom/avatar';

// // Define 10 unlockable items
// const unlockableItems: Item[] = [
//   { id: 1, name: 'Turbo Booster', image: 'turbo_booster.png', locked: true },
//   { id: 2, name: 'Shield', image: 'shield.png', locked: true },
//   { id: 3, name: 'Extra Fuel', image: 'extra_fuel.png', locked: true },
//   { id: 4, name: 'Speed Wings', image: 'speed_wings.png', locked: true },
//   { id: 5, name: 'Laser Beam', image: 'laser_beam.png', locked: true },
//   { id: 6, name: 'Nitro Blast', image: 'nitro_blast.png', locked: true },
//   { id: 7, name: 'Stealth Mode', image: 'stealth_mode.png', locked: true },
//   {
//     id: 8,
//     name: 'Rocket Launcher',
//     image: 'rocket_launcher.png',
//     locked: true,
//   },
//   { id: 9, name: 'Time Warp', image: 'time_warp.png', locked: true },
//   { id: 10, name: 'Gravity Defier', image: 'gravity_defier.png', locked: true },
// ];

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
// const baseSpeed = 15;
// const speedIncrement = 5;

// const getSpeedForLevel = (level: number) =>
//   baseSpeed + (level - 1) * speedIncrement;

// const totalQuestionsPerStage = 10;
// const totalStages = 3;

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
//   const [, setCount] = useState<number>(0);
//   const [progressPercentage, setProgressPercentage] = useState<number>(0);
//   const [showMissionModal, setShowMissionModal] = useState(true);
//   const [unlockedItem, setUnlockedItem] = useState<Item | undefined>();
//   const [carImage, setCarImage] = useState<string>('');
//   const [elapsedTime, setElapsedTime] = useState<number>(0);
//   const [showItemModal, setShowItemModal] = useState<boolean>(false); // State for item selection modal
//   const [selectedItem, setSelectedItem] = useState<Item | null>(null); // Track selected item

//   const movingDivRef = useRef<HTMLDivElement>(null);
//   const roadRef = useRef<HTMLDivElement>(null);
//   const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

//   const randomPositions = [65, 168];

//   const { selectedYear } = useAppSelector((state) => state.control);
//   const { gameMode, selectedOperator } = useAppSelector((state) => state.game);
//   const { selectedCharacter } = useAppSelector((state) => state.characters);
//   const { user } = useAppSelector((state) => state.user);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { play, setBackgroundVolume, stop } = _useAudio();

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
//         text: generateRandomAnswer(currentQuestion.answer, 2),
//         position: wrongPosition,
//         left: roadWidth,
//       },
//     ];

//     setAnswers(newAnswers);
//   }, [currentQuestion]);

//   useEffect(() => {
//     if (isGameActive) {
//       const speed = getSpeedForLevel(level);

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
//   }, [isGameActive, level]);

//   useEffect(() => {
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
//     play('driving');
//     setBackgroundVolume(0.1);

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
//       setCount(0);
//     } else {
//       console.error(
//         'Questions not initialized. Restart the game to load questions.'
//       );
//     }
//   };

//   const handleNextStage = () => {
//     if (stage < totalStages) {
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
//       setStage(1);
//       setShowStageMessage(false);
//       setShowNextLevelButton(true);
//       setIsGameActive(false);
//     }
//   };

//   const handleReplayStage = () => {
//     setReplayStage(true);
//     setCurrentQuestionIndex(0);
//     setAnswers([]);
//     setCurrentQuestion(questions[0]);
//     setIsGameActive(true);
//     setCorrectAnswers(0);
//     setWrongAnswers(0);
//     setTimer(defaultTime);
//     setCount((prevCount) => prevCount - totalQuestionsPerStage);
//     setProgressPercentage((prev) => prev - 100);
//   };

//   const handleNextLevel = () => {
//     setShowItemModal(true); // Show item selection modal
//     stopTimer();
//   };

//   const handleItemSelection = (item: Item) => {
//     setSelectedItem(item);
//   };

//   const confirmItemSelection = () => {
//     if (selectedItem) {
//       dispatch(
//         unlockItem({
//           characterName: selectedCharacter?.name || '',
//           itemId: selectedItem.id,
//         })
//       );
//       setUnlockedItem({ ...selectedItem, locked: false });
//       setShowItemModal(false);
//       setStage(1);
//       setCurrentQuestionIndex(0);
//       setCurrentQuestion(questions[0]);
//       setShowStageMessage(false);
//       setIsGameActive(true);
//       setCorrectAnswers(0);
//       setWrongAnswers(0);
//       setTimer(defaultTime);
//       setShowNextLevelButton(false);
//       setAnswers([]);
//       setProgressPercentage(0);
//       setCount(0);
//       setLevel((prevLevel) => prevLevel + 1);
//       dispatch(getUserProfile());
//       dispatch(getLeaderBoard(selectedYear));
//     } else {
//       alert('Please select an item before proceeding!');
//     }
//   };

//   useEffect(() => {
//     console.log(`Current Level: ${level}, Stage: ${stage}`);
//   }, [level, stage]);

//   const handleNavigateToShowroom = () => {
//     navigate('/show-room', {
//       state: { unlockedItem, character: selectedCharacter?.name },
//     });
//     console.log('Unlocked Item: ', unlockedItem);
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
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, []);

//   useEffect(() => {
//     setMove(position === 'up' ? randomPositions[0] : randomPositions[1]);
//   }, [position]);

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

//   const calculateProgress = (count: number) => {
//     const totalQuestions = totalQuestionsPerStage * totalStages * 2;
//     return (count / totalQuestions) * 100 * 2;
//   };

//   const handleCollision = async (isCorrect: boolean) => {
//     setCount((prev) => {
//       const newCount = prev + 1;
//       const progressPercentage = calculateProgress(newCount);
//       setProgressPercentage(progressPercentage * totalStages);
//       return newCount;
//     });

//     const animatePointElement = movingDivRef.current?.querySelector(
//       `.${classes.animatePoint}`
//     );
//     const animateNoPointElement = movingDivRef.current?.querySelector(
//       `.${classes.animateNoPoint}`
//     );
//     const gasPointElement = roadRef.current?.querySelector(
//       `.${classes.gasPoint}`
//     );

//     if (isCorrect) {
//       play('correct');
//       setCorrectAnswers((prev) => prev + 1);
//       setTimer((prevTimer) => prevTimer + 5);
//       animatePointElement?.classList.add(classes.showScore);
//       setTimeout(() => {
//         gasPointElement?.classList.add(classes.showGasPoint);
//       }, 300);
//       setTimeout(() => {
//         animatePointElement?.classList.remove(classes.showScore);
//         gasPointElement?.classList.remove(classes.showGasPoint);
//       }, 1000);
//     } else {
//       play('wrong');
//       setWrongAnswers((prev) => prev + 1);
//       animateNoPointElement?.classList.add(classes.showScore);
//       setTimeout(() => {
//         animateNoPointElement?.classList.remove(classes.showScore);
//       }, 1000);
//     }

//     if (
//       currentQuestionIndex + 1 === totalQuestionsPerStage &&
//       stage < totalStages
//     ) {
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
//       stage === totalStages
//     ) {
//       if (correctAnswers > wrongAnswers) {
//         setStageMessage(`Level ${level} completed, select an item to unlock!`);
//         setShowStageMessage(true);
//         setIsGameActive(false);
//         setShowNextLevelButton(true);

//         play('levelUp');
//         stop('driving');

//         if (user) {
//           dispatch(
//             updateUserProfile({
//               uid: user.uid,
//               updatedData: {
//                 carGameInfo: {
//                   level: (user?.carGameInfo.level || 0) + level,
//                   totalTimePlayed:
//                     (user?.carGameInfo?.totalTimePlayed || 0) + elapsedTime,
//                   totalFailedMissions:
//                     user?.carGameInfo?.totalFailedMissions || 0,
//                   totalSuccessfulMissions:
//                     (user?.carGameInfo?.totalSuccessfulMissions || 0) + 1,
//                 },
//               },
//             })
//           )
//             .unwrap()
//             .then(() => {
//               console.log('Profile updated successfully');
//               dispatch(getUserProfile());
//               dispatch(getLeaderBoard(selectedYear));
//             })
//             .catch((error) =>
//               console.error('Failed to update profile:', error)
//             );
//         }
//       } else {
//         setStageMessage('You failed this stage, try again!');
//         setShowStageMessage(true);
//         setIsGameActive(false);
//         setReplayStage(true);
//         if (user) {
//           await dispatch(
//             updateUserProfile({
//               uid: user?.uid,
//               updatedData: {
//                 carGameInfo: {
//                   level: (user?.carGameInfo.level || 0) + level,
//                   totalTimePlayed:
//                     (user?.carGameInfo?.totalTimePlayed || 0) + elapsedTime,
//                   totalFailedMissions:
//                     (user?.carGameInfo?.totalFailedMissions || 0) + 1,
//                   totalSuccessfulMissions:
//                     user?.carGameInfo?.totalSuccessfulMissions || 0,
//                 },
//               },
//             })
//           )
//             .unwrap()
//             .then(() => {
//               console.log('Profile updated successfully');
//               dispatch(getUserProfile());
//               dispatch(getLeaderBoard(selectedYear));
//             })
//             .catch((error) =>
//               console.error('Failed to update profile:', error)
//             );
//         }
//       }
//     } else {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//       const nextQuestion = questions[questions.indexOf(currentQuestion!) + 1];
//       setCurrentQuestion(nextQuestion);
//       setAnswers([]);
//     }
//   };

//   const handleLaneClick = (lane: 'up' | 'down') => {
//     setPosition(lane);
//   };

//   const restartGame = () => {
//     setLevel(1);
//     setStage(1);
//     setCurrentQuestionIndex(0);
//     setCurrentQuestion(null);
//     setQuestions([]);
//     setAnswers([]);
//     setCorrectAnswers(0);
//     setWrongAnswers(0);
//     setTimer(defaultTime);
//     setIsGameActive(false);
//     setProgressPercentage(0);
//     setStageMessage('');
//     setShowStageMessage(false);
//     setReplayStage(false);
//     setShowNextLevelButton(false);

//     const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
//     let newQuestions: Question[] = [];

//     switch (selectedOperator?.name) {
//       case 'ADDITION':
//         newQuestions = generateAdditionQuestions(Level[selectedLevel]);
//         break;
//       case 'SUBTRACTION':
//         newQuestions = generateSubtractionQuestions(Level[selectedLevel]);
//         break;
//       case 'MULTIPLICATION':
//         newQuestions = generateMultiplicationQuestions(Level[selectedLevel]);
//         break;
//       case 'DIVISION':
//         newQuestions = generateDivisionQuestions(Level[selectedLevel]);
//         break;
//       default:
//         newQuestions = generateAdditionQuestions(Level[selectedLevel]);
//     }

//     setQuestions(newQuestions);
//     setPosition('down');
//     setMove(200);
//   };

//   const unlockItemForLevel = (level: number) => {
//     if (selectedCharacter) {
//       const itemId = level;
//       dispatch(
//         unlockItem({
//           characterName: selectedCharacter.name,
//           itemId,
//         })
//       );
//       const unlockedItem = selectedCharacter.items.find(
//         (item) => item.id === itemId
//       );
//       if (unlockedItem) {
//         setUnlockedItem(unlockedItem);
//       } else {
//         console.error('Unlocked item not found in selected character items.');
//       }
//     } else {
//       console.error('No character selected.');
//     }
//   };

//   const getMissionImage = (type: keyof MissionImagePaths) => {
//     if (user && user?.character?.toLowerCase() in missionModalImages) {
//       const characterImages =
//         missionModalImages[
//           user?.character.toLowerCase() as keyof MissionModalImages
//         ];
//       return characterImages[type] || 'assets/mission/default_mission.png';
//     } else {
//       console.log('Error: Invalid or missing character selection.');
//     }
//   };

//   useEffect(() => {
//     unlockItemForLevel(level);
//   }, []);

//   useEffect(() => {
//     if (user && user.character) {
//       const carMapping: { [key: string]: string } = {
//         police: '/assets/car/vehicles/police.png',
//         engineer: '/assets/car/vehicles/engineer.png',
//         doctor: '/assets/car/vehicles/doctor.png',
//         scientist: '/assets/car/vehicles/scientist.png',
//         firefighter: '/assets/car/vehicles/firefighter.png',
//       };
//       setCarImage(
//         carMapping[user?.character?.toLowerCase()] ||
//           '/assets/car/vehicles/police.png'
//       );
//     }
//   }, []);

//   const startTimer = () => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }
//     timerIntervalRef.current = setInterval(() => {
//       setElapsedTime((prev) => prev + 1);
//     }, 1000);
//   };

//   const stopTimer = () => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }
//   };

//   useEffect(() => {
//     if (isGameActive) {
//       startTimer();
//     } else {
//       stopTimer();
//     }
//     return () => stopTimer();
//   }, [isGameActive]);

//   return (
//     <div className={classes.gameWrapper}>
//       {false && (
//         <div className={classes.title}>
//           <h1>{selectedOperator?.name} Challenge</h1>
//         </div>
//       )}

//       <div className={classes.gameCenter}>
//         <LeaderBoard type='car' />

//         <div className={classes.gameCenterMiddle}>
//           <div className={classes.carContainer}>
//             <div
//               className={classes['cu-road']}
//               style={{
//                 backgroundImage: `url(${gameMode?.mode.image})`,
//               }}
//             />

//             <div ref={roadRef} className={classes.road}>
//               {false && <StreetObject />}
//               <h1 className={classes.gasPoint}>(Gas +5)</h1>

//               <div className={classes.timer}>
//                 <h3>Time: {formatTime(elapsedTime)}</h3>
//               </div>
//               <div
//                 ref={movingDivRef}
//                 className={classes.car}
//                 style={{ top: `${move}px` }}
//               >
//                 <h1 className={classes.animatePoint}>+5</h1>
//                 <h1 className={classes.animateNoPoint}>wrong</h1>
//                 <img src={carImage} className={classes.carImage} />
//                 {false && (
//                   <img
//                     src={`/assets/car/car${stage}.png`}
//                     className={classes.carImage}
//                   />
//                 )}
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
//                   <div>
//                     <CustomButton onClick={handleNextLevel}>
//                       Next Level
//                     </CustomButton>
//                   </div>
//                 ) : (
//                   <div>
//                     <CustomButton
//                       onClick={
//                         replayStage ? handleReplayStage : handleNextStage
//                       }
//                     >
//                       {replayStage
//                         ? 'Replay Stage'
//                         : stage === 3
//                         ? 'Play Again'
//                         : `Start Stage ${stage + 1}`}
//                     </CustomButton>
//                   </div>
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
//             level={user?.carGameInfo.level ?? level}
//             progress={progressPercentage}
//             gameType='car'
//             gameTitle={`${selectedOperator?.name} Challenge`}
//           />
//         </div>
//       </div>

//       {!showMissionModal && (
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

//       {!showItemModal && (
//         <div className={classes.modal}>
//           <div className={classes['modal-content']}>
//             <h2>Select an Item to Unlock</h2>
//             <p>Choose one item from the list below:</p>
//             <div className={classes.itemGrid}>
//               {unlockableItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className={`${classes.itemCard} ${
//                     selectedItem?.id === item.id ? classes.selected : ''
//                   }`}
//                   onClick={() => handleItemSelection(item)}
//                 >
//                   <img
//                     src={`${imagePath}/${item.image}`}
//                     alt={item.name}
//                     className={classes['modal-img']}
//                   />
//                   <p>{item.name}</p>
//                 </div>
//               ))}
//             </div>
//             <div style={{ marginTop: '20px' }}>
//               <CustomButton onClick={confirmItemSelection}>
//                 Confirm Selection
//               </CustomButton>
//             </div>
//           </div>
//         </div>
//       )}

//       {false && (
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

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';
import PlayerStat from '../../UserInfo/PlayerStat';
import classes from './Car.module.css';
import {
  generateAdditionQuestions,
  generateDivisionQuestions,
  generateMultiplicationQuestions,
  generateSubtractionQuestions,
  Question,
} from '../../../data/questions/questions';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Level } from '../../../interfaces/data';
import Mission from '../../Mission/Mission';
import { generateRandomAnswer } from '../../../utils/generateRandomAnswer';
import StreetObject from './StreetObject/StrettObject';
import { useNavigate } from 'react-router-dom';
import { unlockItem } from '../../../features/characters/charactersSlice';
import { formatTime } from '../../../utils/formatTime';
import {
  getUserProfile,
  updateUserProfile,
} from '../../../features/user/userSlice';
import { getLeaderBoard } from '../../../features/leaderBoard/leaderBoardSlice';
import { _useAudio } from '../../../hook/_useAudio';

const imagePath = '/assets/showroom/avatar';

interface Answer {
  id: number;
  text: number;
  position: number;
  left: number;
}

interface Item {
  id: number;
  name: string;
  image: string;
  locked: boolean;
}

const defaultTime = 60;
const baseSpeed = 15;
const speedIncrement = 5;

const getSpeedForLevel = (level: number) =>
  baseSpeed + (level - 1) * speedIncrement;

const totalQuestionsPerStage = 10;
const totalStages = 3;

type MissionImagePaths = {
  mission: string;
  gameOver: string;
  missionPassed: string;
};

type MissionModalImages = {
  [key in
    | 'doctor'
    | 'firefighter'
    | 'engineer'
    | 'police'
    | 'scientist']: MissionImagePaths;
};

const missionModalImages: MissionModalImages = {
  doctor: {
    mission: 'assets/mission/doctor_mission/mission1_modal.png',
    gameOver: 'assets/mission/doctor_mission/mission1_gameover_modal.png',
    missionPassed: 'assets/mission/doctor_mission/mission1_passed_modal.png',
  },
  firefighter: {
    mission: 'assets/mission/firefighter_mission/mission2_modal.png',
    gameOver: 'assets/mission/firefighter_mission/mission2_gameover_modal.png',
    missionPassed:
      'assets/mission/firefighter_mission/mission2_passed_modal.png',
  },
  police: {
    mission: 'assets/mission/police_mission/mission3_modal.png',
    gameOver: 'assets/mission/police_mission/mission3_gameover_modal.png',
    missionPassed: 'assets/mission/police_mission/mission3_passed_modal.png',
  },
  scientist: {
    mission: 'assets/mission/scientist_mission/mission4_modal.png',
    gameOver: 'assets/mission/scientist_mission/mission4_gameover_modal.png',
    missionPassed: 'assets/mission/scientist_mission/mission4_passed_modal.png',
  },
  engineer: {
    mission: 'assets/mission/engineer_mission/mission5_modal.png',
    gameOver: 'assets/mission/engineer_mission/mission5_gameover_modal.png',
    missionPassed: 'assets/mission/engineer_mission/mission5_passed_modal.png',
  },
};

export default function Car() {
  const [position, setPosition] = useState<'up' | 'down'>('down');
  const [move, setMove] = useState<number>(200);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [stage, setStage] = useState<number>(1);
  const [stageMessage, setStageMessage] = useState<string>('');
  const [showStageMessage, setShowStageMessage] = useState<boolean>(false);
  const [replayStage, setReplayStage] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(defaultTime);
  const [level, setLevel] = useState<number>(1);
  const [showNextLevelButton, setShowNextLevelButton] =
    useState<boolean>(false);
  const [, setCount] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [showMissionModal, setShowMissionModal] = useState(true);
  const [unlockedItem, setUnlockedItem] = useState<Item | undefined>();
  const [carImage, setCarImage] = useState<string>('');
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const movingDivRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const randomPositions = [65, 168];

  const { selectedYear } = useAppSelector((state) => state.control);
  const { gameMode, selectedOperator } = useAppSelector((state) => state.game);
  const { selectedCharacter, characters } = useAppSelector(
    (state) => state.characters
  );
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { play, setBackgroundVolume, stop } = _useAudio();

  // Function to get items by character name
  function getCharacterItems(characterName: string): Item[] {
    const character = characters.find(
      (char) => char.name.toLowerCase() === characterName.toLowerCase()
    );
    return character ? character.items : [];
  }

  // Get character-specific items
  const characterItems = getCharacterItems(user?.character ?? 'police');

  useEffect(() => {
    // console.log('HIIIIIII: ', characters);
    const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
    let questions: Question[] = [];

    switch (selectedOperator?.name) {
      case 'ADDITION':
        questions = generateAdditionQuestions(Level[selectedLevel]);
        break;
      case 'SUBTRACTION':
        questions = generateSubtractionQuestions(Level[selectedLevel]);
        break;
      case 'MULTIPLICATION':
        questions = generateMultiplicationQuestions(Level[selectedLevel]);
        break;
      case 'DIVISION':
        questions = generateDivisionQuestions(Level[selectedLevel]);
        break;
      default:
        questions = generateAdditionQuestions(Level[selectedLevel]);
    }

    setQuestions(questions);
  }, [selectedYear, selectedOperator]);

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
        text: generateRandomAnswer(currentQuestion.answer, 2),
        position: wrongPosition,
        left: roadWidth,
      },
    ];

    setAnswers(newAnswers);
  }, [currentQuestion]);

  useEffect(() => {
    if (isGameActive) {
      const speed = getSpeedForLevel(level);

      const interval = setInterval(() => {
        setAnswers((prevAnswers) =>
          prevAnswers.map((answer) => ({
            ...answer,
            left: answer.left - speed,
          }))
        );
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isGameActive, level]);

  useEffect(() => {
    if (isGameActive) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            setIsGameActive(false);
            setStageMessage('Time is up! You need to replay the stage.');
            setShowStageMessage(true);
            setReplayStage(true);
            clearInterval(intervalId);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isGameActive]);

  const handleStartClick = () => {
    play('driving');
    setBackgroundVolume(0.1);

    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      setCurrentQuestion(question);
      setIsGameActive(true);
      setCurrentQuestionIndex(0);
      setStage(1);
      setStageMessage('');
      setShowStageMessage(false);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setTimer(defaultTime);
      setProgressPercentage(0);
      setCount(0);
    } else {
      console.error(
        'Questions not initialized. Restart the game to load questions.'
      );
    }
  };

  const handleNextStage = () => {
    if (stage < totalStages) {
      setStage((prevStage) => prevStage + 1);
      setShowStageMessage(false);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setCurrentQuestion(questions[0]);
      setIsGameActive(true);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setTimer(defaultTime);
    } else {
      setStage(1);
      setShowStageMessage(false);
      setShowNextLevelButton(true);
      setIsGameActive(false);
    }
  };

  const handleReplayStage = () => {
    setReplayStage(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentQuestion(questions[0]);
    setIsGameActive(true);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimer(defaultTime);
    setCount((prevCount) => prevCount - totalQuestionsPerStage);
    setProgressPercentage((prev) => prev - 100);
  };

  const handleNextLevel = () => {
    setShowItemModal(true);
    stopTimer();
  };

  const handleItemSelection = (item: Item) => {
    setSelectedItem(item);
  };

  const confirmItemSelection = () => {
    if (selectedItem) {
      dispatch(
        unlockItem({
          characterName: selectedCharacter?.name || '',
          itemId: selectedItem.id,
        })
      );
      setUnlockedItem({ ...selectedItem, locked: false });
      setShowItemModal(false);
      setStage(1);
      setCurrentQuestionIndex(0);
      setCurrentQuestion(questions[0]);
      setShowStageMessage(false);
      setIsGameActive(true);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setTimer(defaultTime);
      setShowNextLevelButton(false);
      setAnswers([]);
      setProgressPercentage(0);
      setCount(0);
      setLevel((prevLevel) => prevLevel + 1);
      dispatch(getUserProfile());
      dispatch(getLeaderBoard(selectedYear));
    } else {
      alert('Please select an item before proceeding!');
    }
  };

  useEffect(() => {
    console.log(`Current Level: ${level}, Stage: ${stage}`);
  }, [level, stage]);

  const handleNavigateToShowroom = () => {
    navigate('/show-room', {
      state: { unlockedItem, character: selectedCharacter?.name },
    });
    console.log('Unlocked Item: ', unlockedItem);
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
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    setMove(position === 'up' ? randomPositions[0] : randomPositions[1]);
  }, [position]);

  useEffect(() => {
    if (isGameActive && movingDivRef.current && answers.length > 0) {
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
  }, [answers, move, currentQuestion]);

  const calculateProgress = (count: number) => {
    const totalQuestions = totalQuestionsPerStage * totalStages * 2;
    return (count / totalQuestions) * 100 * 2;
  };

  const handleCollision = async (isCorrect: boolean) => {
    setCount((prev) => {
      const newCount = prev + 1;
      const progressPercentage = calculateProgress(newCount);
      setProgressPercentage(progressPercentage * totalStages);
      return newCount;
    });

    const animatePointElement = movingDivRef.current?.querySelector(
      `.${classes.animatePoint}`
    );
    const animateNoPointElement = movingDivRef.current?.querySelector(
      `.${classes.animateNoPoint}`
    );
    const gasPointElement = roadRef.current?.querySelector(
      `.${classes.gasPoint}`
    );

    if (isCorrect) {
      play('correct');
      setCorrectAnswers((prev) => prev + 1);
      setTimer((prevTimer) => prevTimer + 5);
      animatePointElement?.classList.add(classes.showScore);
      setTimeout(() => {
        gasPointElement?.classList.add(classes.showGasPoint);
      }, 300);
      setTimeout(() => {
        animatePointElement?.classList.remove(classes.showScore);
        gasPointElement?.classList.remove(classes.showGasPoint);
      }, 1000);
    } else {
      play('wrong');
      setWrongAnswers((prev) => prev + 1);
      animateNoPointElement?.classList.add(classes.showScore);
      setTimeout(() => {
        animateNoPointElement?.classList.remove(classes.showScore);
      }, 1000);
    }

    if (
      currentQuestionIndex + 1 === totalQuestionsPerStage &&
      stage < totalStages
    ) {
      if (correctAnswers > wrongAnswers) {
        setStageMessage(
          `Stage ${stage} completed, moving to Stage ${stage + 1}`
        );
        setShowStageMessage(true);
        setIsGameActive(false);
        setReplayStage(false);
      } else {
        setStageMessage('You failed this stage, try again!');
        setShowStageMessage(true);
        setIsGameActive(false);
        setReplayStage(true);
      }
    } else if (
      currentQuestionIndex + 1 === totalQuestionsPerStage &&
      stage === totalStages
    ) {
      if (correctAnswers > wrongAnswers) {
        setStageMessage(`Level ${level} completed, select an item to unlock!`);
        setShowStageMessage(true);
        setIsGameActive(false);
        setShowNextLevelButton(true);

        play('levelUp');
        stop('driving');

        if (user) {
          dispatch(
            updateUserProfile({
              uid: user.uid,
              updatedData: {
                carGameInfo: {
                  level: (user?.carGameInfo.level || 0) + level,
                  totalTimePlayed:
                    (user?.carGameInfo?.totalTimePlayed || 0) + elapsedTime,
                  totalFailedMissions:
                    user?.carGameInfo?.totalFailedMissions || 0,
                  totalSuccessfulMissions:
                    (user?.carGameInfo?.totalSuccessfulMissions || 0) + 1,
                },
              },
            })
          )
            .unwrap()
            .then(() => {
              console.log('Profile updated successfully');
              dispatch(getUserProfile());
              dispatch(getLeaderBoard(selectedYear));
            })
            .catch((error) =>
              console.error('Failed to update profile:', error)
            );
        }
      } else {
        setStageMessage('You failed this stage, try again!');
        setShowStageMessage(true);
        setIsGameActive(false);
        setReplayStage(true);
        if (user) {
          await dispatch(
            updateUserProfile({
              uid: user?.uid,
              updatedData: {
                carGameInfo: {
                  level: (user?.carGameInfo.level || 0) + level,
                  totalTimePlayed:
                    (user?.carGameInfo?.totalTimePlayed || 0) + elapsedTime,
                  totalFailedMissions:
                    (user?.carGameInfo?.totalFailedMissions || 0) + 1,
                  totalSuccessfulMissions:
                    user?.carGameInfo?.totalSuccessfulMissions || 0,
                },
              },
            })
          )
            .unwrap()
            .then(() => {
              console.log('Profile updated successfully');
              dispatch(getUserProfile());
              dispatch(getLeaderBoard(selectedYear));
            })
            .catch((error) =>
              console.error('Failed to update profile:', error)
            );
        }
      }
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      const nextQuestion = questions[questions.indexOf(currentQuestion!) + 1];
      setCurrentQuestion(nextQuestion);
      setAnswers([]);
    }
  };

  const handleLaneClick = (lane: 'up' | 'down') => {
    setPosition(lane);
  };

  const restartGame = () => {
    setLevel(1);
    setStage(1);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(null);
    setQuestions([]);
    setAnswers([]);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimer(defaultTime);
    setIsGameActive(false);
    setProgressPercentage(0);
    setStageMessage('');
    setShowStageMessage(false);
    setReplayStage(false);
    setShowNextLevelButton(false);

    const selectedLevel = `YEAR_${selectedYear}` as keyof typeof Level;
    let newQuestions: Question[] = [];

    switch (selectedOperator?.name) {
      case 'ADDITION':
        newQuestions = generateAdditionQuestions(Level[selectedLevel]);
        break;
      case 'SUBTRACTION':
        newQuestions = generateSubtractionQuestions(Level[selectedLevel]);
        break;
      case 'MULTIPLICATION':
        newQuestions = generateMultiplicationQuestions(Level[selectedLevel]);
        break;
      case 'DIVISION':
        newQuestions = generateDivisionQuestions(Level[selectedLevel]);
        break;
      default:
        newQuestions = generateAdditionQuestions(Level[selectedLevel]);
    }

    setQuestions(newQuestions);
    setPosition('down');
    setMove(200);
  };

  const unlockItemForLevel = (level: number) => {
    if (selectedCharacter) {
      const itemId = level;
      dispatch(
        unlockItem({
          characterName: selectedCharacter.name,
          itemId,
        })
      );
      const unlockedItem = selectedCharacter.items.find(
        (item) => item.id === itemId
      );
      if (unlockedItem) {
        setUnlockedItem(unlockedItem);
      } else {
        console.error('Unlocked item not found in selected character items.');
      }
    } else {
      console.error('No character selected.');
    }
  };

  const getMissionImage = (type: keyof MissionImagePaths) => {
    if (user && user?.character?.toLowerCase() in missionModalImages) {
      const characterImages =
        missionModalImages[
          user?.character.toLowerCase() as keyof MissionModalImages
        ];
      return characterImages[type] || 'assets/mission/default_mission.png';
    } else {
      console.log('Error: Invalid or missing character selection.');
    }
  };

  useEffect(() => {
    unlockItemForLevel(level);
  }, []);

  useEffect(() => {
    if (user && user.character) {
      const carMapping: { [key: string]: string } = {
        police: '/assets/car/vehicles/police.png',
        engineer: '/assets/car/vehicles/engineer.png',
        doctor: '/assets/car/vehicles/doctor.png',
        scientist: '/assets/car/vehicles/scientist.png',
        firefighter: '/assets/car/vehicles/firefighter.png',
      };
      setCarImage(
        carMapping[user?.character?.toLowerCase()] ||
          '/assets/car/vehicles/police.png'
      );
    }
  }, []);

  const startTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    timerIntervalRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isGameActive) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isGameActive]);

  return (
    <div className={classes.gameWrapper}>
      {false && (
        <div className={classes.title}>
          <h1>{selectedOperator?.name} Challenge</h1>
        </div>
      )}

      <div className={classes.gameCenter}>
        <LeaderBoard type='car' />

        <div className={classes.gameCenterMiddle}>
          <div className={classes.carContainer}>
            <div
              className={classes['cu-road']}
              style={{
                backgroundImage: `url(${gameMode?.mode.image})`,
              }}
            />

            <div ref={roadRef} className={classes.road}>
              {false && <StreetObject />}
              <h1 className={classes.gasPoint}>(Gas +5)</h1>

              <div className={classes.timer}>
                <h3>Time: {formatTime(elapsedTime)}</h3>
              </div>
              <div
                ref={movingDivRef}
                className={classes.car}
                style={{ top: `${move}px` }}
              >
                <h1 className={classes.animatePoint}>+5</h1>
                <h1 className={classes.animateNoPoint}>wrong</h1>
                <img src={carImage} className={classes.carImage} />
                {false && (
                  <img
                    src={`/assets/car/car${stage}.png`}
                    className={classes.carImage}
                  />
                )}
              </div>
              <div
                className={classes.lane}
                onClick={() => handleLaneClick('up')}
              ></div>
              <div
                className={classes.lane}
                onClick={() => handleLaneClick('down')}
              ></div>

              {isGameActive &&
                answers.map((answer) => (
                  <div
                    key={answer.id}
                    id={`answer-${answer.id}`}
                    className={`${classes.answer}`}
                    style={{
                      top: `${answer.position - 6}px`,
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
                <h1>
                  {currentQuestion ? `What is ${currentQuestion.question}` : ''}
                </h1>

                {questions.length > currentQuestionIndex + 1 && (
                  <div className={classes.questionQueue}>
                    <div style={{ display: 'flex', gap: 20 }}>
                      {questions
                        .slice(
                          currentQuestionIndex + 1,
                          currentQuestionIndex + 4
                        )
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
                )}
              </div>
            ) : showStageMessage ? (
              <div className={classes.stageMessage}>
                <h2>{stageMessage}</h2>
                {showNextLevelButton ? (
                  <div>
                    <CustomButton onClick={handleNextLevel}>
                      Next Level
                    </CustomButton>
                  </div>
                ) : (
                  <div>
                    <CustomButton
                      onClick={
                        replayStage ? handleReplayStage : handleNextStage
                      }
                    >
                      {replayStage
                        ? 'Replay Stage'
                        : stage === 3
                        ? 'Play Again'
                        : `Start Stage ${stage + 1}`}
                    </CustomButton>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10 }}>
                <CustomButton onClick={handleStartClick}>
                  Start Game
                </CustomButton>
              </div>
            )}
          </div>
        </div>

        <div className={classes.gameCenterRight}>
          <PlayerStat
            timer={timer}
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            totalStage={totalStages}
            stage={stage}
            level={user?.carGameInfo.level ?? level}
            progress={progressPercentage}
            gameType='car'
            gameTitle={`${selectedOperator?.name} Challenge`}
          />
        </div>
      </div>

      {!showMissionModal && (
        <Mission
          onPress={() => {
            setShowMissionModal(false);
          }}
          image={getMissionImage('mission')}
        />
      )}

      {replayStage && (
        <Mission
          onPress={() => {
            restartGame();
          }}
          image={getMissionImage('gameOver')}
        />
      )}

      {showItemModal && (
        <div className={classes.modal}>
          <div className={classes['modal-content']}>
            <h2>Select an Item to Unlock</h2>
            <p>Choose one item from the list below: {user?.character}</p>
            <div className={classes.itemGrid}>
              {characterItems.map((item) => (
                <div
                  key={item.id}
                  className={`${classes.itemCard} ${
                    selectedItem?.id === item.id ? classes.selected : ''
                  }`}
                  onClick={() => handleItemSelection(item)}
                >
                  <img
                    src={`${imagePath}/${item.image}`}
                    alt={item.name}
                    className={classes['modal-img']}
                  />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px' }}>
              <CustomButton onClick={confirmItemSelection}>
                Confirm Selection
              </CustomButton>
            </div>
          </div>
        </div>
      )}

      {false && (
        <div className={classes.modal}>
          <div className={classes['modal-content']}>
            <h2>Congratulations!</h2>
            <p>You've unlocked an item: {unlockedItem?.name}</p>
            <img
              src={`${imagePath}/${unlockedItem?.image}`}
              alt={unlockedItem?.name}
              className={classes['modal-img']}
            />
            <div>
              <CustomButton onClick={handleNavigateToShowroom}>
                View in Showroom
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
