import classes from './UserInfo.module.css';
import { Link } from 'react-router-dom';
import ElementWrapper from '../Shared/ElementWrapper/ElementWrapper';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import {
  fetchUnlockedItems,
  selectItemsByCharacterName,
} from '../../features/characters/charactersSlice';
import CustomButton from '../Shared/CustomButton/CsutomButton';
import { calculateCombinedGameStats } from '../../utils/calculateGameStats';
import { Character } from '../../data/showroom/characters';
import UnlockedItemModal from '../Modals/UnlockedItemModal/UnlockedItemModal';

const imagePath = '/assets/showroom/avatar';

interface MenuProp {
  title: string;
  link?: string;
  action?: () => void;
}

export default function UserInfo() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [unlockedItems, setUnlockedItems] = useState<Character['items']>([]);

  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    if (user) {
      dispatch(
        fetchUnlockedItems({
          characterName: user.character,
          gender: user.gender,
          items: user.items,
        })
      )
        .unwrap()
        .then((res) => {
          console.log('Res RES: ', res);
          setUnlockedItems(res);
        });
    }
  }, [dispatch]);

  const handleViewAll = () => {
    setIsOpen(true);
  };

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

              <div className={classes.unlockedItemsContainer}>
                {unlockedItems.length ? (
                  <>
                    {unlockedItems.map((item, index) => (
                      <div
                        key={index.toString()}
                        className={classes.unlockedItem}
                      >
                        <img
                          key={index.toString()}
                          src={`${imagePath}/${item.image}`}
                          alt={item.name}
                          style={{
                            objectFit: 'cover',
                            width: 30,
                            height: 30,
                          }}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className={classes.noItem}>
                    <p className={classes.noItemText}>None Item</p>
                  </div>
                )}
              </div>
            </div>

            <div className={classes.viewAllItemsButton}>
              {unlockedItems.length > 0 && (
                <span>
                  <CustomButton size='small' onClick={handleViewAll}>
                    View all
                  </CustomButton>
                </span>
              )}
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

      <UnlockedItemModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={unlockedItems}
      />
    </>
  );
}
