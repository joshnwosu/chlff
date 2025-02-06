// src/context/useSoundControls.ts
import { useContext } from 'react';
import SoundContext from './soundContext';

// Custom hook to use the sound controls
export const useSoundControls = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundControls must be used within a SoundProvider');
  }
  return context;
};
