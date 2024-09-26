import { FC } from 'react';
import styles from './Puzzle.module.css';

interface PuzzleProps {
  feedbackPiece: number | null;
  revealedPieces: number[];
  borderColor: string;
  photoSet: string; // New prop to indicate the selected photo set
}

const Puzzle: FC<PuzzleProps> = ({ feedbackPiece, revealedPieces, borderColor, photoSet }) => {
  const rows = [];
  for (let i = 0; i < 30; i += 6) {
    rows.push(Array.from({ length: 6 }, (_, j) => i + j));
  }

  return (
    <div className={styles.puzzleContainer}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((piece) => (
            <div
              key={piece}
              className={`${styles.piece} ${feedbackPiece === piece ? borderColor : styles.bgGray}`}
            >
              {revealedPieces.includes(piece) ? (
                <img
                  src={`assets/pieces/${photoSet}/piece${piece + 1}.png`}
                  alt={`Piece ${piece + 1}`}
                  className={styles.revealedPieceImage}
                />
              ) : (
                <div className={styles.hiddenPiece}></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Puzzle;
