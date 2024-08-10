import { useAppSelector } from '../../../app/hooks';
import classes from './UserDetail.module.css';

interface UserDetailProps {
  showLevel: boolean;
}

export default function UserDetail({ showLevel = true }: UserDetailProps) {
  const { selectedYear } = useAppSelector((state) => state.control);

  const user = {
    name: 'Daniel',
    grade: `Year ${selectedYear}`,
    school_name: 'St Dell School',
    level: 1,
  };

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
