import classes from './NotFound.module.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className={classes.container}>
      <h1>404 - Page Not Found</h1>
      <Link to='/'>Go back to Home</Link>
    </div>
  );
}
