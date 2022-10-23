import React from 'react';


import 'quill/dist/quill.snow.css';
import {EditorContainer} from './DocxEditorStyles';
import Editor, {IEditorProps} from './Editor/Editor';
import {IProject} from '../../interfaces/IProject';
import {ISections} from '../../interfaces/ISections';

export interface IDocxEditor {
  selectedProject: IProject | null;
  selectedSection: ISections | null;
  zoom: number;
}

const DocxEditor = (props: IDocxEditor) => {
  const editorProps: IEditorProps = {
    zoom: props.zoom,
    project: props.selectedProject,
    selectedSection: props.selectedSection,
  };


  return (
    <EditorContainer>
      <Editor {...editorProps}/>
    </EditorContainer>
  );
};

export default DocxEditor;
