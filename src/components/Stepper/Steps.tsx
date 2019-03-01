import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import React from 'react';
import DrivePicker from 'src/components/DrivePicker';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { StepCtx } from 'src/contexts/step.context';
import Editor from '../Editor/Editor';
import Sender from './../Sender';
import Navigation from './Navigation';

const Steps = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [spreadsheet, setSpreadsheet] = React.useState(null);

  const steps = [
    { key: 'choose', label: 'Choose' },
    { key: 'prepare_template', label: 'Prepare template' },
    { key: 'send', label: 'Send' },
  ];

  function getComponent() {
    switch (activeStep) {
      case 0:
        return <DrivePicker />;
      case 1:
        return <Editor spreadsheet={spreadsheet} setSpreadsheet={setSpreadsheet} />;
      case 2:
        return <Sender />;
      default:
        return null;
    }
  }

  return (
    <SpreadsheetCtx.Provider value={[spreadsheet, setSpreadsheet]}>
      <StepCtx.Provider value={[activeStep, setActiveStep]}>
        <Stepper
          alternativeLabel={true}
          nonLinear={true}
          activeStep={activeStep}
        >
          {steps.map(step => (
            <Step key={step.key}>
              <StepButton>{step.label}</StepButton>
            </Step>
          ))}
        </Stepper>
        {getComponent()}
        <Navigation />
      </StepCtx.Provider>
    </SpreadsheetCtx.Provider>
  );
};

export default Steps;
