export interface Spreadsheet {
  variables: string[];
  usersData: [{ [key: string]: any }];
  embedUrl?: string;
}
