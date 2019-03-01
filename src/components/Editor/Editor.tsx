import Grid from '@material-ui/core/Grid';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { mailContent } from 'src/seeds/mail';

import React, { Component } from 'react';
import { ISpreadsheet } from 'src/types/spreadsheet';
import DynamicVariables from './DynamicVariables';

import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const replaceVars = (input: string, spreadsheet: any) => {
    return input.replace(/\[(.*?)\]/g, (match, p1) => {
      if (spreadsheet && spreadsheet.usersData) {
        return spreadsheet.usersData[0][p1]
      }
      return match;
    })
  }

const editor = () => {
  const [spreadsheet, setSpreadsheet] = React.useContext(SpreadsheetCtx);
  const [editor, setEditor] = React.useState(EditorState.createWithContent(stateFromHTML(mailContent)));
  const [preview, setPreview] = React.useState(replaceVars(mailContent, spreadsheet));

  const onChange = (data: any) => {
      // editor: data,
      setEditor(data);
      setPreview(
        replaceVars(stateToHTML(data.getCurrentContent()), spreadsheet)
      )
  }

  const toolbarOptions = {
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
    embedded: { inDropdown: false}
  }

  return (
    <div style={{ padding: 20 }}>
      <Grid>
        <DynamicVariables />
        <Editor
          editorState={editor}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="lepszy-edytor-wrapper"
          onEditorStateChange={onChange}
          toolbar={toolbarOptions}
        />
      </Grid>
      <h3>Preview</h3>
      <div dangerouslySetInnerHTML={ { __html: preview }} />
    </div>
  )
}

export default editor;

// class EditorV2 extends Component {
//   public state = {
//     spreadsheet: {},
//     editor: EditorState.createWithContent(stateFromHTML(mailContent)),
//     preview: mailContent,
//   } as { spreadsheet: ISpreadsheet, editor: any, preview: string }
  
//   constructor(props: any) {
//     super(props);
//     this.setSpreadsheet = this.setSpreadsheet.bind(this);
//     this.updateEdit = this.updateEdit.bind(this);
//   }

//   public updateEdit(data: any) {
//     this.setState({ 
//       editor: data,
//       preview: stateToHTML(data.getCurrentContent()).replace(/\[(.*?)\]/g, (match, p1) => {
//         if (this.state.spreadsheet && this.state.spreadsheet.usersData) {
//           return this.state.spreadsheet.usersData[0][p1]
//         }
//         return match;
//       })
//     })
//   }

//   public setSpreadsheet(data: any) {
//     console.log(data);
//     this.setState({
//       spreadsheet: data
//     })
//     this.updateEdit(this.state.editor)
    
//   }

//   public render() {
//     return (
//       <div style={{ padding: 20 }}>
//         <Grid>
//           <DynamicVariables />
//           <Editor
//             editorState={this.state.editor}
//             toolbarClassName="toolbarClassName"
//             wrapperClassName="wrapperClassName"
//             editorClassName="lepszy-edytor-wrapper"
//             onEditorStateChange={this.updateEdit}
//           />
//         </Grid>
//         <h3>Preview</h3>
//         <div dangerouslySetInnerHTML={ { __html: this.state.preview }} />
//       </div>
//     )
//   }
// }

// export default EditorV2
