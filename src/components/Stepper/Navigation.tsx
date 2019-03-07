import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { memo, useContext } from 'react';
import { getStep } from '../../const/steps';
import { StepCtx } from '../../contexts/step.context';
import { useStyles } from '../../hooks/useStyles';

const styles = {
  bottomNavigation: {
    bottom: 0,
    position: 'fixed' as any,
    width: '100%',
  },
};

const Navigation = () => {
  const [activeStep, setActiveStep] = useContext(StepCtx);
  const classes = useStyles(styles);

  function handleBack() {
    const step = getStep(activeStep.number - 1);
    setActiveStep(step);
  }

  function handleNext() {
    const step = getStep(activeStep.number + 1);
    setActiveStep(step);
  }

  return (
    <BottomNavigation
      className={classes.bottomNavigation}
      value={activeStep}
      showLabels={true}
    >
      <BottomNavigationAction
        style={{
          margin: '0 auto',
        }}
        label="Prev"
        disabled={activeStep.number === 0}
        icon={<NavigateBeforeIcon />}
        onClick={handleBack}
        value="prev"
      />
      <BottomNavigationAction
        disabled={activeStep.isBlocked}
        style={{
          margin: '0 auto',
        }}
        label="Next"
        icon={<NavigateNextIcon />}
        onClick={handleNext}
        value="next"
      />
    </BottomNavigation>
  );
};

export default memo(Navigation);
