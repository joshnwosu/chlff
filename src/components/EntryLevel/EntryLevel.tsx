import CustomButton from '../Shared/CustomButton/CsutomButton';
import './EntryLevel.css';

const EntryLevel: React.FC = () => {
  return (
    <div className='container'>
      <h1>Year 2 Assessment Question</h1>

      <div className='layout'>
        {/* <div className='flex'> */}
        <div className='screen'>
          <div className='animation'>
            <div className='question'>
              <p>Hello world?</p>
            </div>
          </div>
          <div className='options'>
            <CustomButton>Option 1</CustomButton>
            <CustomButton>Option 2</CustomButton>
            <CustomButton>Option 3</CustomButton>
            <CustomButton>Option 4</CustomButton>
          </div>
        </div>
        {/* </div> */}
        <div className='screen-info'></div>
      </div>
    </div>
  );
};

export default EntryLevel;
