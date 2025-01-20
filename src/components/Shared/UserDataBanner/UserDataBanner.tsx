import classes from './UserDataBanner.module.css';

export default function UserDataBanner() {
  return (
    <div className={classes.container}>
      <img
        src='/assets/elements/user_details_banner.png'
        style={{
          width: '542px',
          height: '110px',
        }}
      />
    </div>
  );
}
