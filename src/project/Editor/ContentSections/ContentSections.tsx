import React from 'react';

import {ISections} from '../../interfaces/ISections';
import {ContentTypeEnum} from '../../../enums/ContentType.enum';
import DocxEditor from '../DocxEditor/DocxEditor';
import {IProject} from '../../interfaces/IProject';
import {IZoomProps} from '../DocxEditor/Zoom/Zoom';
import {MultiselectEditor} from '../MultiselectContent/MultiselectEditor';

export interface ContentSectionsProps {
  section: ISections | null;
  project: IProject | null;
  setSelectedProject: any;
  zoom: IZoomProps;
}

export const ContentSections = (props: ContentSectionsProps) => {
  const editorTypeMap = (section: ISections | null, project: IProject | null): Array<JSX.Element> => {
    const returnArray: Array<JSX.Element> = [];
    if (!section) return returnArray;
    switch (section?.type) {
      case ContentTypeEnum.DropDown:
        break;
      case ContentTypeEnum.MultiSelect:
        returnArray.push(<MultiselectEditor key={section.title} setSelectedProject={props.setSelectedProject} projectId={project!._id} sectionId={section._id} items={section.content}/>);
        break;
      case ContentTypeEnum.FreeText:
        returnArray.push(<DocxEditor key={section.title} selectedProject={props.project} selectedSection={section} zoom={props.zoom.zoom}/>);
        break;
    }

    return returnArray;
  };

  return (
    <div>
      <h2>{props.section?.title}</h2>
      <hr/>
      {editorTypeMap(props.section, props.project)}
      {props.section?.subSections?.map((subSection) =>
        <div key={subSection._id}>
          <ContentSections key={subSection._id} setSelectedProject={props.setSelectedProject} section={subSection} project={props.project} zoom={props.zoom}/>
        </div>)}
    </div>
  );
};
