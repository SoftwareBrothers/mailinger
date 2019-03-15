import { Theme } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { memo, useContext } from 'react';
import { SpreadsheetCtx } from '../../contexts/spreadsheet.context';
import { useStyles } from '../../hooks/useStyles';

const styles = (theme: Theme) => ({
  chip: {
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  paper: {
    margin: `${theme.spacing.unit} 0`,
    padding: theme.spacing.unit,
  },
});

const DynamicVariables = () => {
  const { spreadsheet } = useContext(SpreadsheetCtx);
  const classes = useStyles(styles);
  const variables: string[] = (spreadsheet && spreadsheet.variables) || [];

  if (!variables.length) {
    return null;
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="button" gutterBottom={true}>
        {'Available variables: '}
      </Typography>
      {variables.map(variable => (
        <Chip
          key={`chip-${variable}`}
          label={variable}
          className={classes.chip}
        />
      ))}
    </Paper>
  );
};

export default memo(DynamicVariables);
