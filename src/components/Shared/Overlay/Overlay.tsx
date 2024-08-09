import classes from './Overlay.module.css';

interface OverlayProps {
  opened?: boolean;
  close?: () => void;
  children: React.ReactNode;
  color?: string;
}

const Overlay: React.FC<OverlayProps> = ({
  opened,
  close,
  children,
  color,
}) => {
  return (
    <div
      className={`${classes.wrapper} ${opened ? classes.show : classes.hide}`}
      style={{
        backgroundColor: color || '',
      }}
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
