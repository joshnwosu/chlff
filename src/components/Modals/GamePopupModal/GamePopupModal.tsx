import React from 'react';
import classes from './GamePopupModal.module.css';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function GamePopupModal({ title, children }: Props) {
  return (
    <div className={classes.container}>
      <div className={classes.selectContainer}>
        <div className={classes.selectHeader}>
          <p className={classes.selectHeaderTitle}>{title}</p>
        </div>

        <div className={classes.selectContent}>
          <div className={classes.selectScroll}>{children}</div>
        </div>
      </div>
    </div>
  );
}
