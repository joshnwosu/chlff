import React from "react";
import styles from "./GameArea.module.css";
import sky from "/assets/sky/sky.png";
// import clouds from "/assets/sky/movingSky.gif";
import road from "/assets/road/road4.png";
import Road from "./Road";
import destination from "/assets/surrounding/tower2.png";
import Car from "./Car";
import Scenery from "./Scenery";
import tree from "/assets/surrounding/tree4.png";
import LoadingScreen from "./Loading";

interface GameAreaProps {
  carPosition?: number;
  sky?: string;
  questionText?: string;
  carRotation?: number;
  options?: number[];
  handleAnswer?: (selectedAnswer: number) => void;
  leftAnimationClass?: string;
  rightAnimationClass?: string;
  isGameActive?: boolean;
  imageScale?: number;  
  level?: number;
}

const GameArea: React.FC<GameAreaProps> = ({
  carPosition,
  carRotation,
  options = [],
  handleAnswer,
  leftAnimationClass,
  rightAnimationClass,
  isGameActive,
  imageScale,
  level = 1
}) => {
  const optionSpeed = Math.max(0.5, 2 - 5 * 0.1);
  const scenerySpeed = 3.5 - (level - 1);
  const roadLineSpeed = Math.max(0.5, 1.5 - level * 0.1);
  return (
    <div className={styles.container}>
      <div className="absolute top-[-20] left-[45%] z-20">
        {options.length === 2 && isGameActive ? (
          <>
            <button
              className={`bg-green-200 font-bold h-12 w-12 mx-2 p-4 rounded-full flex justify-center items-center ${leftAnimationClass}`}
              onClick={() => handleAnswer?.(options[0])}
              style={{ animationDuration: `${optionSpeed}s` }} 
            >
              {options[0]}
            </button>
            <button
              className={`bg-green-200 font-bold h-12 w-12 mx-2 p-4 rounded-full flex justify-center items-center ${rightAnimationClass}`}
              onClick={() => handleAnswer?.(options[1])}
              style={{ animationDuration: `${optionSpeed}s` }} 
            >
              {options[1]}
            </button>
          </>
        ) : (
          <LoadingScreen />
        )}
      </div>
      <div className={styles.top}>
        <img src={sky} alt="Top Photo" />
        {/* <img src={clouds} alt="cloud" className="absolute bottom-10 " /> */}
      </div>
      <div className={styles.bottom}>
        <img src={road} alt="Bottom Photo" />
      </div>
      <div className={styles.overlay}>
        <div className={styles.overlayText}>
          <img src={destination} alt="finishLine" className="h-[18rem]"
            style={{
              transform: `scale(${imageScale})`,
              transition: 'transform 0.5s ease-in-out', 
            }}
          />
        </div>
        <Car position={`${carPosition}%`} rotation={carRotation} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={0} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={0.25} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={0.5} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={0.75} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={1} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={1.25} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={1.5} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={1.75} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={2} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={2.25} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={2.5} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={2.75} />
        <Scenery image={tree} side="left" speed={scenerySpeed} delay={3} />
        <Road speed={roadLineSpeed} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={0} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={0.25} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={0.5} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={0.75} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={1} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={1.25} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={1.5} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={1.75} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={2} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={2.25} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={2.5} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={2.75} />
        <Scenery image={tree} side="right" speed={scenerySpeed} delay={3} />
      </div>
    </div>
  );
};

export default GameArea;
