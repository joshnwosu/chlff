import classes from './PickAYear.module.css';
// import { useNavigate } from "react-router-dom";
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import ElementWrapper from '../../components/Shared/ElementWrapper/ElementWrapper';
import Overlay from '../../components/Shared/Overlay/Overlay';
// import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function PickAYear() {
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const { assessmentYearModal } = useAppSelector((state) => state.control);

  const handleClose = () => {
    // dispatch(toggleAssessmentYearModal(!assessmentYearModal));
  };

  const list = [
    {
      name: 'Year 1',
      tags: ['multiplication', 'addition', 'substration'],
      color: '#EF97AF',
      image: '/assets/Dictionary-pana.png',
    },
    {
      name: 'Year 2',
      tags: ['multiplication', 'addition', 'substration', 'division'],
      color: '#D395E8',
      image: '/assets/Dictionary-bro.png',
    },
    {
      name: 'Year 3',
      tags: ['multiplication', 'addition', 'substration'],
      color: '#61BF88',
      image: '/assets/Audiobook-bro.png',
    },
    {
      name: 'Year 4',
      tags: ['multiplication', 'addition', 'substration', 'division'],
      color: '#31B2EE',
      image: '/assets/kids wearing masks at school-bro.png',
    },
    {
      name: 'Year 5',
      tags: ['multiplication', 'addition', 'substration'],
      color: '#EEBC51',
      image: '/assets/Raising hand-pana.png',
    },
    {
      name: 'Year 6',
      tags: ['multiplication', 'addition', 'substration', 'division'],
      color: '#EA7EB4',
      image: '/assets/Mathematics-bro.png',
    },
  ];

  return (
    <Overlay opened={true} close={handleClose}>
      <div className={classes.container}>
        <ElementWrapper title='PICK A YEAR' height={300}>
          <div className={classes.grid}>
            {list.map((item, index) => (
              <CustomButton
                key={index.toString()}
                onClick={() => console.log('ITEM: ', item)}
                // className={classes.btn}
              >
                {index + 1}
              </CustomButton>
            ))}
          </div>
        </ElementWrapper>
      </div>
    </Overlay>
  );
}
