import React, { } from 'react';
import styles from './SideImage.module.css';
import tree from '../../../../public/assets/surrounding/tree1.png'

interface SideImageProps {
  position: 'left' | 'right';
  difficulty: number; // 1 for easy, 2 for medium, 3 for hard
}

const SideImage: React.FC<SideImageProps> = ({ position, difficulty }) => {
  // const [imageSrc, setImageSrc] = useState<string>('');

  // Function to get a random image from a list
  // const getRandomImage = () => {
  //   const images = [
  //     'path/to/building.jpg',
  //     'path/to/tree.jpg',
  //     // Add more images here
  //   ];
  //   return images[Math.floor(Math.random() * images.length)];
  // };

  // useEffect(() => {
  //   // Define base values for easy difficulty
  //   const baseInterval = 500; // Interval for easy level (5 seconds)
  //   const baseDuration = 10; // Animation duration for easy level (10 seconds)

  //   // Adjust values based on difficulty
  //   const adjustedInterval = Math.max(
  //     1000, // Minimum interval (1 second)
  //     baseInterval - (difficulty - 1) * 100 // Reduce interval with difficulty
  //   );

  //   const adjustedDuration = Math.max(
  //     5, // Minimum duration (5 seconds)
  //     baseDuration - (difficulty - 1) * 2 // Reduce animation duration with difficulty
  //   );

    // Function to update the image source
    // const updateImage = () => {
    //   setImageSrc(getRandomImage());
    // };

    // Set interval to update image
    // const imageInterval = setInterval(updateImage, adjustedInterval);

    // Cleanup interval on component unmount
  //   return () => clearInterval(imageInterval);
  // }, [difficulty]);

  return (
    <img
      className={`${styles.sideImage} ${styles[position]}`}
      style={{ animationDuration: `${10 / difficulty}s` }} // Adjust animation duration based on difficulty
      src={tree}
      alt="Side Image"
    />
  );
};

export default SideImage;
