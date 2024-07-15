import { Suspense, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';

const RenderScene = () => {
  const { gameMode } = useAppSelector((state) => state.game);
  //   const { city, time, weather } = gameMode;

  useEffect(() => {
    console.log('game mode: ', gameMode);
  }, []);

  return <Suspense fallback={<div>Loading...</div>}></Suspense>;
};

export default RenderScene;
