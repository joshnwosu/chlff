// import React, { useEffect, useRef, useState } from 'react';
// import classes from './Game.module.css';
// import LeaderBoard from '../../LeaderBoard/LeaderBoard';
// import PlayerStat from '../../UserInfo/PlayerStat';
// import { questions as allQuestions } from '../../../data/questions/questions';


// interface Question {
//   question: string;
//   answer: number;
// }

// interface Answer {
//   id: number;
//   text: number;
//   position: number;
//   left: number;
// }

// const Car: React.FC = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
//   const [answers, setAnswers] = useState<Answer[]>([]);

//   const [score, setScore] = useState<number>(0);
//   const [correctAnswers, setCorrectAnswers] = useState<number>(0);
//   const [wrongAnswers, setWrongAnswers] = useState<number>(0);


//   return (
//     <div
//       style={{
//         height: '100%',
//         backgroundColor: '#444',
//       }}
//     >
//       <div className={classes.gameWrapper}>
//         <div className={classes.title}>
//           <h1>Challenge</h1>
//         </div>

//         <div className={classes.gameCenter}>
//           <div className={classes.gameCenterLeft}>
//             <LeaderBoard />
//           </div>
//           <div className={classes.gameCenterMiddle}>
//             <div className={classes.carContainer}>
            
//             </div>
//             <div className={classes.question}>
//               <h1>{currentQuestion ? currentQuestion.question : ''}</h1>
//             </div>
//           </div>
//           <div className={classes.gameCenterRight}>
//             <PlayerStat
//               score={score}
//               correctAnswers={correctAnswers}
//               wrongAnswers={wrongAnswers}
//             />
//           </div>
//         </div>
//       </div>

 
//     </div>
//   );
// };

// export default Car;
