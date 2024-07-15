import { useEffect } from 'react';
import classes from './UserInfo.module.css';
import Progress from '../Shared/Progress/Progress';

const user = {
  name: 'Daniel',
  grade: 'Year 2',
  school_name: 'St Dell School',
  level: 1,
};

const p = [
  { title: 'Hours spent weekly', count: 0 },
  { title: 'Contests won', count: 0 },
  { title: 'Correct answers', count: 0 },
];

export default function UserInfo() {
  useEffect(() => {
    // console.log('User: ', user);
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

      <div className={classes.list_container}>
        {p.map((item, index) => (
          <div key={index.toString()} className={classes.list}>
            <div className={classes.count}>{item.count}</div>
            <div className={classes.title}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
