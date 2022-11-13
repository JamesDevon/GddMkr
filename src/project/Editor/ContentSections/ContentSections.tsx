import React from 'react';

import {ISections} from '../../interfaces/ISections';
import {ContentTypeEnum} from '../../../enums/ContentType.enum';
import DocxEditor from '../DocxEditor/DocxEditor';
import {IProject} from '../../interfaces/IProject';
import {IZoomProps} from '../DocxEditor/Zoom/Zoom';

export interface ContentSectionsProps {
  section: ISections | null;
  project: IProject | null;
  zoom: IZoomProps;
}

export const ContentSections = (props: ContentSectionsProps) => {
  const editorTypeMap = (section: ISections | null): Array<JSX.Element> => {
    const returnArray: Array<JSX.Element> = [];
    if (!section) return returnArray;
    switch (section?.type) {
      case ContentTypeEnum.DropDown:
        break;
      case ContentTypeEnum.MultiSelect:
        break;
      case ContentTypeEnum.FreeText:
        returnArray.push(<DocxEditor key={section.title} selectedProject={props.project} selectedSection={section} zoom={props.zoom.zoom}/>);
    }

    return returnArray;
  };

  return (
    <div>
      <hr/>
      <h2>{props.section?.title}</h2>
      {editorTypeMap(props.section)}
      {props.section?.subSections?.map((subSection) =>
        <div key={subSection._id}>
          <ContentSections key={subSection._id} section={subSection} project={props.project} zoom={props.zoom}/>
        </div>)}
    </div>
  );
};
