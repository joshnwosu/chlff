// utils/soundManager.ts
import { store } from '../app/store';
import {
  registerGameSounds,
  setVolume,
  stopAllSounds,
  toggleSound,
  unregisterGameSounds,
} from '../features/sound/soundSlice';

type SoundConfig = {
  loop?: boolean;
  volume?: number;
};

class SoundManager {
  private sounds: Record<string, HTMLAudioElement> = {};

  initializeSounds(soundMap: Record<string, string>, gameName: string) {
    const gameSounds: Record<string, HTMLAudioElement> = {};

    Object.entries(soundMap).forEach(([name, src]) => {
      const sound = new Audio(src);
      sound.volume = store.getState().sound.volume;
      sound.muted = !store.getState().sound.isSoundEnabled;
      gameSounds[`${gameName}_${name}`] = sound;
    });

    this.sounds = { ...this.sounds, ...gameSounds };
    store.dispatch(registerGameSounds(gameSounds));
  }

  play(name: string, config: SoundConfig = {}) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.loop = config.loop || false;
      sound.volume = config.volume ?? store.getState().sound.volume;
      sound
        .play()
        .catch((error) => console.error('Error playing sound:', error));
    }
  }

  stop(name: string) {
    const sound = this.sounds[name];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  pause(name: string) {
    const sound = this.sounds[name];
    if (sound) {
      sound.pause();
    }
  }

  setGlobalVolume(volume: number) {
    store.dispatch(setVolume(volume));
  }

  toggleGlobalSound() {
    store.dispatch(toggleSound());
  }

  cleanup(gameName: string) {
    const gameSoundKeys = Object.keys(this.sounds).filter((key) =>
      key.startsWith(gameName)
    );

    // Stop all sounds before cleaning up
    gameSoundKeys.forEach((key) => {
      const sound = this.sounds[key];
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });

    store.dispatch(unregisterGameSounds(gameSoundKeys));
    gameSoundKeys.forEach((key) => delete this.sounds[key]);
  }

  // Add global stop method
  stopAllSounds() {
    Object.values(this.sounds).forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
    this.sounds = {};
    store.dispatch(stopAllSounds());
  }
}

export const soundManager = new SoundManager();
