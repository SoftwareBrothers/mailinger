import { Nullable, Sheet, Spreadsheet } from 'models';

const getSheetByTitle = (spreadsheet: Spreadsheet, title: string): Nullable<Sheet> => {
  if (!spreadsheet || !spreadsheet.sheets) {
    return null;
  }

  for (const sheet of spreadsheet.sheets) {
    if (sheet.title === title) {
      return sheet;
    }
  }

  return null;
};

export { getSheetByTitle };
