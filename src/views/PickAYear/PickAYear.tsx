import classes from './PickAYear.module.css';
import CustomButton from '../../components/Shared/CustomButton/CsutomButton';
import ElementWrapper from '../../components/Shared/ElementWrapper/ElementWrapper';
import { useAppDispatch } from '../../app/hooks';
import { setSelectedYear } from '../../features/control/controlSlice';
import { useNavigate } from 'react-router-dom';

export default function PickAYear() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  const handleClick = (year: number) => {
    const ready = true;

    if (ready) {
      dispatch(setSelectedYear(year));

      navigate('/assessment');
    }
  };

  return (
    <div className={classes.container}>
      <ElementWrapper title='PICK A YEAR' height={300}>
        <div className={classes.grid}>
          {list.map((_, index) => (
            <CustomButton
              key={index.toString()}
              onClick={() => {
                handleClick(index + 1);
              }}
            >
              {index + 1}
            </CustomButton>
          ))}
        </div>
      </ElementWrapper>
    </div>
  );
}
