import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import React from 'react';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { StepCtx } from 'src/contexts/step.context';
import { IStep } from 'src/types/step';
import { MailTemplateCtx } from '../../contexts/mail-template.context';
import { mailContent } from '../../seeds/mail';

import { getStep } from 'src/const/steps';
import Navigation from './Navigation';

const Steps = () => {
  const [activeStep, setActiveStep] = React.useState<IStep | null>(getStep(0));
  const [spreadsheet, setSpreadsheet] = React.useState(null);
  const [mailTemplate, setMailTemplate] = React.useState<string>(mailContent);

  const steps = [
    { key: 'choose', label: 'Choose' },
    { key: 'prepare_template', label: 'Prepare template' },
    { key: 'send', label: 'Send' },
  ];

  function getComponent() {
    return (activeStep && activeStep.component) || null;
  }

  return (
    <SpreadsheetCtx.Provider value={[spreadsheet, setSpreadsheet]}>
      <MailTemplateCtx.Provider value={[mailTemplate, setMailTemplate]}>
        <StepCtx.Provider value={[activeStep, setActiveStep]}>
          <main>
            <Stepper
              alternativeLabel={true}
              nonLinear={true}
              activeStep={(activeStep && activeStep.number) || undefined}
            >
              {steps.map(step => (
                <Step key={step.key}>
                  <StepButton>{step.label}</StepButton>
                </Step>
              ))}
            </Stepper>
            {getComponent()}
          </main>
          <footer style={{ padding: 10 }}>
            <Navigation />
          </footer>
        </StepCtx.Provider>
      </MailTemplateCtx.Provider>
    </SpreadsheetCtx.Provider>
  );
};

export default Steps;
