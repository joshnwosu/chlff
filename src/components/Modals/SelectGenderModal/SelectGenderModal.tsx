import classes from './SelectGenderModal.module.css';
import Overlay from '../../Shared/Overlay/Overlay';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleSelectGenderModal } from '../../../features/control/controlSlice';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { useState } from 'react';

interface GenderOption {
  name: string;
  image: string;
}

export default function SelectGenderModal() {
  const dispatch = useAppDispatch();
  const { selectGenderModal } = useAppSelector((state) => state.control);
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(
    null
  );

  const handleClose = () => {
    dispatch(toggleSelectGenderModal(false));
  };

  const genderOption: GenderOption[] = [
    { name: 'Girl', image: '/assets/avatar/female_avatar.png' },
    { name: 'Boy', image: '/assets/avatar/male_avatar.png' },
  ];

  return (
    <Overlay opened={selectGenderModal} close={handleClose}>
      <div className={classes.center}>
        <div className={classes.container}>
          <h1 className={classes.title}>
            Please fill in the true information.
          </h1>

          <div className={classes.genderOption}>
            {genderOption.map((item, index) => (
              <div
                key={index.toString()}
                className={`${classes.genderItem} ${
                  selectedGender?.name === item.name
                    ? classes.active
                    : undefined
                }`}
                onClick={() => setSelectedGender(item)}
              >
                <p className={classes.genderItemName}>{item.name}</p>
                <img src={item.image} className={classes.genderItemImage} />
              </div>
            ))}
          </div>

          <CustomButton>NEXT</CustomButton>
        </div>
      </div>
    </Overlay>
  );
}
