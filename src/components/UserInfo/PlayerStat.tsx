// import classes from './UserInfo.module.css';
// import ArrowUpIcon from '../../icons/ArrowUpIcon';
// import ArrowDownIcon from '../../icons/ArrowDownIcon';
// import Progress from '../Shared/Progress/Progress';
// import UserDetail from '../Shared/UserDetail/UserDetail';
// import TimerView from '../Shared/TimerView/TimerView';

// interface PlayerStatProps {
//   timer?: number;
//   correctAnswers?: number;
//   wrongAnswers?: number;
//   totalStage?: number;
//   stage?: number;
//   level: number;
//   progress?: number; // Array holding scores or progress for each stage
//   gameType?: 'fish' | 'car' | 'puzzle';
// }

// export default function PlayerStat({
//   timer,
//   correctAnswers,
//   wrongAnswers,
//   totalStage,
//   stage,
//   level,
//   progress,
//   gameType = 'car',
// }: PlayerStatProps) {
//   const p = [
//     { title: 'Correct answers', count: correctAnswers || 0 },
//     { title: 'Wrong answers', count: wrongAnswers || 0 },
//   ];

//   const direction = [
//     { title: 'up', icon: <ArrowUpIcon size={20} color='#ffffff' /> },
//     { title: 'down', icon: <ArrowDownIcon size={20} color='#ffffff' /> },
//   ];

//   return (
//     <div className={classes.container}>
//       <UserDetail showLevel mode='light' level={level} />

//       <Progress stage={stage} totalStage={totalStage} progress={progress} />
//       <TimerView
//         title={gameType === 'car' ? 'Gas' : 'Time'}
//         timer={timer}
//         timerDescription={gameType === 'car' ? 'Units left' : 'Seconds left'}
//       />

//       <div className={classes.list_container}>
//         {p.map((item, index) => (
//           <div key={index.toString()} className={classes.list}>
//             <div className={classes.count}>{item.count}</div>
//             <div className={classes.title}>{item.title}</div>
//           </div>
//         ))}
//       </div>

//       <div className={classes.instruction}>
//         <h1>Instructions</h1>
//         <p>
//           {gameType === 'car'
//             ? `Drive through the correct answer using the arrow keys on your keyboard
//           or by clicking on the lane.`
//             : `Swim to the correct answer by guiding the fish using your mouse pad.`}
//         </p>

//         {gameType === 'car' && (
//           <div className={classes.direction}>
//             {direction.map((item, index) => (
//               <div key={index.toString()} className={classes.directionWrap}>
//                 <span className={classes.directionIcon}>{item.icon}</span>
//                 <p className={classes.directionTitle}>{item.title}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import classes from './UserInfo.module.css';
import ArrowUpIcon from '../../icons/ArrowUpIcon';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Progress from '../Shared/Progress/Progress';
import UserDetail from '../Shared/UserDetail/UserDetail';
import TimerView from '../Shared/TimerView/TimerView';
import { FishTypeProps } from '../Game/Fish/Fish';
import FishTypeDisplay from '../Game/Fish/FishTypeDisplay/FishTypeDisplay';

interface PlayerStatProps {
  timer?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  totalStage?: number;
  stage?: number;
  level: number;
  progress?: number;
  gameType?: 'fish' | 'car' | 'puzzle';
  fishTypes?: FishTypeProps[];
  currentFishType?: number;
}

export default function PlayerStat({
  timer,
  correctAnswers = 0,
  wrongAnswers = 0,
  totalStage,
  stage,
  level,
  progress,
  gameType = 'car',
  currentFishType = 0,
  fishTypes = [],
}: PlayerStatProps) {
  const p = [
    { title: 'Correct answers', count: correctAnswers },
    { title: 'Wrong answers', count: wrongAnswers },
  ];

  const direction = [
    { title: 'up', icon: <ArrowUpIcon size={20} color='#ffffff' /> },
    { title: 'down', icon: <ArrowDownIcon size={20} color='#ffffff' /> },
  ];

  // Function to generate game-specific instructions
  const renderInstructions = () => {
    switch (gameType) {
      case 'car':
        return (
          <>
            <p>
              Drive through the correct answer using the arrow keys on your
              keyboard or by clicking on the lane.
            </p>
            <div className={classes.direction}>
              {direction.map((item, index) => (
                <div key={index} className={classes.directionWrap}>
                  <span className={classes.directionIcon}>{item.icon}</span>
                  <p className={classes.directionTitle}>{item.title}</p>
                </div>
              ))}
            </div>
          </>
        );

      case 'fish':
        return (
          <p>
            Swim to the correct answer by guiding the fish using your mouse or
            touch controls.
          </p>
        );

      case 'puzzle':
        return (
          <p>
            Solve the puzzle by dragging and dropping the correct piece into
            place.
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div className={classes.container}>
      {gameType === 'car' && (
        <UserDetail showLevel mode='light' level={level} />
      )}
      {progress && (
        <Progress stage={stage} totalStage={totalStage} progress={progress} />
      )}
      {timer && (
        <TimerView
          title={gameType === 'car' ? 'Gas' : 'Time'}
          timer={timer}
          timerDescription={gameType === 'car' ? 'Units left' : 'Seconds left'}
        />
      )}

      {progress && (
        <div className={classes.list_container}>
          {p.map((item, index) => (
            <div key={index} className={classes.list}>
              <div className={classes.count}>{item.count}</div>
              <div className={classes.title}>{item.title}</div>
            </div>
          ))}
        </div>
      )}

      {gameType === 'fish' && (
        <FishTypeDisplay
          currentFishType={currentFishType}
          fishTypes={fishTypes}
        />
      )}

      <div className={classes.instruction}>
        <h1>Instructions</h1>
        {renderInstructions()}
      </div>
    </div>
  );
}
