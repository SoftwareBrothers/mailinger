import { createContext } from 'react';
import { ISpreadsheet } from 'src/types';

export const SpreadsheetCtx = createContext<ISpreadsheet>(null as any);
