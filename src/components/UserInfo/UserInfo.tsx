import classes from './UserInfo.module.css';
import Progress from '../Shared/Progress/Progress';
import { Link } from 'react-router-dom';
import UserDetail from '../Shared/UserDetail/UserDetail';
import ElementWrapper from '../Shared/ElementWrapper/ElementWrapper';
import { useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { selectItemsByCharacterName } from '../../features/characters/charactersSlice';
import CustomButton from '../Shared/CustomButton/CsutomButton';
// import { useEffect } from 'react';

export default function UserInfo() {
  const { user } = useAppSelector((state) => state.user);

  const p = [
    { title: 'Hours spent weekly', count: 0 },
    { title: 'Contests won', count: 0 },
    { title: 'Correct answers', count: 0 },
  ];

  const menu = [
    { title: 'Showroom', link: '/show-room' },
    { title: 'settings', link: '/player-settings' },
  ];

  function getPrefix(gender: string, skin: string) {
    return gender === 'boy'
      ? skin === 'black'
        ? 'bb'
        : 'wb'
      : gender === 'girl'
      ? skin === 'black'
        ? 'bg'
        : 'wg'
      : undefined; // Default value
  }

  // Conditionally call the selector only if user.character exists
  const selectedCharacterItems = useAppSelector((state) =>
    user?.character ? selectItemsByCharacterName(state, user.character) : null
  );

  useEffect(() => {
    if (selectedCharacterItems) {
      console.log('Selected Character Items:', selectedCharacterItems);
    } else {
      console.log('No character selected or user.character does not exist.');
    }
  }, [selectedCharacterItems]);

  return (
    <>
      {false && (
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
      )}

      <div className={classes.infoContainer}>
        {/* <div className={classes.infoProgress}></div> */}
        <ElementWrapper
          // title='Progress'
          width={300}
          height={300}
          padding={30}
          backgroundImage='/assets/elements/assessment_game_guide-2-alt.png'
        >
          <div className={classes.wrapContainer}>
            <div className={classes.wrap}>
              <h1>Total Time Played</h1>
              <p>{user?.totalTimePlayed || '--:--'}</p>
            </div>
            <div className={classes.wrap}>
              <h1>Successful Missions</h1>
              <p>{user?.totalSuccessfulMissions || 0}</p>
            </div>
            <div className={classes.unlockItems}>
              <p className={classes.unlockItemsTitle}>Unlocked Items</p>
              <div className={classes.unlockItemsContent}>
                <p className={classes.noItem}>None</p>
              </div>
            </div>

            <div className={classes.viewAllItemsButton}>
              <div>
                <CustomButton size='small'>View all</CustomButton>
              </div>
            </div>
          </div>
        </ElementWrapper>

        <div style={{ height: 20 }} />
        <ElementWrapper
          width={300}
          height={150}
          padding={0}
          backgroundImage='/assets/elements/assessment_game_guide-2-alt.png'
        >
          <div className={classes.infoLinks}>
            <div className={classes.linkWrap}>
              <Link
                to={menu[0].link}
                state={{
                  gender: user?.gender || 'boy',
                  type: user ? getPrefix(user?.gender, user?.skin) : 'bb',
                  label: user?.skin || 'black',
                  characterName: user?.character || 'Police',
                }}
                className={classes.link}
              >
                {menu[0].title}
              </Link>
            </div>

            <div className={classes.linkWrap}>
              <Link to={menu[1].link} className={classes.link}>
                {menu[1].title}
              </Link>
            </div>
          </div>
        </ElementWrapper>
      </div>
    </>
  );
}
