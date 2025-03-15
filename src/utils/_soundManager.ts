import startgameMp3 from '/assets/sound/startgame.mp3';
import fishGameMp3 from '/assets/sound/background-for-fish.mp3';
import carGameMp3 from '/assets/sound/carbackground.mp3';
import correctMp3 from '/assets/sound/correct.mp3';
import wrongMp3 from '/assets/sound/wrong.mp3';
import eatMp3 from '/assets/sound/eat.mp3';
import underWaterMp3 from '/assets/sound/underWater.mp3';
import drivingMp3 from '/assets/sound/driving-in-a-car-6227.mp3';
import levelUpMp3 from '/assets/sound/levelUp.mp3';

class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private backgroundMuted: boolean = false; // Mute state for background
  private effectsMuted: boolean = false; // Mute state for effects
  private backgroundVolume: number = 0.5;
  private effectsVolume: number = 0.7;
  private backgroundSounds: string[] = ['home', 'fishGame', 'carGame'];
  private currentBackground: string | null = null;
  private loadedSounds: Set<string> = new Set(); // Track loaded sounds

  constructor() {
    const savedBackgroundMuted = localStorage.getItem('backgroundMuted');
    const savedEffectsMuted = localStorage.getItem('effectsMuted');
    const savedBackgroundVolume = localStorage.getItem('backgroundVolume');
    const savedEffectsVolume = localStorage.getItem('effectsVolume');
    this.backgroundMuted = savedBackgroundMuted
      ? savedBackgroundMuted === 'true'
      : false;
    this.effectsMuted = savedEffectsMuted
      ? savedEffectsMuted === 'true'
      : false;
    this.backgroundVolume = savedBackgroundVolume
      ? parseFloat(savedBackgroundVolume)
      : 0.5;
    this.effectsVolume = savedEffectsVolume
      ? parseFloat(savedEffectsVolume)
      : 0.7;

    this.sounds = {
      home: new Audio(startgameMp3),
      fishGame: new Audio(fishGameMp3),
      carGame: new Audio(carGameMp3),
      correct: new Audio(correctMp3),
      wrong: new Audio(wrongMp3),
      eat: new Audio(eatMp3),
      underWater: new Audio(underWaterMp3),
      driving: new Audio(drivingMp3),
      levelUp: new Audio(levelUpMp3),
    };

    // Preload audio and mark as loaded
    Object.entries(this.sounds).forEach(([key, sound]) => {
      sound.addEventListener(
        'canplay',
        () => {
          this.loadedSounds.add(key);
        },
        { once: true }
      );
      sound.addEventListener(
        'error',
        () => {
          console.error(`Failed to load audio ${key}: ${sound.src}`);
        },
        { once: true }
      );
      sound.preload = 'auto'; // Encourage preloading
      const isBackground = this.backgroundSounds.includes(key);
      sound.muted = isBackground ? this.backgroundMuted : this.effectsMuted;
      sound.volume = isBackground ? this.backgroundVolume : this.effectsVolume;
    });

    // Set looping for background sounds
    this.backgroundSounds.forEach((key) => {
      this.sounds[key].loop = true;
    });

    // Set looping specifically for underWater (effect sound)
    this.sounds.underWater.loop = true;
  }

  private getEffectSoundKeys(): string[] {
    return Object.keys(this.sounds).filter(
      (key) => !this.backgroundSounds.includes(key)
    );
  }

  async play(key: string): Promise<void> {
    const sound = this.sounds[key];
    if (!sound) return;

    const isBackground = this.backgroundSounds.includes(key);
    if (isBackground && this.backgroundMuted) return;
    if (!isBackground && this.effectsMuted) return;

    if (isBackground) {
      if (this.currentBackground && this.currentBackground !== key) {
        this.stop(this.currentBackground);
      }
      this.currentBackground = key;
      sound.volume = this.backgroundVolume;
    } else {
      sound.volume = this.effectsVolume;
    }

    // Wait for the sound to be ready if not loaded
    if (!this.loadedSounds.has(key)) {
      try {
        await new Promise<void>((resolve, reject) => {
          sound.addEventListener('canplay', () => resolve(), { once: true });
          sound.addEventListener(
            'error',
            () => reject(new Error(`Audio ${key} failed to load`)),
            { once: true }
          );
          sound.load(); // Force reload if needed
        });
        this.loadedSounds.add(key);
      } catch (error) {
        console.error(`Error preloading ${key}:`, error);
        return;
      }
    }

    sound.currentTime = 0;
    sound
      .play()
      .catch((error) => console.error(`Error playing ${key}:`, error));
  }

  stop(key: string) {
    const sound = this.sounds[key];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  stopAll() {
    Object.values(this.sounds).forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  setBackgroundVolume(volume: number) {
    this.backgroundVolume = Math.max(0, Math.min(1, volume));
    this.backgroundSounds.forEach((key) => {
      this.sounds[key].volume = this.backgroundVolume;
    });
    localStorage.setItem('backgroundVolume', this.backgroundVolume.toString());
  }

  setEffectsVolume(volume: number) {
    this.effectsVolume = Math.max(0, Math.min(1, volume));
    Object.keys(this.sounds).forEach((key) => {
      if (!this.backgroundSounds.includes(key)) {
        this.sounds[key].volume = this.effectsVolume;
      }
    });
    localStorage.setItem('effectsVolume', this.effectsVolume.toString());
  }

  getBackgroundVolume() {
    return this.backgroundVolume;
  }

  getEffectsVolume() {
    return this.effectsVolume;
  }

  toggleBackgroundSound() {
    this.backgroundMuted = !this.backgroundMuted;
    this.backgroundSounds.forEach((key) => {
      this.sounds[key].muted = this.backgroundMuted;
    });
    if (this.backgroundMuted) {
      this.stopAll(); // Stop all sounds, but currentBackground persists
    }
    localStorage.setItem('backgroundMuted', this.backgroundMuted.toString());
    return this.backgroundMuted;
  }

  toggleEffectsSound() {
    this.effectsMuted = !this.effectsMuted;
    this.getEffectSoundKeys().forEach((key) => {
      this.sounds[key].muted = this.effectsMuted;
    });
    localStorage.setItem('effectsMuted', this.effectsMuted.toString());
    return this.effectsMuted;
  }

  isBackgroundMuted() {
    return this.backgroundMuted;
  }

  isEffectsMuted() {
    return this.effectsMuted;
  }

  getCurrentBackground() {
    return this.currentBackground;
  }
}

export const _soundManager = new SoundManager();
