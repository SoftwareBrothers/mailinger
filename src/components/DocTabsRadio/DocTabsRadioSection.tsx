import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import React, { memo, useContext } from 'react';
import { SheetCtx } from 'contexts/sheet.context';
import { Sheet, Spreadsheet } from 'models';
import { getSheetByTitle } from 'utils/spreadsheet';

interface OwnProps {
  readonly spreadsheet: Spreadsheet;
};
type Props = OwnProps;

const DocTabsRadioSection = ({spreadsheet} : Props) => {
  const {sheet, setSheet} = useContext(SheetCtx);
  const initSheet = sheet ? sheet : spreadsheet.sheets[0];
  setSheet(initSheet);

  const assignNewSheet = (sheetToAssign: Sheet) => {
    const newSheet = {...sheet,
      title: sheetToAssign.title,
      usersData: sheetToAssign.usersData,
      variables: sheetToAssign.variables
    };
    setSheet(newSheet);
  };

  const onRadioChange = (event: React.ChangeEvent<unknown>) => {
    const sheetTitle = (event.target as HTMLInputElement).value;
    const sheetSelected = getSheetByTitle(spreadsheet, sheetTitle);

    if (!sheetSelected) {
      return;
    }

    assignNewSheet(sheetSelected);
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