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

enum PickerStatus {
  PICKED = 'picked'
};

const DrivePicker = () => {
  const { spreadsheet, setSpreadsheet } = useContext(SpreadsheetCtx);
  const [step, setStep] = useContext(StepCtx);
  const [isDocLoading, setIsDocLoading] = useState(false);
  const classes = useStyles(styles);
  const service = new SpreadSheetService();

  const onChange = async (data: any) => {
    const result = await service.onFilePicked(driveStatusChanged, data, setSpreadsheet);
    if (result) {
      setIsDocLoading(false);
      const currentStep = { ...step, isBlocked: false };
      setStep(currentStep);
    }
  };

  const driveStatusChanged = (status: any) => {
    if (status === PickerStatus.PICKED) {
      setIsDocLoading(true);
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
        { !isDocLoading ? <Button variant="contained" size="large">
          <StorageIcon className={classes.storageIcon} />
          Select File
        </Button> : null }
        { isDocLoading ? <CircularProgress /> : null }
      </GooglePicker>
      {renderEmbed()}
    </Grid>
  );
};

export default memo(DrivePicker);
