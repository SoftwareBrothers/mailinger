import Grid from '@material-ui/core/Grid';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { mailContent } from 'src/seeds/mail';

import React from 'react';
import DynamicVariables from './DynamicVariables';

import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const replaceVars = (input: string, spreadsheet: any) => {
  return input.replace(/\[(.*?)\]/g, (match, p1) => {
    if (spreadsheet && spreadsheet.usersData) {
      return spreadsheet.usersData[0][p1];
    }
    return match;
  });
};

const editor = () => {
  const [spreadsheet, setSpreadsheet] = React.useContext(SpreadsheetCtx);
  const [editor, setEditor] = React.useState(
    EditorState.createWithContent(stateFromHTML(mailContent)),
  );
  const [preview, setPreview] = React.useState(
    replaceVars(mailContent, spreadsheet),
  );

  const onChange = (data: any) => {
    setEditor(data);
    setPreview(replaceVars(stateToHTML(data.getCurrentContent()), spreadsheet));
  };

  const options = ['fontSize', 'fontFamily', 'list', 'textAlign'];

  return (
    <div style={{ padding: 20 }}>
      <Grid>
        <DynamicVariables />
        <Editor
          editorState={editor}
          onEditorStateChange={onChange}
          toolbar={{
            options,
          }}
        />
      </Grid>
      <h3>Preview</h3>
      <div dangerouslySetInnerHTML={{ __html: preview }} />
    </div>
  );
};

export default editor;
