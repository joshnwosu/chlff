import { useAppSelector } from '../../app/hooks';
import StartGame from '../../views/StartGame/StartGame';
// import SelectLevel from '../SelectLevel/SelectLevel';
// import StartGame from '../StartGame/StartGame';

const Root: React.FC = () => {
  const {} = useAppSelector((state) => state.control);

  return (
    <div className='root'>
      {/* Root component here */}
      {/* <StartGame /> */}
      {/* {false && <SelectLevel />} */}
      <StartGame />
    </div>
  );
};

export default Root;
