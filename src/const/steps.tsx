import React from 'react';
import DrivePicker from '../components/DrivePicker';
import Editor from '../components/Editor/Editor';
import Sender from '../components/Sender/Sender';
import { Step } from '../models';

export const DrivePickerStep: Step = {
  component: <DrivePicker />,
  isBlocked: true,
  number: 0,
};

export const EditorStep: Step = {
  component: <Editor />,
  isBlocked: false,
  number: 1,
};

export const SenderStep: Step = {
  component: <Sender />,
  isBlocked: true,
  number: 2,
};

export function getStep(step: number): Step | null {
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
