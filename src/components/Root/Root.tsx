import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const Root: React.FC = () => {
  const {} = useAppSelector((state) => state.control);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Root;
