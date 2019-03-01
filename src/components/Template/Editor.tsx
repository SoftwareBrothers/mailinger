import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'easymde/dist/easymde.min.css';
import React from 'react';
import SimpleMDE from 'react-simplemde-editor';

const Editor = () => {
  const [content, setContent] = React.useState('');
  const [variables] = React.useState<string[]>(['name', 'last_name', 'amount']);
  function setValue(value: string) {
    setContent(value);
  }
  return (
    <div style={{ padding: 20 }}>
      <Grid>
        {variables.length ? (
          <Paper style={{ padding: 20, margin: '20px 0' }}>
            <Typography variant="button" gutterBottom={true}>
              {'Available variables: '}
            </Typography>
            <hr />
            {variables.map(variable => (
              <Chip label={variable} style={{ margin: 5 }} />
            ))}
          </Paper>
        ) : null}
        <SimpleMDE
          onChange={setValue}
          value={content}
          options={{
            autofocus: true,
            spellChecker: true,
          }}
        />
      </Grid>
    </div>
  );
};

export default Editor;
