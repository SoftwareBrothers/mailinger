import { Theme } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { SpreadsheetCtx } from 'context/spreadsheet.context';
import { useStyles } from 'hooks/useStyles';
import React, { memo, useContext } from 'react';

const styles = (theme: Theme) => ({
  chip: {
    marginBottom: `${theme.spacing(1)}px`,
    marginRight: `${theme.spacing(1)}px`,
    marginTop: `${theme.spacing(1)}px`,
  },
  paper: {
    margin: `${theme.spacing(1)}px 0`,
    padding: `${theme.spacing(1)}px`,
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
