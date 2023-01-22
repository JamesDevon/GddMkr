import React, {useEffect, useState} from 'react';
import {ProjectPageStyles} from './ProjectPageStyles';
import {INavBarTop, NavBarTop} from './NavBarTop/NavBarTop';
import {UpperBar} from './UpperBar/UpperBar';
import {INavBarSideProps, NavBarSide} from './NavBarSide/NavBarSide';
import {IProject} from './interfaces/IProject';
import Modal from '../shared/components/Modal/Modal';
import ProjectCreate from './Modals/ProjectCreate';
import {FrontConfig} from '../config/FrontConfig';
import {useNavigate} from 'react-router-dom';
import ProjectConfig from './Modals/ProjectConfig';
import {InviteFriend} from './Modals/InviteFriend';
import {Editor, EditorProps} from './Editor/Editor';
import {findSection} from './SectionList/utils/findSection';

export interface IProjectPageProps {
    projects: IProject[];
    setProjects: any;
    projectCreateModalHelpers: any;
    projectConfigModalHelpers: any;
    inviteFriendModalHelpers: any;
    id: string | undefined;
}

export const ProjectsPage = (props: IProjectPageProps) => {
  const sProject: IProject | undefined = props.projects.find((pr) => pr._id == props.id);
  const [selectedProject, setSelectedProject] = useState<IProject | null>((sProject) ? sProject : null);
  const [sectionPath, setSectionPath] = useState<Array<number>>([]);


  const section = (selectedProject?.sections != null) ? findSection(selectedProject?.sections, sectionPath) : null;
  const [selectedSection, setSelectedSection] = useState(section);

  useEffect(() => {
    setSelectedSection((selectedProject?.sections != null) ? findSection(selectedProject?.sections, sectionPath) : null);
  }, [sectionPath, selectedProject]);

  const navBarProps : INavBarSideProps = {
    ...props,
    setSelectedProject,
    selectedProject,
    selectedSection,
    sectionPath,
    setSectionPath,
  };

  const navBarTopProps : INavBarTop = {
    inviteFriendModalHelpers: props.inviteFriendModalHelpers,
  };

  const editorProps: EditorProps = {
    selectedProject,
    selectedSection,
    setSelectedProject,
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProject == null) {
      navigate(FrontConfig.app);
    } else if (window.location.pathname != `${FrontConfig.app}/${selectedProject._id}`) {
      navigate(`${FrontConfig.app}/${selectedProject._id}`);
    }
  }, [selectedProject]);

  return (
    <ProjectPageStyles>
      <NavBarTop {...navBarTopProps}/>
      <UpperBar/>
      <NavBarSide {...navBarProps}/>
      {selectedProject && selectedSection && (<Editor {...editorProps}/>)}
      {props.projectCreateModalHelpers.isOpen() && (
        <Modal
          isOpen
          testId="modal:project-create"
          variant='center'
          width={800}
          withCloseIcon={false}
          onClose={props.projectCreateModalHelpers.close}
          renderContent={() => (
            <ProjectCreate
              fetchProject={async (newProject: IProject) => {
                props.setProjects([...props.projects, newProject]);
                setSelectedProject(newProject);
              }}
              modalClose={props.projectCreateModalHelpers.close}
            />
          )}
        />
      )}
      {props.projectConfigModalHelpers.isOpen() && selectedProject != null && (
        <Modal
          isOpen
          testId="modal:project-config"
          variant='center'
          width={800}
          withCloseIcon={false}
          onClose={props.projectConfigModalHelpers.close}
          renderContent={() => (
            <ProjectConfig
              project={selectedProject}
              setSelectedProject={setSelectedProject}
              projects={props.projects}
              setProjects={props.setProjects}
              modalClose={props.projectConfigModalHelpers.close}
            />
          )}
        />
      )}
      {props.inviteFriendModalHelpers.isOpen() && selectedProject != null && (
        <Modal
          isOpen
          testId="modal:invite-friend"
          variant='center'
          width={800}
          withCloseIcon={false}
          onClose={props.inviteFriendModalHelpers.close}
          renderContent={() => (
            <InviteFriend
              modalClose={props.inviteFriendModalHelpers.close}
            />
          )}
        />
      )}
    </ProjectPageStyles>
  );
};
