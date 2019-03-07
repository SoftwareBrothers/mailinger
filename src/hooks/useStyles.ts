import { makeStyles } from '@material-ui/styles';
import { Styles } from '@material-ui/styles/withStyles';
import { useCallback } from 'react';

export const useStyles = (styles: Styles<any, any>) =>
  useCallback(makeStyles(styles), [])({});
