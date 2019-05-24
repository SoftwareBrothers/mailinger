import { getStep } from 'const/steps';
import { createContext } from 'react';

export const StepCtx = createContext(getStep(1)) as any;
