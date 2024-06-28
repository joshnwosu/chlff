import classes from './Overlay.module.css';

interface OverlayProps {
  opened?: boolean;
  close?: () => void;
  children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ opened, close, children }) => {
  return (
    <div
      className={`${classes.wrapper} ${opened ? classes.show : classes.hide}`}
    >
      {true && (
        <button onClick={close} className={classes.closebtn}>
          x
        </button>
      )}
      <div className={classes.main}>{children}</div>
    </div>
  );
};

export default Overlay;
