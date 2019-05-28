import { Nullable, Sheet, Spreadsheet } from 'models';

const getSheetByTitle = (spreadsheet: Spreadsheet, title: string): Nullable<Sheet> => {
  if (!spreadsheet || !spreadsheet.sheets) {
    return null;
  }
  return spreadsheet.sheets.find((sheet: Sheet) => title === sheet.title) || null;
};

export { getSheetByTitle };
