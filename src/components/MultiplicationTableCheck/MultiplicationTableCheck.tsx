import React, { useState } from 'react';
import classes from './MultiplicationTableCheck.module.css';
import PageWrapper from '../Shared/PageWrapper/PageWrapper';
import CustomButton from '../Shared/CustomButton/CsutomButton';

const MultiplicationTableCheck: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const FirstContent = () => {
    return (
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
            <strong>
              Warning: this test is really challenging: 25 questions, 6 seconds
              for each!
            </strong>
          </p>

          <div className={classes.btnWrap}>
            <CustomButton onClick={() => setActiveIndex(1)}>
              Let's Go
            </CustomButton>
          </div>

          <p className={classes.text}>
            Change your input method using the Settings menu
          </p>
        </div>
      </div>
    );
  };

  const SecondContent = () => {
    return (
      <div>
        <div className={classes.mtc_wrapper}>
          <div className={classes.title}>
            <h1>Multitplication Table Check</h1>
          </div>

          <div className={classes.content}>
            <h1>Practice Questions</h1>

            <p className={classes.text}>
              Learn how the test works with these <strong>3 Practice</strong>{' '}
              quetsions, then take the full 25 questions test.
            </p>

            <p className={classes.text}>
              You will have <strong>6 seconds to answer</strong> each of the
              question. There is a short pause between quetsions to allow you to
              prepare for the next one.
            </p>

            <p className={classes.text}>
              You can use the on-screen keypad or your keyboard.
            </p>

            <p className={classes.text}>
              You don't need to press enter as your answer will be taken when
              the time runs out.
            </p>

            <div className={classes.btnWrap}>
              <CustomButton onClick={() => setActiveIndex(2)}>
                Start Practice
              </CustomButton>
            </div>
          </div>
        </div>
        <div className={classes.btnWrapFlex}>
          <CustomButton onClick={() => setActiveIndex(0)}>Go back</CustomButton>

          <CustomButton onClick={() => setActiveIndex(1)}>Skip</CustomButton>
        </div>
      </div>
    );
  };

  return (
    <PageWrapper>
      <div className={classes.container}>
        {activeIndex == 0 ? <FirstContent /> : <SecondContent />}
      </div>
    </PageWrapper>
  );
};

export default MultiplicationTableCheck;
