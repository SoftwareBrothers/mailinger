import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import Grid from '@material-ui/core/Grid';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { mailContent } from 'src/seeds/mail';

import React, { Component } from 'react';
import { EditorContentCtx } from 'src/contexts/edit-content.context';
import DrivePicker from '../DrivePicker';
import DynamicVariables from './DynamicVariables';

class EditorV2 extends Component {
  public state = {
    spreadsheet: null,
    preview: ''
  }
  
  constructor(props: any)  {
    super(props);
    this.update = this.update.bind(this);
  }

  public update(_: any, editor: any) {
    console.log(editor.getData());
    // this.setState({
    //   preview: editor.getData()
    // })
  }

  public render() {
    return (
      <div style={{ padding: 20 }}>
        <SpreadsheetCtx.Provider value={[this.state.spreadsheet]}>
          <DrivePicker />
          <Grid>
            <DynamicVariables />
            <CKEditor editor={ClassicEditor} onChange={this.update} />
          </Grid>
          <h3>Preview</h3>
          <code>{ this.state.preview }</code>
        </SpreadsheetCtx.Provider>
      </div>
    )
  }
}

export default EditorV2

// const Editor = () => {
//   const [spreadsheet, setSpreadsheet] = React.useState();
//   const [preview, setPreview] = React.useState('');
//   console.log('Editor');
//   const content = mailContent;
//   function update(_: any, editor: any) {
//     setPreview(editor.getData())
//     // setContent(editor.getData());

//     // setPreview(content);
//     // setPreview(content.replace(/\[(.*?)\]/g, (match, p1) => {
//     //   if (!!spreadsheet) {
//     //     return spreadsheet.usersData[0][p1]
//     //   }
//     //   return p1;
//     // }))
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <SpreadsheetCtx.Provider value={[spreadsheet, setSpreadsheet]}>
//         <DrivePicker />
//         <Grid>
//           <DynamicVariables />
//           <CKEditor editor={ClassicEditor} data={mailContent} onChange={update} />
//         </Grid>
//         <h3>Preview</h3>
//         <code>{ preview }</code>
//       </SpreadsheetCtx.Provider>
//     </div>
//   );
// };

// export default Editor;
