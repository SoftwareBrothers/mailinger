import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { getStep } from 'src/const/steps';
import { StepCtx } from 'src/contexts/step.context';

const Navigation = () => {
  const [steps] = React.useState([1, 2, 3]);
  const [activeStep, setActiveStep] = React.useContext(StepCtx);

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
      style={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
      }}
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

export default Navigation;
