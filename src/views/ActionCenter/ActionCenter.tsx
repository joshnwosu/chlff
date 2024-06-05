import classes from './ActionCenter.module.css';
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard';
import PageWrapper from '../../components/Shared/PageWrapper/PageWrapper';

const options = [
  {
    name: 'Times Table',
    color: 'rgba(70, 107, 163, 0.9)',
    img: '/assets/car_race1.jpeg',
  },
  {
    name: 'Phonics',
    color: 'rgba(198, 81, 149, 0.9)',
    img: '/assets/phonics_image1.jpeg',
  },
  {
    name: 'Punctuations',
    color: 'rgba(17, 169, 182, 0.9)',
    img: '/assets/punctuation_image_for_children1.jpeg',
  },
  {
    name: 'Spellings',
    color: 'rgba(245, 178, 22, 0.9)',
    img: '/assets/spelling_image1.jpeg',
  },
];

const ActionCenter: React.FC = () => {
  return (
    <PageWrapper>
      <div className={classes.actionCenter}>
        <div className={classes.actionCenterLeft}>
          <LeaderBoard />
        </div>
        <div className={classes.actionCenterMiddle}>
          <div className={classes.actionCenterGameCardContainer}>
            {options.map((item, index) => (
              <div
                className={classes.actionCenterGameCard}
                key={index.toString()}
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
            ))}
          </div>
        </div>
        <div className={classes.actionCenterRight}></div>
      </div>
    </PageWrapper>
  );
};

export default ActionCenter;
