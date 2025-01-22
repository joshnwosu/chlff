import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleShowLeadeBoardInfoModal } from '../../../features/control/controlSlice';
import Overlay from '../../Shared/Overlay/Overlay';

export default function LeaderBoardInfoModal() {
  const dispatch = useAppDispatch();
  const { showLeaderBoardInfoModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    dispatch(toggleShowLeadeBoardInfoModal(false));
  };

  return (
    <Overlay opened={showLeaderBoardInfoModal} close={handleClose}>
      <div>Hello</div>
    </Overlay>
  );
}
