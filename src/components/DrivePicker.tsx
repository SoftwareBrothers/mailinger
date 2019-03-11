import { Button, Grid, Theme } from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';
import React, { memo, useContext } from 'react';
// @ts-ignore
import GooglePicker from 'react-google-picker';
import { SpreadsheetCtx } from '../contexts/spreadsheet.context';
import { StepCtx } from '../contexts/step.context';
import { useStyles } from '../hooks/useStyles';
import SpreadSheetService from '../services/spreadsheet.service';

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
    marginRight: theme.spacing.unit * 2,
  },
});

const DrivePicker = () => {
  const { spreadsheet, setSpreadsheet } = useContext(SpreadsheetCtx);
  const [step, setStep] = useContext(StepCtx);
  const classes = useStyles(styles);
  const service = new SpreadSheetService();

  const onChange = async (data: any) => {
    const result = await service.onFilePicked(data, setSpreadsheet);
    if (result) {
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
        <Button variant="contained" size="large">
          <StorageIcon className={classes.storageIcon} />
          Select File
        </Button>
      </GooglePicker>
      {renderEmbed()}
    </Grid>
  );
};

export default memo(DrivePicker);
