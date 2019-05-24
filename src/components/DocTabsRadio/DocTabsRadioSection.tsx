import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup, Theme,
} from '@material-ui/core';
import React, { memo, useState } from 'react';
import { Spreadsheet } from '../../models';

interface OwnProps {
  readonly spreadsheet: Spreadsheet;
};
type Props = OwnProps;

const DocTabsRadioSection = ({spreadsheet} : Props) => {
  const [sheetToUse, setSheetToUse] = useState(spreadsheet.sheets[0].title);

  const onRadioChange = (event: any) => {
    setSheetToUse(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Tab to export</FormLabel>
      <RadioGroup
        aria-label="Sheets"
        name="Sheets"
        value={sheetToUse}
        onChange={onRadioChange}
      >
        {spreadsheet.sheets.map((sheet) => <FormControlLabel key={sheet.title} value={sheet.title} control={<Radio />} label={sheet.title} />)}
      </RadioGroup>
    </FormControl>
  );
};

export default memo(DocTabsRadioSection);