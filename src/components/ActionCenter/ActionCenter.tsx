import PageWrapper from '../Shared/PageWrapper/PageWrapper';
import './ActionCenter.css';

const options = [
  { name: 'Times Table', color: '#466BA3' },
  { name: 'Phonics', color: '#C65195' },
  { name: 'Punctuations', color: '#11A9B6' },
  { name: 'Spellings', color: '#F5B216' },
];

const ActionCenter: React.FC = () => {
  return (
    <PageWrapper>
      <div className='action-center'>
        <div className='action-center-left'></div>
        <div className='action-center-middle'>
          <div className='action-center-game-card-container'>
            {options.map((item, index) => (
              <div
                className='action-center-game-card'
                key={index.toString()}
                style={{
                  //   backgroundColor: item.color,
                  backgroundImage: `linear-gradient(90deg, ${item.color}, transparent)`,
                }}
              >
                <p>{item.name}</p>
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
