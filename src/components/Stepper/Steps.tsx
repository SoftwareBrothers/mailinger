import { Grid } from '@material-ui/core';
import MUIStep from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { getStep } from 'const/steps';
import { EmailCtx, EmailData } from 'context/email';
import { MailTemplateCtx } from 'context/mail-template';
import { SheetCtx } from 'context/sheet';
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
  const [sheet, setSheet] = useState(null);
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [mailTemplate, setMailTemplate] = useState<string>(mailContent);
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
      <SheetCtx.Provider value={{ sheet, setSheet }}>
        <MailTemplateCtx.Provider value={[mailTemplate, setMailTemplate]}>
          <EmailCtx.Provider value={{ data: emails, setEmails }}>
            <StepCtx.Provider value={[activeStep, setActiveStep]}>
              <Grid container={true} justify={'center'}>
                <Grid item={true} xs={8}>
                  <Stepper
                    className={classes.stepper}
                    nonLinear={true}
                    activeStep={(activeStep && activeStep.number) || undefined}
                  >
                    {steps.map(step => (
                      <MUIStep key={step.key}>
                        <StepButton>{step.label}</StepButton>
                      </MUIStep>
                    ))}
                  </Stepper>
                  {getComponent()}
                  <Navigation />
                </Grid>
              </Grid>
            </StepCtx.Provider>
          </EmailCtx.Provider>
        </MailTemplateCtx.Provider>
      </SheetCtx.Provider>
    </SpreadsheetCtx.Provider>
  );
};

export default memo(Steps);
