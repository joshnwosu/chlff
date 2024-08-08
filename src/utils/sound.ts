class SoundPlayer {
    private underWaterSound: HTMLAudioElement;
  
    constructor() {
      // Initialize audio elements
      this.underWaterSound = new Audio('sound/underWater.wav');
      this.underWaterSound.loop = true; // Loop the sound if needed
    }
  
    playUnderWaterSound() {
      this.underWaterSound.play();
    }
  
    stopUnderWaterSound() {
      this.underWaterSound.pause();
      this.underWaterSound.currentTime = 0; // Reset to the beginning
    }
  
    // Add more sound functions as needed
    // playAnotherSound() {
    //   const sound = new Audio('sound/anotherSound.wav');
    //   sound.play();
    // }
  }
  
  // Export an instance of SoundPlayer
  export const soundPlayer = new SoundPlayer();