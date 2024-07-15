// src/hooks/useSound.js
import { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';

const useSound = (src: string, { autoplay = true, loop = true } = {}) => {
  const { isPlaying } = useAppSelector((state) => state.sound);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = loop;

    if (autoplay && isPlaying) {
      audio.play();
    }

    const handlePlayPause = () => {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    };

    handlePlayPause();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [src, autoplay, loop, isPlaying]);
};

export default useSound;
