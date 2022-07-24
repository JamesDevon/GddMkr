import React, {useState} from 'react';


import 'quill/dist/quill.snow.css';
import {EditorContainer} from './DocxEditorStyles';
import Editor, {IEditorProps} from './Editor/Editor';
import Zoom, {IZoomProps} from './Zoom/Zoom';
import {IProject} from '../interfaces/IProject';
import {ISections} from '../interfaces/ISections';

export interface IDocxEditor {
  selectedProject: IProject | null;
  selectedSection: ISections | null;
}

const DocxEditor = (props: IDocxEditor) => {
  const [zoom, setZoom] = useState<number>(100);

  const editorProps: IEditorProps = {
    zoom,
    project: props.selectedProject,
    selectedSection: props.selectedSection,
  };

  const zoomProps: IZoomProps = {
    zoom,
    setZoom,
    step: 10,
  };

  return (
    <EditorContainer>
      <Editor {...editorProps}/>
      <Zoom {...zoomProps}/>
    </EditorContainer>
  );
};

export default DocxEditor;
