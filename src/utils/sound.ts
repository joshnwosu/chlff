
class SoundPlayer {
  private static instance: SoundPlayer;
  private sounds: Map<string, HTMLAudioElement> = new Map();

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  // Singleton pattern to ensure only one instance
  public static getInstance(): SoundPlayer {
    if (!SoundPlayer.instance) {
      SoundPlayer.instance = new SoundPlayer();
    }
    return SoundPlayer.instance;
  }

  // Method to preload a sound
  public preloadSound(key: string, path: string, loop: boolean = false): void {
    if (!this.sounds.has(key)) {
      const sound = new Audio(path);
      sound.loop = loop;
      sound.load(); // Preload the sound
      this.sounds.set(key, sound);
    }
  }

  // Method to play a sound
  public playSound(key: string): void {
    const sound = this.sounds.get(key);
    if (sound) {
      sound.play().catch(error => {
        console.error(`Error playing sound [${key}]:`, error);
      });
    } else {
      console.warn(`Sound [${key}] not found. Make sure it is preloaded.`);
    }
  }

  // Method to stop a sound
  public stopSound(key: string): void {
    const sound = this.sounds.get(key);
    if (sound) {
      sound.pause();
      sound.currentTime = 0; // Reset to the beginning
    } else {
      console.warn(`Sound [${key}] not found. Cannot stop it.`);
    }
  }

  // Method to set the volume of a sound
  public setVolume(key: string, volume: number): void {
    const sound = this.sounds.get(key);
    if (sound) {
      sound.volume = volume;
    } else {
      console.warn(`Sound [${key}] not found. Cannot set volume.`);
    }
  }

  // Method to remove a sound from the cache (if no longer needed)
  public removeSound(key: string): void {
    if (this.sounds.has(key)) {
      this.sounds.delete(key);
    } else {
      console.warn(`Sound [${key}] not found. Cannot remove it.`);
    }
  }
}

// Export the singleton instance
export const soundPlayer = SoundPlayer.getInstance();