// hooks/useSound.ts
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { soundManager } from '../utils/soundManager';

type SoundConfig = {
  loop?: boolean;
  volume?: number;
};

export const useSound = (
  gameName: string,
  soundMap: Record<string, string>
) => {
  const { isSoundEnabled, volume } = useSelector(
    (state: RootState) => state.sound
  );

  useEffect(() => {
    soundManager.initializeSounds(soundMap, gameName);

    return () => {
      soundManager.cleanup(gameName);
    };
  }, [gameName]);

  return {
    play: (name: string, config?: SoundConfig) =>
      soundManager.play(`${gameName}_${name}`, config),
    stop: (name: string) => soundManager.stop(`${gameName}_${name}`),
    pause: (name: string) => soundManager.pause(`${gameName}_${name}`),
    isSoundEnabled,
    volume,
  };
};
