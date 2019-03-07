import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import React, {memo, useState} from 'react';
import {getStep} from "../../const/steps";
import { MailTemplateCtx } from '../../contexts/mail-template.context';
import {SpreadsheetCtx} from '../../contexts/spreadsheet.context';
import {StepCtx} from '../../contexts/step.context';
import { mailContent } from '../../seeds/mail';
import {IStep} from "../../types";
import Navigation from './Navigation';

const Steps = () => {
  const [activeStep, setActiveStep] = useState<IStep | null>(getStep(0));
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [mailTemplate, setMailTemplate] = useState<string>(mailContent);

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
          <Navigation />
        </StepCtx.Provider>
      </MailTemplateCtx.Provider>
    </SpreadsheetCtx.Provider>
  );
};

export default memo(Steps);
