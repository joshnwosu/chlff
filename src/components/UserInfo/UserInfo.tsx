import classes from './UserInfo.module.css';
import { Link } from 'react-router-dom';
import ElementWrapper from '../Shared/ElementWrapper/ElementWrapper';
import { useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { selectItemsByCharacterName } from '../../features/characters/charactersSlice';
import CustomButton from '../Shared/CustomButton/CsutomButton';
import { calculateCombinedGameStats } from '../../utils/calculateGameStats';

interface MenuProp {
  title: string;
  link?: string;
  action?: () => void;
}

export default function UserInfo() {
  const { user } = useAppSelector((state) => state.user);

  const handleSettingsClick = () => {
    console.log('Settings clicked!');
  };

  const menu: MenuProp[] = [
    { title: 'Showroom', link: '/show-room' },
    { title: 'settings', action: handleSettingsClick },
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
      // console.log('Selected Character Items:', selectedCharacterItems);
    } else {
      console.log('No character selected or user.character does not exist.');
    }
  }, [selectedCharacterItems]);

  if (!user) return <p>No user data available</p>;

  const stats = calculateCombinedGameStats(user!);

  return (
    <>
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
              <p>{stats?.totalTimePlayed || 0}</p>
            </div>
            <div className={classes.wrap}>
              <h1>Successful Missions</h1>
              <p>{stats.combinedMissionFraction}</p>
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
              {menu[0].link ? (
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
              ) : (
                <div onClick={menu[0].action} className={classes.link}>
                  {menu[0].title}
                </div>
              )}
            </div>

            <div className={classes.linkWrap}>
              <div
                onClick={menu[1].action}
                className={classes.link}
                role='button'
                tabIndex={0}
              >
                {menu[1].title}
              </div>
            </div>
          </div>
        </ElementWrapper>
      </div>
    </>
  );
}
