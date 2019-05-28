import { createContext } from 'react';

export enum EmailStatus {
  NEW = 0,
  PENDING = 1,
  SENT = 2,
  ERROR = 3,
}

export interface EmailData {
  active: boolean;
  content: string;
  firstName: string;
  lastName: string;
  recipient: string;
  status: EmailStatus;
  title: string;
}

export interface EmailContext {
  readonly data: EmailData[];
  readonly setEmails: (data: any) => void;
}

export const EmailCtx = createContext<EmailContext>({
  data: [],
  setEmails: () => null,
});
