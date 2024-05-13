import CustomButton from '../Shared/CustomButton/CsutomButton';
import './EntryLevel.css';

const EntryLevel: React.FC = () => {
  return (
    <div className='layout'>
      <div className='screen'>
        <div className='animation'>
          <div className='question'></div>
        </div>
        <div className='options'>
          <CustomButton>Option 1</CustomButton>
          <CustomButton>Option 2</CustomButton>
          <CustomButton>Option 3</CustomButton>
          <CustomButton>Option 4</CustomButton>
        </div>
      </div>
      <div className='screen-info'></div>
    </div>
  );
};

export default EntryLevel;
