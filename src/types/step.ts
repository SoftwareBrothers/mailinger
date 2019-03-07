import {ReactNode} from "react";

export interface IStep {
  isBlocked: boolean;
  number: number;
  component: ReactNode;
}
