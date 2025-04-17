import CustomModalWrapper from '../../Shared/CustomModalWrapper/CustomModalWrapper';
import Overlay from '../../Shared/Overlay/Overlay';
import UnlockedItems from '../../Shared/UnlockedItems/UnlockedItems';
import { useAppSelector } from '../../../app/hooks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function UnlockedItemModal({ isOpen, onClose }: Props) {
  const { selectedLeaderBoard } = useAppSelector((state) => state.control);

  return (
    <Overlay opened={isOpen} close={onClose}>
      <CustomModalWrapper title='Unlocked Items'>
        <UnlockedItems
          characterName={selectedLeaderBoard.character}
          items={selectedLeaderBoard.items}
        />
      </CustomModalWrapper>
    </Overlay>
  );
}
