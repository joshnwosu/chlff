import classes from './UserInfo.module.css';
import ArrowUpIcon from '../../icons/ArrowUpIcon';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Progress from '../Shared/Progress/Progress';
import UserDetail from '../Shared/UserDetail/UserDetail';
import TimerView from '../Shared/TimerView/TimerView';

interface PlayerStatProps {
  timer?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  totalStage?: number;
  stage?: number;
  level: number;
  progress: number; // Array holding scores or progress for each stage
  gameType?: 'fish' | 'car' | 'puzzle';
}

export default function PlayerStat({
  timer,
  correctAnswers,
  wrongAnswers,
  totalStage,
  stage,
  level,
  progress,
  gameType = 'car',
}: PlayerStatProps) {
  const p = [
    { title: 'Correct answers', count: correctAnswers || 0 },
    { title: 'Wrong answers', count: wrongAnswers || 0 },
  ];

  const direction = [
    { title: 'up', icon: <ArrowUpIcon size={20} color='#ffffff' /> },
    { title: 'down', icon: <ArrowDownIcon size={20} color='#ffffff' /> },
  ];

  return (
    <div className={classes.container}>
      <UserDetail showLevel mode='light' level={level} />

      <Progress stage={stage} totalStage={totalStage} progress={progress} />
      <TimerView
        title={gameType === 'car' ? 'Gas' : 'Time'}
        timer={timer}
        timerDescription={gameType === 'car' ? 'Unit left' : 'Seconds left'}
      />

      <div className={classes.list_container}>
        {p.map((item, index) => (
          <div key={index.toString()} className={classes.list}>
            <div className={classes.count}>{item.count}</div>
            <div className={classes.title}>{item.title}</div>
          </div>
        ))}
      </div>

      <div className={classes.instruction}>
        <h1>Instructions</h1>
        <p>
          {gameType === 'car'
            ? `Drive through the correct answer using the arrow keys on your keyboard
          or by clicking on the lane.`
            : `Swim to the correct answer by guiding the fish using your mouse pad.`}
        </p>

        {gameType === 'car' && (
          <div className={classes.direction}>
            {direction.map((item, index) => (
              <div key={index.toString()} className={classes.directionWrap}>
                <span className={classes.directionIcon}>{item.icon}</span>
                <p className={classes.directionTitle}>{item.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
