import { useEffect } from 'react';
import classes from './UserInfo.module.css';

const user = {
  user: 'Daniel',
  grade: 'Year 2',
  school_name: 'Dell',
  level: 5,
};

export default function UserInfo() {
  useEffect(() => {
    console.log('User: ', user);
  }, []);
  return <div className={classes.container}>No User Data</div>;
}
