import React, {useState} from 'react';


import {IProject} from '../interfaces/IProject';
import {ISections} from '../interfaces/ISections';
import {ContentSections} from './ContentSections/ContentSections';
import {EditorContainer} from './EditorStyles';
import Zoom, {IZoomProps} from './DocxEditor/Zoom/Zoom';

export interface EditorProps {
  selectedProject: IProject | null;
  selectedSection: ISections | null;
}

export const Editor = (props: EditorProps) => {
  const [zoom, setZoom] = useState<number>(100);

  const zoomProps: IZoomProps = {
    zoom,
    setZoom,
    step: 10,
  };

  return (
    <EditorContainer>
      <Zoom {...zoomProps}/>
      <ContentSections section={props.selectedSection} project={props.selectedProject} zoom={zoomProps}/>
    </EditorContainer>
  );
};
