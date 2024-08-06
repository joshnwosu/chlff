import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const speed = 5;

const RandFishRenderer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  //   const [count, setCount] = useState(0);
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const [fishCreated, setFishCreated] = useState(false);

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setVw(clientWidth * 0.97);
        setVh(clientHeight * 0.97);

        console.log({ clientWidth, clientHeight });
      }
    };

    // Set initial size
    updateContainerSize();

    window.addEventListener('resize', updateContainerSize);

    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };
  }, []);

  function getAngle(cx: number, cy: number, ex: number, ey: number): number {
    const dy = ey - cy;
    const dx = ex - cx;
    let theta = Math.atan2(dy, dx); // range [-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range [-180, 180]
    theta += 90; // set 0 as top, range [-90, 270]
    if (theta > 180) theta = theta - 360; // range [-180, 180]
    return Math.floor(theta);
  }

  const setPos = (el: HTMLAnchorElement, x: number, y: number) => {
    if (!containerRef.current) return;

    // Ensure the fish stays within the boundaries
    const maxX = vw - el.offsetWidth;
    const maxY = vh - el.offsetHeight;
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    // old coords
    const a = el.offsetLeft;
    const b = el.offsetTop;
    // distance
    const ax = Math.abs(a - x);
    const by = Math.abs(b - y);
    const dur = Math.floor(Math.sqrt(ax * ax + by * by)) * speed; // Using a fixed speed
    // set new coords
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    // set duration
    el.style.transitionDuration = `${dur}ms`;
    // set angle
    el.style.transform = `rotate(${getAngle(a, b, x, y)}deg)`;
    setTimeout(() => {
      setRandomPos(el);
    }, dur);
  };

  function setRandomPos(el: HTMLAnchorElement) {
    const randomX = Math.floor(Math.random() * vw);
    const randomY = Math.floor(Math.random() * vh);
    setPos(el, randomX, randomY);
  }

  function createFish(num: number) {
    if (!containerRef.current) return;

    for (let i = 0; i < num; i++) {
      const fish = document.createElement('a');
      fish.setAttribute('href', '#');
      fish.className = 'rand-fish';
      fish.textContent = '=';
      fish.style.position = 'absolute';
      fish.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
      containerRef.current.appendChild(fish);
      setRandomPos(fish);
    }
  }

  useEffect(() => {
    if (!fishCreated && vw > 100) {
      createFish(1); // Create 2 fish
      setFishCreated(true); // Prevent further creations
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vw, fishCreated]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        // border: '2px solid blue',
        overflow: 'hidden',
      }}
    ></div>
  );
};

export default RandFishRenderer;
