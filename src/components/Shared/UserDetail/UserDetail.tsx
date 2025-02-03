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
  const { user } = useAppSelector((state) => state.user);

  const userObj = {
    name: user?.displayName || '',
    grade: `Year ${user?.year || selectedYear}`,
    school_name: '',
    level: user?.level || level,
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
            {userObj.name}
          </p>
          <p
            className={classes.user_text}
            style={{
              color,
            }}
          >
            Grade: {userObj.grade}
          </p>
          <p
            className={classes.user_text}
            style={{
              color,
            }}
          >
            {userObj.school_name}
          </p>
        </div>
      </div>

      {showLevel && <p className={classes.user_level}>Level {userObj.level}</p>}
    </div>
  );
}
