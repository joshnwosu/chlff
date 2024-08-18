import classes from './UserInfo.module.css';
import Progress from '../Shared/Progress/Progress';
import { Link } from 'react-router-dom';
import UserDetail from '../Shared/UserDetail/UserDetail';

const p = [
  { title: 'Hours spent weekly', count: 0 },
  { title: 'Contests won', count: 0 },
  { title: 'Correct answers', count: 0 },
];

const menu = [
  { title: 'Showroom', link: '/show-room' },
  { title: 'Player settings', link: '/settings' },
];

export default function UserInfo() {
  return (
    <div className={classes.container}>
      <UserDetail showLevel={false} />

      {false && <Progress />}

      <div className={classes.list_container}>
        {p.map((item, index) => (
          <div key={index.toString()} className={classes.list}>
            <div className={classes.count}>{item.count}</div>
            <div className={classes.title}>{item.title}</div>
          </div>
        ))}
      </div>

      <div className={classes.menu}>
        <h1 className={classes['menu-title']}>Menu</h1>

        <div className={classes['menu-list']}>
          {menu.map((item, index) => (
            <div key={index.toString()} className={classes['menu-item']}>
              <Link to={item.link} className={classes['menu-link']}>
                <p>{item.title}</p>
                <p>{'>'}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
