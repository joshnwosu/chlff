import React from 'react';

interface SurroundingsProps {
  surroundingsImage: string;
}

const Surroundings: React.FC<SurroundingsProps> = ({ surroundingsImage }) => {
  return (
    <div  className="w-full h-full z-50 object-contain" >
      <img src={surroundingsImage} alt="Surroundings" className="surroundings-image" />
    </div>
  );
};

export default Surroundings;
