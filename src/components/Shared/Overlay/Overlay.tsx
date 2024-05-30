import CloseButton from '../CloseButton/CloseButton';
import './Overlay.css';

interface OverlayProps {
  opened?: boolean;
  close?: () => void;
  children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ opened, close, children }) => {
  return (
    <div className={`overlay ${opened ? 'show' : 'hide'}`}>
      <CloseButton onClick={close} />
      <div className='main'>{children}</div>
    </div>
  );
};

export default Overlay;
