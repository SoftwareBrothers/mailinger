import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import React, { memo, useContext } from 'react';
import { SheetCtx } from '../../contexts/sheet.context';
import { Spreadsheet } from '../../models';
import { getSheetByTitle } from '../../utils/spreadsheet';

interface OwnProps {
  readonly spreadsheet: Spreadsheet;
};
type Props = OwnProps;

const DocTabsRadioSection = ({spreadsheet} : Props) => {
  const {sheet, setSheet} = useContext(SheetCtx);
  setSheet(spreadsheet.sheets[2]);
  console.log("title", spreadsheet.sheets[0].title);

  const onRadioChange = (event: any) => {
    const sheetTitle = event.target.value;
    const sheetSelected = getSheetByTitle(spreadsheet, sheetTitle);
    console.log('setting sheet:', sheetSelected);
    setSheet(spreadsheet.sheets[1]);
    console.log('context sheet:', sheet);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Tab to export</FormLabel>
      <RadioGroup
        aria-label="Sheets"
        name="Sheets"
        value={sheet ? sheet.title : spreadsheet.sheets[0].title}
        onChange={onRadioChange}
      >
        {spreadsheet.sheets.map((tab) => <FormControlLabel key={tab.title} value={tab.title} control={<Radio />} label={tab.title} />)}
      </RadioGroup>
    </FormControl>
  );
};

export default memo(DocTabsRadioSection);