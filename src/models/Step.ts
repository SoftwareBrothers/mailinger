import { ReactNode } from 'react';

export interface Step {
  isBlocked: boolean;
  number: number;
  component: ReactNode;
}
