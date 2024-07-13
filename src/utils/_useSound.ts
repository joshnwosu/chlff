import { useEffect } from 'react';

interface UseSoundOptions {
  autoplay?: boolean;
  loop?: boolean;
}

const useSound = (
  soundUrl: string,
  options: UseSoundOptions = { autoplay: true, loop: true }
) => {
  useEffect(() => {
    const audio = new Audio(soundUrl);
    if (options.autoplay) {
      audio.play();
    }
    if (options.loop) {
      audio.loop = true;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [soundUrl, options.autoplay, options.loop]);
};

export default useSound;
