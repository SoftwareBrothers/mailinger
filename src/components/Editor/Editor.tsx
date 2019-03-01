import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import Grid from '@material-ui/core/Grid';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { mailContent } from 'src/seeds/mail';

import React from 'react';
import { ISpreadsheet } from 'src/types/spreadsheet';
import DrivePicker from '../DrivePicker';
import DynamicVariables from './DynamicVariables';

const Editor = () => {
  const [spreadsheet, setSpreadsheet] = React.useState();
  const [preview, setPreview] = React.useState('');
  let content = mailContent;
  function update(_: any, editor: any) {
    content = editor.getData();

    // setPreview()
    setPreview(content.replace(/\[(.*?)\]/g, (match, p1) => {
      if (!!spreadsheet) {
        return spreadsheet.usersData[0][p1]
      }
      return p1;
    }))
  }

  return (
    <div style={{ padding: 20 }}>
      <SpreadsheetCtx.Provider value={[spreadsheet, setSpreadsheet]}>
        <Grid>
          <DynamicVariables />
          <CKEditor editor={ClassicEditor} data={content} onChange={update} />
        </Grid>
        <h3>Preview</h3>
        <code>{ preview }</code>
      </SpreadsheetCtx.Provider>
    </div>
  );
};

export default Editor;
