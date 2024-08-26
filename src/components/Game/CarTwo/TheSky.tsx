import React from 'react';

interface TheSkyProps {
  skyImage: string;
}

const TheSky: React.FC<TheSkyProps> = ({ skyImage }) => {
  return (
    <div  className="w-full h-full object-contain">
      <img src={skyImage} alt="Sky" className="theSky-image" />
    </div>
  );
};

export default TheSky;
