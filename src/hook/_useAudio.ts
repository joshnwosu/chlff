// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { _soundManager as soundManager } from '../utils/_soundManager';

// export const _useAudio = () => {
//   const location = useLocation();
//   const [backgroundVolume, setBackgroundVolumeState] = useState(
//     soundManager.getBackgroundVolume()
//   );
//   const [effectsVolume, setEffectsVolumeState] = useState(
//     soundManager.getEffectsVolume()
//   );
//   const [isMuted, setIsMuted] = useState(soundManager.isMuted());

//   useEffect(() => {
//     const soundMap: { [key: string]: string } = {
//       '/action-center': 'home',
//       '/fishing': 'fishGame',
//       '/car-race': 'carGame',
//     };

//     const currentSound = soundMap[location.pathname];
//     if (currentSound) {
//       soundManager.play(currentSound);
//     } else {
//       soundManager.stopAll();
//     }

//     return () => {
//       soundManager.stopAll();
//     };
//   }, [location.pathname]);

//   const toggleSound = () => {
//     const newMuteState = soundManager.toggleSound();
//     setIsMuted(newMuteState);
//     if (!newMuteState) {
//       const soundMap: { [key: string]: string } = {
//         '/action-center': 'home',
//         '/fishing': 'fishGame',
//         '/car-race': 'carGame',
//       };
//       const currentSound = soundMap[location.pathname];
//       if (currentSound) {
//         soundManager.play(currentSound); // Resume background sound based on route
//       }
//     }
//   };

//   const updateBackgroundVolume = (newVolume: number) => {
//     soundManager.setBackgroundVolume(newVolume);
//     setBackgroundVolumeState(newVolume);
//   };

//   const updateEffectsVolume = (newVolume: number) => {
//     soundManager.setEffectsVolume(newVolume);
//     setEffectsVolumeState(newVolume);
//   };

//   return {
//     play: (key: string) => {
//       soundManager.play(key);
//     },
//     stop: (key: string) => soundManager.stop(key),
//     stopAll: () => soundManager.stopAll(),
//     toggleSound,
//     isMuted,
//     backgroundVolume,
//     effectsVolume,
//     setBackgroundVolume: updateBackgroundVolume,
//     setEffectsVolume: updateEffectsVolume,
//   };
// };

// src/hooks/useAudio.ts
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { _soundManager as soundManager } from '../utils/_soundManager';

export const _useAudio = () => {
  const location = useLocation();
  const [backgroundVolume, setBackgroundVolumeState] = useState(
    soundManager.getBackgroundVolume()
  );
  const [effectsVolume, setEffectsVolumeState] = useState(
    soundManager.getEffectsVolume()
  );
  const [isBackgroundMuted, setIsBackgroundMuted] = useState(
    soundManager.isBackgroundMuted()
  );
  const [isEffectsMuted, setIsEffectsMuted] = useState(
    soundManager.isEffectsMuted()
  );

  useEffect(() => {
    const soundMap: { [key: string]: string } = {
      '/action-center': 'home',
      '/fishing': 'fishGame',
      '/car-race': 'carGame',
    };

    const currentSound = soundMap[location.pathname];
    if (currentSound && !soundManager.isBackgroundMuted()) {
      soundManager.play(currentSound);
    } else if (soundManager.isBackgroundMuted()) {
      soundManager.stopAll();
    }

    return () => {
      soundManager.stopAll();
    };
  }, [location.pathname]);

  const toggleBackgroundSound = () => {
    const newMuteState = soundManager.toggleBackgroundSound();
    setIsBackgroundMuted(newMuteState);
    if (!newMuteState) {
      const soundMap: { [key: string]: string } = {
        '/action-center': 'home',
        '/fishing': 'fishGame',
        '/car-race': 'carGame',
      };
      const currentSound = soundMap[location.pathname];
      if (currentSound) {
        soundManager.play(currentSound);
      }
    }
  };

  const toggleEffectsSound = () => {
    const newMuteState = soundManager.toggleEffectsSound();
    setIsEffectsMuted(newMuteState);
  };

  const updateBackgroundVolume = (newVolume: number) => {
    soundManager.setBackgroundVolume(newVolume);
    setBackgroundVolumeState(newVolume);
  };

  const updateEffectsVolume = (newVolume: number) => {
    soundManager.setEffectsVolume(newVolume);
    setEffectsVolumeState(newVolume);
  };

  return {
    play: (key: string) => {
      soundManager.play(key);
    },
    stop: (key: string) => soundManager.stop(key),
    stopAll: () => soundManager.stopAll(),
    toggleBackgroundSound,
    toggleEffectsSound,
    isBackgroundMuted,
    isEffectsMuted,
    backgroundVolume,
    effectsVolume,
    setBackgroundVolume: updateBackgroundVolume,
    setEffectsVolume: updateEffectsVolume,
  };
};
