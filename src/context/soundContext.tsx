// src/context/SoundContext.ts
import { createContext, ReactNode } from 'react';
import { useSound } from '../hook/useSound';

// Define the type for the sound controls returned by useSound
type SoundControls = {
  play: (name: string, config?: { loop?: boolean; volume?: number }) => void;
  stop: (name: string) => void;
  pause: (name: string) => void;
  isSoundEnabled: boolean;
  volume: number;
};

// Create a context with a default value of `null`
const SoundContext = createContext<SoundControls | null>(null);

// Define the props for SoundProvider
type SoundProviderProps = {
  children: ReactNode;
};

// Create the SoundProvider component
export const SoundProvider = ({ children }: SoundProviderProps) => {
  const gameName = 'myGame';
  const soundMap = {
    backgroundMusic: '/sound/startgame.mp3',
    backgroundFish: '/sound/background-for-fish.mp3',
    carBackground: '/sound/carbackground.mp3',
    correct: '/sound/correct.mp3',
    wrong: '/sound/wrong.mp3',
    eat: '/sound/eat.mp3',
    underWater: '/sound/underWater.mp3',
    driving: '/sound/driving-in-a-car.mp3',
    levelUp: '/sound/levelUp.mp3',
  };

  // Use the useSound hook to get sound controls
  const soundControls = useSound(gameName, soundMap);

  return (
    <SoundContext.Provider value={soundControls}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContext;
