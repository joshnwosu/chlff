import classes from './UserDataBanner.module.css';

export default function UserDataBanner() {
  return (
    <div className={classes.container}>
      <div className={classes.frame}>
        <img
          src='/assets/elements/user_details_banner.png'
          className={classes.frameImage}
        />
        <div className={classes.frameFlex}>
          <div className={classes.frameLeft}></div>
          <div className={classes.frameMiddle}></div>
          <div className={classes.frameRight}></div>
        </div>
      </div>
    </div>
  );
}
