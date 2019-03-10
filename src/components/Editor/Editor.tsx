import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import React, { memo, useContext, useState } from 'react';
import { Editor as Wysiwyg } from 'react-draft-wysiwyg';
import { SpreadsheetCtx } from '../../contexts/spreadsheet.context';
import { useStyles } from '../../hooks/useStyles';
import DynamicVariables from './DynamicVariables';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { MailTemplateCtx } from '../../contexts/mail-template.context';

import { replaceVars } from '../utils';

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
});

const Editor = () => {
  const [mailTemplate, setMailTemplate] = useContext(MailTemplateCtx);
  const [spreadsheet] = useContext(SpreadsheetCtx);
  const [editor, setEditor] = useState(
    EditorState.createWithContent(stateFromHTML(mailTemplate)),
  );
  const [preview, setPreview] = useState(
    replaceVars(mailTemplate, spreadsheet.usersData[0]),
  );
  const classes = useStyles(styles);

  const onChange = (data: any) => {
    setEditor(data);
    setMailTemplate(stateToHTML(data.getCurrentContent()));
    setPreview(
      replaceVars(
        stateToHTML(data.getCurrentContent()),
        spreadsheet.usersData[0],
      ),
    );
  };

  const options = ['fontSize', 'fontFamily', 'list', 'textAlign'];

  return (
    <div className={classes.root}>
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
