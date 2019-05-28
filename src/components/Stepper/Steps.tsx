import { Grid } from '@material-ui/core';
import MUIStep from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { getStep } from 'const/steps';
import { EmailCtx, EmailData} from 'context/email';
import { MailTemplateCtx } from 'context/mail-template';
import { SpreadsheetCtx } from 'context/spreadsheet';
import { StepCtx } from 'context/step';
import { useStyles } from 'hooks/useStyles';
import { Step } from 'models';
import React, { memo, useState } from 'react';
import { mailContent } from 'seeds/mail';
import Navigation from './Navigation';

const styles = {
  stepper: {
    background: 'none',
  },
};

const Steps = () => {
  const [activeStep, setActiveStep] = useState<Step | null>(getStep(0));
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [mailTemplate, setMailTemplate] = useState<string>(mailContent);
  const [emails, setEmails] = useState<EmailData[]>([]);
  const classes = useStyles(styles);

  const steps = [
    { key: 'choose', label: 'Choose' },
    { key: 'prepare_template', label: 'Prepare template' },
    { key: 'send', label: 'Send' },
  ];

  function getComponent() {
    return (activeStep && activeStep.component) || null;
  }

  return (
    <SpreadsheetCtx.Provider value={{ spreadsheet, setSpreadsheet }}>
      <MailTemplateCtx.Provider value={[mailTemplate, setMailTemplate]}>
        <StepCtx.Provider value={[activeStep, setActiveStep]}>
          <EmailCtx.Provider value={{ data: emails, setEmails }}>
            <Grid container={true} alignItems={'center'} justify={'center'}>
              <Grid item={true} xs={8}>
                <Stepper
                  className={classes.stepper}
                  alternativeLabel={false}
                  nonLinear={false}
                  activeStep={(activeStep && activeStep.number) || undefined}
                >
                  {steps.map(step => (
                    <MUIStep key={step.key}>
                      <StepButton>{step.label}</StepButton>
                    </MUIStep>
                  ))}
                </Stepper>
                {getComponent()}
              </Grid>
            </Grid>

            <Navigation />
          </EmailCtx.Provider>
        </StepCtx.Provider>
      </MailTemplateCtx.Provider>
    </SpreadsheetCtx.Provider>
  );
};

export default memo(Steps);
