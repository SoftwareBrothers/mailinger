import { Sheet } from './Sheet';

export interface Spreadsheet {
  sheets: Sheet[];
  embedUrl?: string;
}
