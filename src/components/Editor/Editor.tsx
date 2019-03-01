import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import Grid from '@material-ui/core/Grid';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { mailContent } from 'src/seeds/mail';

import React from 'react';
import DrivePicker from '../DrivePicker';
import DynamicVariables from './DynamicVariables';

const Editor = () => {
  const [spreadsheet, setSpreadsheet] = React.useState(null);
  let content = mailContent;
  function update(_: any, editor: any) {
    content = editor.getData();
  }

  return (
    <div style={{ padding: 20 }}>
      <SpreadsheetCtx.Provider value={[spreadsheet, setSpreadsheet]}>
        <DrivePicker />
        <Grid>
          <DynamicVariables />
          <CKEditor editor={ClassicEditor} data={content} onChange={update} />
        </Grid>
      </SpreadsheetCtx.Provider>
    </div>
  );
};

export default Editor;
