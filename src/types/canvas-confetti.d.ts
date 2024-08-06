// src/types/canvas-confetti.d.ts
declare module 'canvas-confetti' {
    type Options = {
      particleCount?: number;
      angle?: number;
      spread?: number;
      origin?: {
        x?: number;
        y?: number;
      };
      colors?: string[];
      shapes?: ('square' | 'circle')[];
      scalar?: number;
      zIndex?: number;
      disableForReducedMotion?: boolean;
      drift?: number;
      ticks?: number;
    };
  
    const confetti: (options?: Options) => Promise<void>;
    export default confetti;
  }
  