import { EmailData } from 'context/email';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import React, { memo, useState } from 'react';
import { Editor as Wysiwyg } from 'react-draft-wysiwyg';

interface OwnProps {
  readonly item: EmailData;
  readonly updater: (data: any) => void;
}

type Props = OwnProps;

const options = ['fontSize', 'fontFamily', 'list', 'textAlign'];
const EmailEditor = ({ item, updater }: Props) => {
  const [editor, setEditor] = useState(
    EditorState.createWithContent(stateFromHTML(item.content)),
  );

  const onChange = (data: any) => {
    item.content = stateToHTML(data.getCurrentContent());
    setEditor(data);
    updater(item);
  };

  return (
    <Wysiwyg
      editorState={editor}
      onEditorStateChange={onChange}
      toolbar={{ options }}
    />
  );
};

export default memo(EmailEditor);
