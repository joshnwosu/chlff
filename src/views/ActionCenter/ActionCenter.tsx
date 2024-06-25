import classes from './ActionCenter.module.css';
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard';
import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';
import { Link } from 'react-router-dom';

const options = [
  {
    name: 'MULTIPLICATION',
    color: 'rgba(70, 107, 163, 0.9)',
    img: '/assets/car_race1.jpeg',
    link: 'times-table',
  },
  {
    name: 'ADDITION',
    color: 'rgba(198, 81, 149, 0.9)',
    img: '/assets/phonics_image1.jpeg',
    link: 'addition',
  },
  {
    name: 'SUBTRACTION',
    color: 'rgba(17, 169, 182, 0.9)',
    img: '/assets/punctuation_image_for_children1.jpeg',
    link: 'subtraction',
  },
  {
    name: 'DIVISION',
    color: 'rgba(245, 178, 22, 0.9)',
    img: '/assets/spelling_image1.jpeg',
    link: 'division',
  },
];

const ActionCenter: React.FC = () => {
  return (
    <PageWrapper>
      <div className={classes.actionCenter}>
        <div className={classes.actionCenterLeft}>
          {false && <LeaderBoard />}
        </div>
        <div className={classes.actionCenterMiddle}>
          <div className={classes.actionCenterGameCardContainer}>
            {options.map((item, index) => (
              <Link to={`${item.link}/select-level`} key={index.toString()}>
                <div
                  className={classes.actionCenterGameCard}
                  // key={index.toString()}
                >
                  {item.img && (
                    <img
                      src={item.img}
                      className={classes.actionCenterGameCardImage}
                    />
                  )}
                  <div
                    className={classes.actionCenterGameCardOverlay}
                    style={{
                      backgroundImage: `linear-gradient(45deg, ${item.color} 35%, ${item.color} 35%, transparent)`,
                    }}
                  />
                  <div className={classes.actionCenterGameCardContent}>
                    <p>{item.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={classes.actionCenterRight}></div>
      </div>
    </PageWrapper>
  );
};

export default ActionCenter;
