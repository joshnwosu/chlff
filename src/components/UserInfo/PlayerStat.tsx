import classes from './UserInfo.module.css';
import ArrowUpIcon from '../../icons/ArrowUpIcon';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Progress from '../Shared/Progress/Progress';
import UserDetail from '../Shared/UserDetail/UserDetail';
import TimerView from '../Shared/TimerView/TimerView';
import { FishTypeProps } from '../Game/Fish/Fish';
import FishTypeDisplay from '../Game/Fish/FishTypeDisplay/FishTypeDisplay';

interface PlayerStatProps {
  timer?: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  totalStage?: number;
  stage?: number;
  level?: number;
  progress?: number;
  gameType?: 'fish' | 'car' | 'puzzle';
  fishTypes?: FishTypeProps[];
  currentFishType?: number;
  gameTitle?: string;
}

export default function PlayerStat({
  timer,
  correctAnswers = 0,
  wrongAnswers = 0,
  totalStage,
  stage,
  level,
  progress,
  gameType = 'car',
  currentFishType = 0,
  fishTypes = [],
  gameTitle,
}: PlayerStatProps) {
  const p = [
    { title: 'Correct answers', count: correctAnswers },
    { title: 'Wrong answers', count: wrongAnswers },
  ];

  const direction = [
    { title: 'up', icon: <ArrowUpIcon size={20} color='#ffffff' /> },
    { title: 'down', icon: <ArrowDownIcon size={20} color='#ffffff' /> },
  ];

  // Function to generate game-specific instructions
  const renderInstructions = () => {
    switch (gameType) {
      case 'car':
        return (
          <>
            <p>
              Drive through the correct answer using the arrow keys on your
              keyboard or by clicking on the lane.
            </p>
            <div className={classes.direction}>
              {direction.map((item, index) => (
                <div key={index} className={classes.directionWrap}>
                  <span className={classes.directionIcon}>{item.icon}</span>
                  <p className={classes.directionTitle}>{item.title}</p>
                </div>
              ))}
            </div>
          </>
        );

      case 'fish':
        return (
          <p>
            Swim to the correct answer by guiding the fish using your mouse or
            touch controls.
          </p>
        );

      case 'puzzle':
        return (
          <p>
            Solve the puzzle by dragging and dropping the correct piece into
            place.
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div className={classes.container}>
      {false && <UserDetail showLevel mode='light' level={level} />}

      {false && (
        <div style={{ marginTop: 10 }}>
          <p className={classes.user_level}>Level {level}</p>
        </div>
      )}

      {gameTitle ? (
        <div
          style={{
            textTransform: 'uppercase',
            fontSize: 17,
            fontFamily: 'Sigmar One',
            textAlign: 'center',
            padding: '20px 0',
            color: '#ffffff',
            // WebkitTextStroke: '1px #999',
            // backgroundColor: 'ActiveCaption',
            // marginBottom: 10,
          }}
        >
          {gameTitle}
        </div>
      ) : null}

      {progress != null ? (
        <Progress stage={stage} totalStage={totalStage} progress={progress} />
      ) : null}

      {timer ? (
        <TimerView
          title={gameType === 'car' ? 'Gas' : 'Time'}
          timer={timer}
          timerDescription={gameType === 'car' ? 'Units left' : 'Seconds left'}
        />
      ) : null}

      {progress != null ? (
        <div className={classes.list_container}>
          {p.map((item, index) => (
            <div key={index} className={classes.list}>
              <div className={classes.count}>{item.count}</div>
              <div className={classes.title}>{item.title}</div>
            </div>
          ))}
        </div>
      ) : null}

      {gameType === 'fish' && (
        <FishTypeDisplay
          currentFishType={currentFishType}
          fishTypes={fishTypes}
        />
      )}

      <div className={classes.instruction}>
        <h1>Instructions</h1>
        {renderInstructions()}
      </div>
    </div>
  );
}
