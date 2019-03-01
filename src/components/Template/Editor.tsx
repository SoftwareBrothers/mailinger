import Grid from '@material-ui/core/Grid';
import 'easymde/dist/easymde.min.css';
import React from 'react';
import SimpleMDE from 'react-simplemde-editor';

const Editor = () => {
  const [input, setInput] = React.useState('Marek *jest* super');
  function setValue(value: string) {
    setInput(value);
  }
  return (
    <div style={{ padding: 20 }}>
      <Grid>
        <SimpleMDE
          onChange={setValue}
          value={input}
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
