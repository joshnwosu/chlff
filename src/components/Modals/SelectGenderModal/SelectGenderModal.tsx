import classes from './SelectGenderModal.module.css';
import Overlay from '../../Shared/Overlay/Overlay';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleSelectGenderModal } from '../../../features/control/controlSlice';
import CustomButton from '../../Shared/CustomButton/CsutomButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModalWrapper from '../../Shared/CustomModalWrapper/CustomModalWrapper';

interface GenderOption {
  gender: string;
  image: string;
  type: string;
  label: string;
}

export default function SelectGenderModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectGenderModal } = useAppSelector((state) => state.control);
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(
    null
  );

  const handleClose = () => {
    dispatch(toggleSelectGenderModal(false));
  };

  const genderOption: GenderOption[] = [
    {
      gender: 'girl',
      type: 'bb',
      label: 'black',
      image: '/assets/showroom/skin/bg.jpg',
    },
    {
      gender: 'boy',
      type: 'bg',
      label: 'black',
      image: '/assets/showroom/skin/bb.jpg',
    },
    {
      gender: 'boy',
      type: 'wb',
      label: 'white',
      image: '/assets/showroom/skin/wb.jpg',
    },
    {
      gender: 'girl',
      type: 'wg',
      label: 'white',
      image: '/assets/showroom/skin/wg.jpg',
    },
  ];

  const handleGenderSelect = (item: GenderOption) => {
    setSelectedGender(item);
    navigate('/show-room', {
      state: item,
    });
    console.log('Item: ', item);

    setTimeout(() => {
      handleClose();
    }, 2);
  };

  return (
    <Overlay opened={selectGenderModal}>
      <CustomModalWrapper>
        <div style={{ padding: 30 }}>
          <h1 className={classes.title}>Please select your AVATAR</h1>

          <div className={classes.genderOption}>
            {genderOption.map((item, index) => (
              <div
                key={index.toString()}
                className={`${classes.genderItem} ${
                  selectedGender?.gender === item.gender
                    ? classes.active
                    : undefined
                }`}
                onClick={() => handleGenderSelect(item)}
              >
                {/* <p className={classes.genderItemName}>{item.gender}</p> */}
                <img src={item.image} className={classes.genderItemImage} />
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <div>
              <CustomButton onClick={handleClose} color='red'>
                Close
              </CustomButton>
            </div>
          </div>
        </div>
      </CustomModalWrapper>
    </Overlay>
  );
}
