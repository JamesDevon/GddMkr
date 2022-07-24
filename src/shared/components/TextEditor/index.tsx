import React, {useLayoutEffect, useRef} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import {EditorCont} from './Styles';


const defaultProps = {
  className: undefined,
  placeholder: undefined,
  defaultValue: undefined,
  value: undefined,
  onChange: () => {},
  getEditor: () => {},
};

const TextEditor = ({
  className,
  placeholder,
  defaultValue,
  // we're not really feeding new value to quill instance on each render because it's too
  // expensive, but we're still accepting 'value' prop as alias for defaultValue because
  // other components like <Form.Field> feed their children with data via the 'value' prop
  value: alsoDefaultValue,
  onChange,
  getEditor,
}: any) => {
  const $editorContRef : React.MutableRefObject<any>= useRef();
  const $editorRef : React.MutableRefObject<any> = useRef();
  const initialValueRef : React.MutableRefObject<any> = useRef(defaultValue || alsoDefaultValue || '');

  useLayoutEffect(() => {
    let quill : Quill | null = new Quill($editorRef.current, {placeholder, ...quillConfig});

    const insertInitialValue = () => {
      quill?.clipboard.dangerouslyPasteHTML(0, initialValueRef.current);
      quill?.blur();
    };
    const handleContentsChange = () => {
      onChange(getHTMLValue());
    };
    const getHTMLValue = () => $editorContRef.current.querySelector('.ql-editor').innerHTML;

    insertInitialValue();
    getEditor({getValue: getHTMLValue});

    quill.on('text-change', handleContentsChange);
    return () => {
      quill?.off('text-change', handleContentsChange);
      quill= null;
    };
  }, []);

  return (
    <EditorCont className={className} ref={$editorContRef}>
      <div ref={$editorRef} />
    </EditorCont>
  );
};

const quillConfig = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{list: 'ordered'}, {list: 'bullet'}],
      [{header: [1, 2, 3, 4, 5, 6, false]}],
      [{color: []}, {background: []}],
      ['clean'],
    ],
  },
};

TextEditor.defaultProps = defaultProps;

export default TextEditor;
