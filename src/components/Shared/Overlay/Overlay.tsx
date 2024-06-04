import CloseButton from '../CloseButton/CloseButton';
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
      {false && <CloseButton onClick={close} />}
      <div className={classes.main}>{children}</div>
    </div>
  );
};

export default Overlay;
