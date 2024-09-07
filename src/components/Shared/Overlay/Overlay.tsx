import classes from './Overlay.module.css';
import { motion } from 'framer-motion';

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
    <>
      {opened && (
        <div
          className={`${classes.wrapper}`}
          style={{
            backgroundColor: color || '',
          }}
        >
          {true && (
            <button onClick={close} className={classes.closebtn}>
              x
            </button>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            //
            // initial={{ opacity: 0, y: '100%' }}
            // animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: '100%' }}

            // initial={{ opacity: 0, rotateY: 90 }}
            // animate={{ opacity: 1, rotateY: 0 }}
            // exit={{ opacity: 0, rotateY: 90 }}
            //
            transition={{ duration: 0.3 }}
            className={classes.main}
          >
            {children}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Overlay;
