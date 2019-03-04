export interface ISpreadsheet {
  variables: string[];
  usersData: [{ [key: string]: any }];
  embedUrl?: string;
}
