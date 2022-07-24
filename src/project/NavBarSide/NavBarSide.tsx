import React from 'react';
import {Divider, ProjectInfo, Sidebar} from './NavBarSideStyles';
import {Icon} from '../../shared/components';
import {IProject} from '../interfaces/IProject';
import {DropDownButton} from './DropDownButton/DropDownButton';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Item} from '../NavBarTop/NavBarTopStyles';
import {color} from '../../shared/utils/styles';
import {SectionList} from '../SectionList';
import {ISections} from '../interfaces/ISections';


export interface INavBarSideProps {
    projects: IProject[];
    setProjects: any;
    projectCreateModalHelpers: any;
    projectConfigModalHelpers: any;
    id: string | undefined;
    setSelectedProject: any;
    selectedProject: IProject | null;
    selectedSection: ISections | null;
    setSelectedSection: any;
}

export const NavBarSide = (props: INavBarSideProps) => {
  const additionToolTip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
            Create a new project
    </Tooltip>
  );

  const configureToolTip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
        Configure project
    </Tooltip>
  );

  return (
    <Sidebar>
      <ProjectInfo>
        <DropDownButton {...{...props}}/>
        <OverlayTrigger
          placement="bottom"
          delay={{show: 250, hide: 400}}
          overlay={additionToolTip}>
          <Item onClick={props.projectCreateModalHelpers.open}>
            <Icon type="create" size={25} top={3} color={color.get('primary')}/>
          </Item>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{show: 250, hide: 400}}
          overlay={configureToolTip}>
          <Item onClick={props.projectConfigModalHelpers.open}>
            <Icon type="config" size={25} top={3} color={color.get('primary')}/>
          </Item>
        </OverlayTrigger>
      </ProjectInfo>

      <Divider />
      <SectionList sections={props.selectedProject?.sections} selectedSection={props.selectedSection} setSelectedSection={props.setSelectedSection}/>
    </Sidebar>
  );
};
