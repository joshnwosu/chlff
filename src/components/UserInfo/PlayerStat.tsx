import { useEffect } from 'react';
import classes from './UserInfo.module.css';
import ArrowUpIcon from '../../icons/ArrowUpIcon';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Progress from '../Shared/Progress/Progress';
import GasView from '../Shared/GasView/GasView';

const user = {
  name: 'Daniel',
  grade: 'Year 2',
  school_name: 'St Dell School',
  level: 1,
};

interface PlayerStatProps {
  score?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
}

export default function PlayerStat({
  correctAnswers,
  wrongAnswers,
}: PlayerStatProps) {
  const p = [
    { title: 'Correct answers', count: correctAnswers || 0 },
    { title: 'Wrong answers', count: wrongAnswers || 0 },
  ];

  const direction = [
    { title: 'up', icon: <ArrowUpIcon size={20} color='#ffffff' /> },
    { title: 'down', icon: <ArrowDownIcon size={20} color='#ffffff' /> },
  ];

  useEffect(() => {
    console.log('User: ', user);
  }, []);
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

      <Progress />

      <GasView />

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
