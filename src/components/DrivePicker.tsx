import { Button, Grid } from '@material-ui/core';
import StorageIcon from '@material-ui/icons/Storage';
import React, { useContext } from 'react';
import GooglePicker from 'react-google-picker';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { StepCtx } from 'src/contexts/step.context';
import SpreadSheetService from 'src/services/spreadsheet.service';
const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID || '';
const DEVELOPER_KEY = process.env.REACT_APP_DEVELOPER_KEY || '';

const pickerOnAuthFailed = (error: any) => {
  console.log('Picker auth failed error:', error);
};

const drivePicker = () => {
  const [spreadsheet, setSpreadsheet] = useContext(SpreadsheetCtx);
  const [step, setStep] = useContext(StepCtx);
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
      return (
        <embed
          style={{ width: '90%', minHeight: 550, marginTop: 25 }}
          src={spreadsheet.embedUrl}
        />
      );
    }
    return null;
  };

  return (
    <Grid item={true} xs={12} style={{ textAlign: 'center', padding: 'auto' }}>
      <GooglePicker
        clientId={CLIENT_ID}
        developerKey={DEVELOPER_KEY}
        scope={['https://www.googleapis.com/auth/drive']}
        onChange={onChange}
        onAuthFailed={pickerOnAuthFailed}
      >
        <Button variant="contained" size="large">
          <StorageIcon style={{ marginRight: 20 }} />
          Select File
        </Button>
      </GooglePicker>
      {renderEmbed()}
    </Grid>
  );
};

export default drivePicker;
