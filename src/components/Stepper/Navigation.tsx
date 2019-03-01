import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { StepCtx } from 'src/contexts/step.context';

const Navigation = () => {
  const [steps] = React.useState([1, 2, 3]);
  const [activeStep, setActiveStep] = React.useContext(StepCtx);

  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  function handleNext() {
    setActiveStep(activeStep + 1);
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
        disabled={activeStep === 1}
        icon={<NavigateBeforeIcon />}
        onClick={handleBack}
        value="prev"
      />

      <BottomNavigationAction
        disabled={activeStep === steps.length}
        label="Next"
        icon={<NavigateNextIcon />}
        onClick={handleNext}
        value="next"
      />
    </BottomNavigation>
  );
};

export default Navigation;
