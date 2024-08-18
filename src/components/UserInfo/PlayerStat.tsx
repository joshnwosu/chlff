import classes from './UserInfo.module.css';
import ArrowUpIcon from '../../icons/ArrowUpIcon';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Progress from '../Shared/Progress/Progress';
import GasView from '../Shared/GasView/GasView';
import UserDetail from '../Shared/UserDetail/UserDetail';

interface PlayerStatProps {
  unit?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  totalStage?: number;
  stage?: number;
  level?: number;
  progress: number; // Array holding scores or progress for each stage
}

export default function PlayerStat({
  unit,
  correctAnswers,
  wrongAnswers,
  totalStage,
  stage,
  progress,
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
      <UserDetail showLevel mode='light' />

      <Progress stage={stage} totalStage={totalStage} progress={progress} />
      <GasView unit={unit} />

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
          Drive through the correct answer using the direction arrows on your
          keyboard.
        </p>

        <div className={classes.direction}>
          {direction.map((item, index) => (
            <div key={index.toString()} className={classes.directionWrap}>
              <span className={classes.directionIcon}>{item.icon}</span>
              <p className={classes.directionTitle}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
