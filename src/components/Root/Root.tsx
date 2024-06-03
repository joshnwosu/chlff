import { useAppSelector } from '../../app/hooks';
import SelectLevel from '../SelectLevel/SelectLevel';
import StartGame from '../StartGame/StartGame';

const Root: React.FC = () => {
  const {} = useAppSelector((state) => state.control);

  return (
    <div className='root'>
      {/* Root component here */}
      <StartGame />
      {false && <SelectLevel />}
    </div>
  );
};

export default Root;
