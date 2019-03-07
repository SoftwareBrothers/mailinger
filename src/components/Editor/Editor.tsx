import Grid from '@material-ui/core/Grid';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import React, {memo} from 'react';
import { Editor as Wysiwyg } from 'react-draft-wysiwyg';
import {SpreadsheetCtx} from "../../contexts/spreadsheet.context";
import {mailContent} from "../../seeds/mail";
import DynamicVariables from './DynamicVariables';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const replaceVars = (input: string, spreadsheet: any) => {
  return input.replace(/\[(.*?)\]/g, (match, p1) => {
    if (spreadsheet && spreadsheet.usersData) {
      return spreadsheet.usersData[0][p1];
    }
    return match;
  });
};

const Editor = () => {
  const [spreadsheet] = React.useContext(SpreadsheetCtx);
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
        <Wysiwyg
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

export default memo(Editor);
