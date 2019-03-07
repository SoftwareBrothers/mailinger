import { createContext } from 'react';
import { getStep } from '../const/steps';

export const StepCtx = createContext(getStep(0)) as any;
