import { useEffect } from 'react';
import classes from './UserInfo.module.css';

const user = {
  name: 'Daniel',
  grade: 'Year 2',
  school_name: 'St Dell School',
  level: 1,
};

const p = [
  { title: 'Hours spent weekly', count: 4 },
  { title: 'Contests won', count: 15 },
  { title: 'Correct answers', count: 302 },
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
