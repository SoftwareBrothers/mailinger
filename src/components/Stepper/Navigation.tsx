import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { memo, useContext, useState } from 'react';
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
  const [steps] = useState([1, 2, 3]);
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
        label="Prev"
        disabled={activeStep.number === 0}
        icon={<NavigateBeforeIcon />}
        onClick={handleBack}
        value="prev"
      />

      <BottomNavigationAction
        disabled={
          activeStep.nubmer === steps.length - 1 || activeStep.isBlocked
        }
        label="Next"
        icon={<NavigateNextIcon />}
        onClick={handleNext}
        value="next"
      />
    </BottomNavigation>
  );
};

export default memo(Navigation);
