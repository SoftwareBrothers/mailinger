import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import React from 'react';
import { StepCtx } from 'src/contexts/step.context';
import Editor from '../Editor/Editor';
import Sender from './../Sender';
import Navigation from './Navigation';

const Steps = () => {
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = [
    { key: 'choose', label: 'Choose' },
    { key: 'prepare_template', label: 'Prepare template' },
    { key: 'send', label: 'Send' },
  ];

  function getComponent() {
    switch (activeStep) {
      case 2:
        return <Editor />;
      case 3:
        return <Sender />;
    }
  }

  return (
    <StepCtx.Provider value={[activeStep, setActiveStep]}>
      <Stepper alternativeLabel={true} nonLinear={true} activeStep={activeStep}>
        {steps.map(step => {
          <Step key={step.key}>
            <StepButton>{step.label}</StepButton>
          </Step>;
        })}
      </Stepper>
      {getComponent()}
      <Navigation />
    </StepCtx.Provider>
  );
};

export default Steps;
