import PageWrapper from '../Shared/PageWrapper/PageWrapper';
import './ActionCenter.css';

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
      <div className='action-center'>
        <div className='action-center-left'></div>
        <div className='action-center-middle'>
          <div className='action-center-game-card-container'>
            {options.map((item, index) => (
              <div className='action-center-game-card' key={index.toString()}>
                {item.img && (
                  <img
                    src={item.img}
                    className='action-center-game-card-image'
                  />
                )}
                <div
                  className='action-center-game-card-overlay'
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${item.color} 35%, ${item.color} 35%, transparent)`,
                  }}
                />
                <div className='action-center-game-card-content'>
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='action-center-right'></div>
      </div>
    </PageWrapper>
  );
};

export default ActionCenter;
