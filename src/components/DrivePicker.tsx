import { Button, Grid, Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import StorageIcon from '@material-ui/icons/Storage';
import { SpreadsheetCtx } from 'contexts/spreadsheet.context';
import { StepCtx } from 'contexts/step.context';
import { useStyles } from 'hooks/useStyles';
import React, { memo, useContext, useState } from 'react';
// @ts-ignore
import GooglePicker from 'react-google-picker';
import SpreadSheetService from 'services/spreadsheet.service';
import DocTabsRadioSection from './DocTabsRadio/DocTabsRadioSection';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID || '';
const DEVELOPER_KEY = process.env.REACT_APP_DEVELOPER_KEY || '';

const pickerOnAuthFailed = (error: any) => {
  console.log('Picker auth failed error:', error);
};

const styles = (theme: Theme) => ({
  embed: {
    marginTop: 25,
    minHeight: 550,
    width: '90%',
  },
  root: {
    padding: 'auto',
    textAlign: 'center' as any,
  },
  storageIcon: {
    marginRight: theme.spacing(2),
  },
});

export enum DriveState{
  READY  = 'ready',
  LOADING = 'picked'
};

const DrivePicker = () => {
  const { spreadsheet, setSpreadsheet } = useContext(SpreadsheetCtx);
  const [step, setStep] = useContext(StepCtx);
  const [driveState, setDriveState] = useState(DriveState.READY);
  const classes = useStyles(styles);
  const service = new SpreadSheetService();

  const onChange = async (data: any) => {
    const result = await service.onFilePicked(
      setDriveState,
      data,
      setSpreadsheet,
    );
    if (result) {
      setDriveState(DriveState.READY);
      const currentStep = { ...step, isBlocked: false };
      setStep(currentStep);
    }
  };

  const renderEmbed = () => {
    if (spreadsheet && spreadsheet.embedUrl) {
      return <embed className={classes.embed} src={spreadsheet.embedUrl} />;
    }
    return null;
  };

  return (
    <Grid item={true} xs={12} className={classes.root}>
      <GooglePicker
        clientId={CLIENT_ID}
        developerKey={DEVELOPER_KEY}
        scope={['https://www.googleapis.com/auth/drive']}
        onChange={onChange}
        onAuthFailed={pickerOnAuthFailed}
      >
        {driveState === DriveState.LOADING ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" size="large">
            <StorageIcon className={classes.storageIcon} />
            Select File
          </Button>
        )}
      </GooglePicker>
      {renderEmbed()}

      { spreadsheet && spreadsheet.sheets ? <DocTabsRadioSection spreadsheet={spreadsheet}/> : null }

    </Grid>
  );
};

export default memo(DrivePicker);
