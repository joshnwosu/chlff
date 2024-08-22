import { useAppSelector } from '../../../app/hooks';
import classes from './UserDetail.module.css';

interface UserDetailProps {
  level?: number;
  showLevel: boolean;
  mode?: 'dark' | 'light';
}

export default function UserDetail({
  level,
  showLevel = true,
  mode = 'light',
}: UserDetailProps) {
  const { selectedYear } = useAppSelector((state) => state.control);

  const user = {
    name: 'Daniel',
    grade: `Year ${selectedYear}`,
    school_name: 'St Dell School',
    level: level,
  };

  const color = mode === 'dark' ? '#000000' : '#ffffff';

  return (
    <div className={classes.container}>
      <div className={classes.user_section}>
        <div className={classes.user_image}></div>
        <div className={classes.user_info}>
          <p
            className={classes.user_name}
            style={{
              color,
            }}
          >
            {user.name}
          </p>
          <p
            className={classes.user_text}
            style={{
              color,
            }}
          >
            Grade: {user.grade}
          </p>
          <p
            className={classes.user_text}
            style={{
              color,
            }}
          >
            {user.school_name}
          </p>
        </div>
      </div>

      {showLevel && <p className={classes.user_level}>Level {user.level}</p>}
    </div>
  );
}
