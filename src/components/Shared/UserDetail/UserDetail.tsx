import classes from './UserDetail.module.css';

interface UserDetailProps {
  showLevel: boolean;
}

const user = {
  name: 'Daniel',
  grade: 'Year 1',
  school_name: 'St Dell School',
  level: 1,
};

export default function UserDetail({ showLevel = true }: UserDetailProps) {
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

      {showLevel && <p className={classes.user_level}>Level {user.level}</p>}
    </div>
  );
}
