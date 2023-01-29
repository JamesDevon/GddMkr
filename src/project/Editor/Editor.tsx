import React, {useState} from 'react';


import {IProject} from '../interfaces/IProject';
import {ISections} from '../interfaces/ISections';
import {ContentSections} from './ContentSections/ContentSections';
import {EditorContainer} from './EditorStyles';
import Zoom, {IZoomProps} from './DocxEditor/Zoom/Zoom';
import {ContentTypeEnum} from '../../enums/ContentType.enum';

export interface EditorProps {
  selectedProject: IProject | null;
  selectedSection: ISections<any> | null;
  setSelectedProject: any;
}

export const Editor = (props: EditorProps) => {
  const [zoom, setZoom] = useState<number>(100);

  const zoomProps: IZoomProps = {
    zoom,
    setZoom,
    step: 10,
    visible: props.selectedSection?.type == ContentTypeEnum.FreeText,
  };

  return (
    <EditorContainer>
      <Zoom {...zoomProps}/>
      <ContentSections section={props.selectedSection} project={props.selectedProject} zoom={zoomProps} setSelectedProject={props.setSelectedProject}/>
    </EditorContainer>
  );
};
