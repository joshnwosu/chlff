import React, { FC } from 'react';

interface PuzzleProps {
  feedbackPiece: number | null;
  revealedPieces: number[];
  borderColor: string; 
}

const Puzzle: FC<PuzzleProps> = ({ feedbackPiece, revealedPieces, borderColor }) => {
  const rows = [];
  for (let i = 0; i < 30; i += 5) {
    rows.push(Array.from({ length: 5 }, (_, j) => i + j));
  }

  return (
    <div className="flex flex-col gap-[1px] justify-center items-center w-auto">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-[1px]">
          {row.map((piece) => (
            <div key={piece}
            className={`w-[50px] h-[50px] flex gap-1 items-center justify-center ${feedbackPiece === piece ? borderColor : 'bg-gray-300'} border-4`}

            >
              {revealedPieces.includes(piece) ? (
                <img
                  src={`assets/pieces/piece${piece + 1}.png`}
                  alt={`Piece ${piece + 1}`}
                  width={100}
                  height={100}
                />
              ) : (
                <div className="w-full h-full bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Puzzle;
