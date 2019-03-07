export const replaceVars = (input: string, spreadsheet: any) => {
  return input.replace(/\[(.*?)\]/g, (match, p1) => {
    if (spreadsheet && spreadsheet.usersData) {
      return spreadsheet.usersData[0][p1]
    }
    return match;
  })
};
