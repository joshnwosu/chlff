import React from 'react';
import './Modal.css'; // Optional: Add your own styling for the modal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onNextLevel: () => void;
  message: string;
}

const LevelModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  onNextLevel,
  message,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); // Close modal if backdrop is clicked (optional)
    }
  };

  return (
    <div className='modal-background' onClick={handleBackdropClick}>
      <div className='modal-content'>
        <h2>{message}</h2>
        <div className='modal-actions'>
          <button onClick={onRetry}>Retry</button>
          <button onClick={onNextLevel}>Next Level</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LevelModal;
