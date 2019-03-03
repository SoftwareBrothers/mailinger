import React from 'react';

import DrivePicker from 'src/components/DrivePicker';
import Editor from 'src/components/Editor/Editor';
import Sender from 'src/components/Sender/Sender';
import { IStep } from 'src/types/step';

export const DrivePickerStep: IStep = {
  component: <DrivePicker />,
  isBlocked: true,
  number: 0,
};

export const EditorStep: IStep = {
  component: <Editor />,
  isBlocked: false,
  number: 1,
};

export const SenderStep: IStep = {
  component: <Sender />,
  isBlocked: false,
  number: 2,
};

export function getStep(step: number): IStep | null {
  switch (step) {
    case 0:
      return DrivePickerStep;
    case 1:
      return EditorStep;
    case 2:
      return SenderStep;
    default:
      return null;
  }
}
