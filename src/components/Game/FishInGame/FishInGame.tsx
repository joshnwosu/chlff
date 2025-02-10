// import PageWrapper from '../../Shared/PageWrapper/PageWrapper';
import { useState } from 'react';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';
import PlayerStat from '../../UserInfo/PlayerStat';
// import Fish, { FishTypeProps } from '../Fish/Fish';
import classes from './FishInGame.module.css';
import Fish2, { FishTypeProps } from '../Fish/Fish2';
import { Question } from '../../../data/data';
import FishQuestions from './FishQuestions';

export default function FishInGame() {
  const [fishTypes, setFishTypes] = useState<FishTypeProps[]>();
  const [currentFishType, setCurrentFishType] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  return (
    <div className={classes.gameWrapper}>
      <div className={classes.gameCenter}>
        <LeaderBoard />

        <div className={classes.gameCenterMiddle}>
          <div className={classes.screen}>
            <Fish2
              mode='in-game'
              onFishChange={(
                currentFishType,
                fishTypes,
                questions,
                currentQuestionIndex
              ) => {
                setCurrentFishType(currentFishType);
                setFishTypes(fishTypes);
                setQuestions(questions);
                setCurrentQuestionIndex(currentQuestionIndex);
              }}
            />
          </div>
        </div>

        <div className={classes.gameCenterRight}>
          <FishQuestions
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
          />
          <PlayerStat
            gameType='fish'
            fishTypes={fishTypes}
            currentFishType={currentFishType}
          />
        </div>
      </div>
    </div>
  );
}
