import classes from './PickAYear.module.css';
import ElementWrapper from '../../components/Shared/ElementWrapper/ElementWrapper';
import { useAppDispatch } from '../../app/hooks';
import { setSelectedYear } from '../../features/control/controlSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { soundPlayer } from '../../utils/sound';

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

  useEffect(() => {
    // soundPlayer.playSound('startgame');

    soundPlayer.stopSound('underwater');
    soundPlayer.stopSound('backgroundfish');
    soundPlayer.stopSound('carbackground');
    soundPlayer.stopSound('driving');
  }, [navigate]);

  return (
    <div className={classes.container}>
      <ElementWrapper
        // title='PICK A YEAR'
        height={300}
        backgroundImage='/assets/elements/pick_a_year-board.png'
      >
        <div className={classes.grid}>
          {list.map((_, index) => (
            <>
              <button
                onClick={() => {
                  handleClick(index + 1);
                }}
              >
                <img src={`/assets/elements/pick_a_year-${index + 1}.png`} />
              </button>
            </>
          ))}
        </div>
      </ElementWrapper>
    </div>
  );
}
