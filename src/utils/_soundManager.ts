// class SoundManager {
//   private sounds: { [key: string]: HTMLAudioElement } = {};
//   private muted: boolean = false;
//   private backgroundVolume: number = 0.5; // Volume for background sounds
//   private effectsVolume: number = 0.7; // Volume for effects (e.g., higher default)
//   private backgroundSounds: string[] = ['home', 'fishGame', 'carGame'];
//   private currentBackground: string | null = null;

//   constructor() {
//     const savedMuted = localStorage.getItem('muted');
//     const savedBackgroundVolume = localStorage.getItem('backgroundVolume');
//     const savedEffectsVolume = localStorage.getItem('effectsVolume');
//     this.muted = savedMuted ? savedMuted === 'true' : false;
//     this.backgroundVolume = savedBackgroundVolume
//       ? parseFloat(savedBackgroundVolume)
//       : 0.5;
//     this.effectsVolume = savedEffectsVolume
//       ? parseFloat(savedEffectsVolume)
//       : 0.7;

//     this.sounds = {
//       home: new Audio('/sound/startgame.mp3'),
//       fishGame: new Audio('/sound/background-for-fish.mp3'),
//       carGame: new Audio('/sound/carbackground.mp3'),
//       // Add more sounds as needed (e.g., 'correct', 'wrong')
//       correct: new Audio('/sound/correct.mp3'),
//       wrong: new Audio('/sound/wrong.mp3'),
//       eat: new Audio('/sound/eat.mp3'),
//       underWater: new Audio('/sound/underWater.mp3'),
//       driving: new Audio('/sound/driving-in-a-car.mp3'),
//       levelUp: new Audio('/sound/levelUp.mp3'),
//     };

//     Object.values(this.sounds).forEach((sound) => {
//       sound.muted = this.muted;
//       sound.volume = this.backgroundSounds.includes(
//         sound.src.split('/').pop()!.split('.')[0]
//       )
//         ? this.backgroundVolume
//         : this.effectsVolume; // Set initial volume based on type
//     });
//     this.backgroundSounds.forEach((key) => {
//       this.sounds[key].loop = true;
//     });
//   }

//   play(key: string) {
//     if (this.muted) return;
//     const sound = this.sounds[key];
//     if (!sound) return;

//     if (this.backgroundSounds.includes(key)) {
//       if (this.currentBackground && this.currentBackground !== key) {
//         this.stop(this.currentBackground);
//       }
//       this.currentBackground = key;
//       sound.volume = this.backgroundVolume;
//     } else {
//       sound.volume = this.effectsVolume; // Effects use separate volume
//     }
//     sound.currentTime = 0;
//     sound
//       .play()
//       .catch((error) => console.error(`Error playing ${key}:`, error));
//   }

//   stop(key: string) {
//     const sound = this.sounds[key];
//     if (sound) {
//       sound.pause();
//       sound.currentTime = 0;
//       if (key === this.currentBackground) {
//         this.currentBackground = null;
//       }
//     }
//   }

//   stopAll() {
//     Object.values(this.sounds).forEach((sound) => {
//       sound.pause();
//       sound.currentTime = 0;
//     });
//     this.currentBackground = null;
//   }

//   setBackgroundVolume(volume: number) {
//     this.backgroundVolume = Math.max(0, Math.min(1, volume));
//     this.backgroundSounds.forEach((key) => {
//       this.sounds[key].volume = this.backgroundVolume;
//     });
//     localStorage.setItem('backgroundVolume', this.backgroundVolume.toString());
//   }

//   setEffectsVolume(volume: number) {
//     this.effectsVolume = Math.max(0, Math.min(1, volume));
//     Object.keys(this.sounds).forEach((key) => {
//       if (!this.backgroundSounds.includes(key)) {
//         this.sounds[key].volume = this.effectsVolume;
//       }
//     });
//     localStorage.setItem('effectsVolume', this.effectsVolume.toString());
//   }

//   getBackgroundVolume() {
//     return this.backgroundVolume;
//   }

//   getEffectsVolume() {
//     return this.effectsVolume;
//   }

//   toggleSound() {
//     this.muted = !this.muted;
//     Object.values(this.sounds).forEach((sound) => {
//       sound.muted = this.muted;
//     });
//     if (this.muted) {
//       this.stopAll();
//     }
//     localStorage.setItem('muted', this.muted.toString());
//     return this.muted;
//   }

//   isMuted() {
//     return this.muted;
//   }

//   getCurrentBackground() {
//     return this.currentBackground;
//   }
// }

// export const _soundManager = new SoundManager();

// src/utils/soundManager.ts
class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private backgroundMuted: boolean = false; // Mute state for background
  private effectsMuted: boolean = false; // Mute state for effects
  private backgroundVolume: number = 0.5;
  private effectsVolume: number = 0.7;
  private backgroundSounds: string[] = ['home', 'fishGame', 'carGame'];
  private currentBackground: string | null = null;

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
      home: new Audio('/sound/startgame.mp3'),
      fishGame: new Audio('/sound/background-for-fish.mp3'),
      carGame: new Audio('/sound/carbackground.mp3'),
      correct: new Audio('/sound/correct.mp3'),
      wrong: new Audio('/sound/wrong.mp3'),
      eat: new Audio('/sound/eat.mp3'),
      underWater: new Audio('/sound/underWater.mp3'),
      driving: new Audio('/sound/driving-in-a-car.mp3'),
      levelUp: new Audio('/sound/levelUp.mp3'),
    };

    Object.values(this.sounds).forEach((sound) => {
      const isBackground = this.backgroundSounds.includes(
        sound.src.split('/').pop()!.split('.')[0]
      );
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

  play(key: string) {
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
