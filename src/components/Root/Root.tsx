import { useAppSelector } from '../../app/hooks';
import SelectLevel from '../SelectLevel/SelectLevel';

const Root: React.FC = () => {
  const {} = useAppSelector((state) => state.control);

  return (
    <div className='root'>
      {/* Root component here */}
      <SelectLevel />
    </div>
  );
};

export default Root;
