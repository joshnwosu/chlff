// import classes from './Assessment.module.css';
// import { useEffect, useState } from 'react';
// import { generateQuestions, Level, Question } from '../../data/data';
// import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';
// import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import {
//   setPlayerScore,
//   toggleShowCongratulationModal,
// } from '../../features/control/controlSlice';
// import Fish from '../../components/Game/Fish/Fish';
// import useSound from '../../utils/useSound';

// const Assessment: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const [level, setLevel] = useState<Level>(Level.YEAR_1);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [questions, setQuestions] = useState<Question[]>(
//     generateQuestions(level)
//   );
//   const [timer, setTimer] = useState<number>(60);
//   const [score, setScore] = useState<number>(0);
//   const [gameOver, setGameOver] = useState<boolean>(false);
//   const [gameActive, setGameActive] = useState<boolean>(false);

//   const { selectedYear } = useAppSelector((state) => state.control);

//   useEffect(() => {
//     if (selectedYear === 1) {
//       setLevel(Level.YEAR_1);
//       setQuestions(generateQuestions(Level.YEAR_1));
//     }
//     if (selectedYear === 2) {
//       setLevel(Level.YEAR_2);
//       setQuestions(generateQuestions(Level.YEAR_2));
//     }
//     if (selectedYear === 3) {
//       setLevel(Level.YEAR_3);
//       setQuestions(generateQuestions(Level.YEAR_3));
//     }
//     if (selectedYear === 4) {
//       setLevel(Level.YEAR_4);
//       setQuestions(generateQuestions(Level.YEAR_4));
//     }
//     if (selectedYear === 5) {
//       setLevel(Level.YEAR_5);
//       setQuestions(generateQuestions(Level.YEAR_5));
//     }
//     if (selectedYear === 6) {
//       setLevel(Level.YEAR_6);
//       setQuestions(generateQuestions(Level.YEAR_6));
//     }
//   }, [selectedYear]);

//   useEffect(() => {
//     if (gameActive) {
//       const timerInterval = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer <= 0) {
//             clearInterval(timerInterval);
//             setGameOver(true);
//             return 0;
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);

//       return () => clearInterval(timerInterval);
//     }
//   }, [gameActive]);

//   const handleQuestionClick = (index: number) => {
//     setCurrentQuestionIndex(index);
//     setSelectedOption(null);
//   };

//   const handleOptionClick = (option: string) => {
//     if (!gameActive) {
//       setGameActive(true);
//     }
//     if (selectedOption === null) {
//       setSelectedOption(option);
//       const updatedQuestions = [...questions];
//       const isCorrect =
//         option === updatedQuestions[currentQuestionIndex].answer;
//       updatedQuestions[currentQuestionIndex].isCorrect = isCorrect;
//       setQuestions(updatedQuestions);

//       if (isCorrect) {
//         setScore((prevScore) => prevScore + 1);
//         setTimer((prevTimer) => Math.min(prevTimer + 5, 60));
//       } else {
//         // setTimer((prevTimer) => Math.max(prevTimer - 5, 0));
//       }

//       setTimeout(() => {
//         goToNextQuestion();
//       }, 300);
//     }
//   };

//   const goToNextQuestion = () => {
//     if (currentQuestionIndex < generateQuestions(level).length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//       setSelectedOption(null);
//     } else {
//       // Quiz finished, show results or navigate to another page
//       console.log('Quiz finished: ', questions, gameOver);
//       setGameOver(true);
//       setGameActive(false);

//       dispatch(toggleShowCongratulationModal(true));
//       restartGame();

//       const failedQuestions = questions.filter(
//         (q) => q.isCorrect === false
//       ).length;
//       const correctQuestions = questions.filter(
//         (q) => q.isCorrect === true
//       ).length;

//       const newScore = {
//         total_questions: questions.length,
//         failed_questions: failedQuestions, // failed questions,
//         correct_questions: correctQuestions, // correct questions,
//       };
//       dispatch(setPlayerScore(newScore));
//     }
//   };

//   const restartGame = () => {
//     setLevel(level);
//     setCurrentQuestionIndex(0);
//     setSelectedOption(null);
//     setQuestions(generateQuestions(level));
//     setTimer(60);
//     setScore(0);
//     setGameOver(false);
//     // setGameActive(true);
//   };

//   useSound('/sound/background-for-fish.mp3');

//   return (
//     <PageWrapper>
//       <div className={classes.container}>
//         <h1 className={classes.containerTitle}>
//           Year {selectedYear} Assessment Questions
//         </h1>

//         <div className={classes.layout}>
//           <div className={classes.screen}>
//             <div className={classes.animation}>
//               <Fish questions={questions} />

//               <div className={classes.question}>
//                 <p>
//                   {`${(currentQuestionIndex + 1).toString().padStart(2, '0')})`}{' '}
//                   {questions[currentQuestionIndex].question}
//                 </p>
//               </div>
//             </div>

//             {false && (
//               <div className={classes.options}>
//                 {questions[currentQuestionIndex].options.map(
//                   (option, index) => (
//                     <CustomButton
//                       key={index}
//                       onClick={() => handleOptionClick(option)}
//                     >
//                       {option}
//                     </CustomButton>
//                   )
//                 )}
//               </div>
//             )}
//           </div>
//           <div className={classes.screenInfo}>
//             <div className={classes.timer}>
//               <div className={classes.timerLabel}>TIME</div>
//               <div className={classes.timerCounter}>
//                 <p className={classes.counter}>{timer}</p>
//                 <p className={classes.counterLabel}>Seconds Left</p>
//               </div>
//             </div>
//             <div className={classes.questionList}>
//               {questions.map((question, index) => (
//                 <div
//                   key={index}
//                   className={`${classes.questionItem} ${
//                     currentQuestionIndex === index ? classes.current : ''
//                   } ${question.isCorrect === true ? classes.correct : ''} ${
//                     question.isCorrect === false ? classes.incorrect : ''
//                   }`}
//                   onClick={() => handleQuestionClick(index)}
//                   // remove the style to make the questions clickable
//                   style={{
//                     pointerEvents: 'none',
//                   }}
//                 >
//                   {(index + 1).toString().padStart(2, '0')}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* {false && <GameOver />} */}
//         {/* <CongratulationModal /> */}
//         {false && (
//           <div>
//             <p>{score}</p>
//             <button onClick={restartGame}>Restart Game</button>
//           </div>
//         )}
//       </div>
//     </PageWrapper>
//   );
// };

// export default Assessment;
