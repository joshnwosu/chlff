import classes from './Progress.module.css';

interface ProgressProps {
  stage?: number;
  progress: number; // Overall progress percentage (0-100)
}

const colors = ['#E7492A', '#F7E300', '#0CD608'];

export default function Progress({ stage = 3, progress }: ProgressProps) {
  return (
    <div className={classes.progress}>
      <div className={classes.title}>
        <p>Progress</p>
        <p>Mission {stage}</p>
      </div>

      <div className={classes.flex}>
        {Array.from({ length: stage }).map((_, index) => {
          const currentStageProgress = Math.max(
            0,
            Math.min(100, progress - 100 * index)
          );

          return (
            <div className={classes.seek} key={index}>
              <div
                className={classes['seek-bar']}
                style={{
                  backgroundColor: colors[index],
                  width: `${currentStageProgress}%`, // Apply calculated progress
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
