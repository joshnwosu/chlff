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
import { Character, Item } from '../../data/showroom/characters';
import UnlockedItemModal from '../Modals/UnlockedItemModal/UnlockedItemModal';
import { setSelectedLeaderBoard } from '../../features/control/controlSlice';

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
          items: user.items,
        })
      )
        .unwrap()
        .then((res) => {
          setUnlockedItems(res);
          console.log('I AM HERE');
        });
    }
  }, [user]);

  const handleViewAll = () => {
    setIsOpen(true);
    dispatch(setSelectedLeaderBoard(user));
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

              <UnlockedItemSlide items={unlockedItems} />
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

      <UnlockedItemModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

const UnlockedItemSlide = ({ items }: { items: Item[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, items.length - 3) : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= items.length - 3 ? 0 : prev + 1));
  };

  if (!items.length) {
    return (
      <p
        className={classes['menu-title']}
        style={{
          textAlign: 'center',
        }}
      >
        No Item
      </p>
    );
  }

  return (
    <div className={classes.sliderContainer}>
      <div className={classes.sliderWrapper}>
        <div className={classes.slider}>
          <div
            className={classes.slides}
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className={classes.slide}>
                <img
                  src={`${imagePath}/${item.image}`}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={prevSlide}
        className={`${classes.navButton} ${classes.prev}`}
        disabled={currentIndex === 0}
      >
        <svg
          clipRule='evenodd'
          fillRule='evenodd'
          strokeLinejoin='round'
          strokeMiterlimit='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z' />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className={`${classes.navButton} ${classes.next}`}
        disabled={currentIndex >= items.length - 3}
      >
        <svg
          clipRule='evenodd'
          fillRule='evenodd'
          strokeLinejoin='round'
          strokeMiterlimit='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z' />
        </svg>
      </button>
    </div>
  );
};
