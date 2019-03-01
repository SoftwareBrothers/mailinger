import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';

const DynamicVariables = () => {
  const [spreadsheet] = React.useContext(SpreadsheetCtx);
  const variables: string[] = (spreadsheet && spreadsheet.variables) || ['imie', 'miesiac', 'kwota_netto'];

  if (!variables.length) {
    return null;
  }
  return (
    <Paper style={{ padding: 20, margin: '20px 0' }}>
      <Typography variant="button" gutterBottom={true}>
        {'Available variables: '}
      </Typography>
      {variables.map(variable => (
        <Chip
          key={`chip-${variable}`}
          label={variable}
          style={{ marginRight: 10 }}
        />
      ))}
    </Paper>
  );
};

export default DynamicVariables;
