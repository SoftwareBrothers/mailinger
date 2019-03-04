import { createContext } from 'react';
import { getStep } from 'src/const/steps';

export const StepCtx = createContext(getStep(0));
