import classes from './Car.module.css';
import PageWrapper from '../../Shared/PageWrapper/PageWrapper';
import LeaderBoard from '../../LeaderBoard/LeaderBoard';

export default function Car() {
  return (
    <PageWrapper>
      <div className={classes.gameWrapper}>
        <div className={classes.title}>
          <h1>Multiplication</h1>
        </div>

        <div className={classes.gameCenter}>
          <div className={classes.gameCenterLeft}>
            <LeaderBoard />
          </div>
          <div className={classes.gameCenterMiddle}>
            <div className={classes.carContainer}>
              <div className={classes.road}>
                <div className={classes.lane}></div>
                <div className={classes.centerLine}></div>
                <div className={classes.lane}></div>
              </div>
            </div>
            <div className={classes.question}>
              <h1>5 x 4 = ?</h1>
            </div>
          </div>
          <div className={classes.gameCenterRight}></div>
        </div>
      </div>
    </PageWrapper>
  );
}
