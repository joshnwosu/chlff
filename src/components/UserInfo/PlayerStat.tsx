import { useEffect } from 'react';
import classes from './UserInfo.module.css';

const user = {
  name: 'Daniel',
  grade: 'Year 2',
  school_name: 'St Dell School',
  level: 1,
};

export default function PlayerStat({ score }: { score?: number }) {
  const p = [
    { title: 'Gas Points Earned', count: score },
    { title: 'Correct answres', count: 0 },
    { title: 'Wrong answers', count: 0 },
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
      </div>
    </div>
  );
}
