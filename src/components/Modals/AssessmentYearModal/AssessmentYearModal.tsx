import classes from './AssessmentYearModal.module.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setSelectedYear,
  toggleAssessmentYearModal,
} from '../../../features/control/controlSlice';
import Overlay from '../../Shared/Overlay/Overlay';
import { useNavigate } from 'react-router-dom';

export default function AssessmentYearModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { assessmentYearModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleAssessmentYearModal(!assessmentYearModal));
  };

  const list = [
    {
      name: 'Year 1',
      tags: ['multiplication', 'addition', 'substration'],
      color: '#EF97AF',
      image: '/assets/Dictionary-pana.png',
    },
    {
      name: 'Year 2',
      tags: ['multiplication', 'addition', 'substration', 'division'],
      color: '#D395E8',
      image: '/assets/Dictionary-bro.png',
    },
    {
      name: 'Year 3',
      tags: ['multiplication', 'addition', 'substration'],
      color: '#61BF88',
      image: '/assets/Audiobook-bro.png',
    },
    {
      name: 'Year 4',
      tags: ['multiplication', 'addition', 'substration', 'division'],
      color: '#31B2EE',
      image: '/assets/kids wearing masks at school-bro.png',
    },
    {
      name: 'Year 5',
      tags: ['multiplication', 'addition', 'substration'],
      color: '#EEBC51',
      image: '/assets/Raising hand-pana.png',
    },
    {
      name: 'Year 6',
      tags: ['multiplication', 'addition', 'substration', 'division'],
      color: '#EA7EB4',
      image: '/assets/Mathematics-bro.png',
    },
  ];

  const handleClick = (year: number) => {
    // dispatch(toggleStartGame(false));
    dispatch(setSelectedYear(year));
    handleClose();
    navigate('/assessment');
    // console.log('year: ', year);
  };

  return (
    <Overlay opened={assessmentYearModal} close={handleClose}>
      <div className={classes.container}>
        <div className={classes.selectContainer}>
          <div className={classes.selectHeader}>
            <p className={classes.selectHeaderTitle}>
              Pick Your Assessment Year!
            </p>
          </div>
          <div className={classes.selectContent}>
            <div className={classes.selectScroll}>
              {list.map((item, index) => (
                <div
                  key={index.toString()}
                  className={classes.card}
                  style={{ backgroundColor: item.color || '#ffffff' }}
                >
                  <div className={classes.cardContent}>
                    <div className={classes.imageContainer}>
                      <img
                        src={item.image || '/assets/Dictionary-pana.png'}
                        style={{ width: 120, zIndex: 1 }}
                      />
                      <div className={classes.transparentBG} />
                    </div>
                    <p className={classes.cardTitle}>{item.name}</p>
                    <p className={classes.cardDescription}>
                      Track your progress through each level and see how you
                      improve over time. Earn badges and rewards for your
                      achievements!
                    </p>
                  </div>

                  <button
                    className={classes.button}
                    onClick={() => handleClick(index + 1)}
                  >
                    Start Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
