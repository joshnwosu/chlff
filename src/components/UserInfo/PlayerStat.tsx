import { useEffect } from 'react';
import classes from './UserInfo.module.css';
import ArrowUpIcon from '../../icons/ArrowUpIcon';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Progress from '../Shared/Progress/Progress';
import GasView from '../Shared/GasView/GasView';
import { useAppSelector } from '../../app/hooks';

interface PlayerStatProps {
  unit?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  stage?: number;
  level?: number;
  progress: number; // Array holding scores or progress for each stage
}

export default function PlayerStat({
  unit,
  correctAnswers,
  wrongAnswers,
  stage,
  level,
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

  const { selectedYear } = useAppSelector((state) => state.control);

  const user = {
    name: 'Daniel',
    grade: `Year ${selectedYear}`,
    school_name: 'St Dell School',
    level: level,
  };

  useEffect(() => {
    console.log('level: ', selectedYear);
  }, [selectedYear]);

  // Calculate overall progress percentage
  // const calculateOverallProgress = () => {
  //   const totalStages = scoresPerStage.length;
  //   let totalProgress = 0;

  //   scoresPerStage.forEach((correctAnswers) => {
  //     const stageProgress = (correctAnswers / 10) * 100;
  //     // The progress of each stage, weighted by its index
  //     totalProgress += (stageProgress / 100) * (100 / totalStages);
  //   });

  //   console.log('Hi');

  //   return totalProgress;
  // };

  // const overallProgress = calculateOverallProgress();

  return (
    <div className={classes.container}>
      <div className={classes.user_section}>
        <div className={classes.user_image}></div>
        <div className={classes.user_info}>
          <p className={classes.user_name}>{user.name}</p>
          <p className={classes.user_text}>Grade: {user.grade}</p>
          <p className={classes.user_text}>{user.school_name}</p>
        </div>
      </div>
      <p className={classes.user_level}>Level {user.level}</p>

      <Progress stage={stage} progress={progress} />
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
