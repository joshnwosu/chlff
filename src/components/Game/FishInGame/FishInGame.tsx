// import PageWrapper from '../../Shared/PageWrapper/PageWrapper';
import { useState } from 'react';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';
import PlayerStat from '../../UserInfo/PlayerStat';
import Fish, { FishTypeProps } from '../Fish/Fish';
import classes from './FishInGame.module.css';

export default function FishInGame() {
  const [fishTypes, setFishTypes] = useState<FishTypeProps[]>();
  const [currentFishType, setCurrentFishType] = useState<number>(0);

  return (
    <div className={classes.gameWrapper}>
      <div className={classes.gameCenter}>
        {/* <div className={classes.gameCenterLeft}> */}
        <LeaderBoard />
        {/* </div> */}

        <div className={classes.gameCenterMiddle}>
          {/* <div className={classes.container}> */}
          <div className={classes.screen}>
            <Fish
              mode='in-game'
              onFishChange={(currentFishType, fishTypes) => {
                setCurrentFishType(currentFishType);
                setFishTypes(fishTypes);
              }}
            />
          </div>
          {/* </div> */}
        </div>

        <div className={classes.gameCenterRight}>
          <PlayerStat
            level={1}
            gameType='fish'
            fishTypes={fishTypes}
            currentFishType={currentFishType}
          />
        </div>
      </div>
    </div>
  );
}
