import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import Grid from '@material-ui/core/Grid';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { mailContent } from 'src/seeds/mail';

import React, { Component } from 'react';
import { ISpreadsheet } from 'src/types/spreadsheet';
import DrivePicker from '../DrivePicker';
import DynamicVariables from './DynamicVariables';

import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorV2 extends Component {
  public state = {
    spreadsheet: {},
    editor: EditorState.createWithContent(stateFromHTML(mailContent)),
    preview: mailContent,
  } as { spreadsheet: ISpreadsheet, editor: any, preview: string }
  
  constructor(props: any)  {
    super(props);
    this.setSpreadsheet = this.setSpreadsheet.bind(this);
    this.updateEdit = this.updateEdit.bind(this);
  }

  public updateEdit(data: any) {
    this.setState({ 
      editor: data,
      preview: stateToHTML(data.getCurrentContent()).replace(/\[(.*?)\]/g, (match, p1) => {
        if (this.state.spreadsheet && this.state.spreadsheet.usersData) {
          return this.state.spreadsheet.usersData[0][p1]
        }
        return match;
      })
    })
  }

  public setSpreadsheet(data: any) {
    this.setState({
      spreadsheet: data
    })
    this.updateEdit(this.state.editor)
    
  }

  public render() {
    return (
      <div style={{ padding: 20 }}>
        <SpreadsheetCtx.Provider value={[this.state.spreadsheet, this.setSpreadsheet]}>
          <DrivePicker />
          <Grid>
            <DynamicVariables />
            <Editor
              editorState={this.state.editor}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="lepszy-edytor-wrapper"
              onEditorStateChange={this.updateEdit}
            />
          </Grid>
          <h3>Preview</h3>
          <div dangerouslySetInnerHTML={ { __html: this.state.preview }} />
        </SpreadsheetCtx.Provider>
      </div>
    )
  }
}

export default EditorV2
