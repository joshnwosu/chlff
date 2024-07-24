import React from 'react';
import classes from './MultiplicationTableCheck.module.css';
import PageWrapper from '../Shared/PageWrapper/PageWrapper';
import CustomButton from '../Shared/CustomButton/CsutomButton';

const MultiplicationTableCheck: React.FC = () => {
  return (
    <PageWrapper>
      <div className={classes.container}>
        <div className={classes.mtc_wrapper}>
          <div className={classes.title}>
            <h1>Multitplication Table Check</h1>
          </div>

          <div className={classes.content}>
            <h1>Taking the MTC soon?</h1>

            <p className={classes.text}>
              Use our on-screen test to see just how well you will do
            </p>

            <p className={classes.text}>
              Our results page will guide you to on-screen activities and
              worksheets that can really make a ifference; If you need them!
            </p>

            <p className={classes.text}>
              Warning: this test is really challenging: 25 questions, 6 seconds
              for each!
            </p>

            <div className={classes.btnWrap}>
              <CustomButton>Let's Go</CustomButton>
            </div>

            <p className={classes.text}>
              Change your input method using the Settings menu
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MultiplicationTableCheck;
