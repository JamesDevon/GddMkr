import React, {useEffect, useState} from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import {IProject} from '../../interfaces/IProject';
import {DropDownButtonStyles} from './DropDownButtonStyles';

interface IDropDownButtonProps {
  projects: IProject[],
  selectedProject: IProject | null,
  setSelectedProject: (value: (((prevState: (IProject | null)) => (IProject | null)) | IProject | null)) => void,
}

export const DropDownButton = (props: IDropDownButtonProps) => {
  const {projects, selectedProject, setSelectedProject} = props;
  const [buttonTitle, setButtonTitle] = useState<string>((selectedProject) ? selectedProject.title : 'You haven\'t created a projects yet');

  useEffect(() => {
    setButtonTitle((selectedProject) ? selectedProject.title : 'You haven\'t created a projects yet');
  }, [selectedProject]);

  const handleSelection = (e: React.MouseEvent) => {
    const sProject: IProject = projects.filter((project) => project._id===(e.target as HTMLButtonElement).id)[0];
    setSelectedProject(sProject);
    setButtonTitle(sProject.title);
  };

  return (
    <DropDownButtonStyles>
      <DropdownButton id="dropdown-item-button" title={buttonTitle}>
        {
            (projects) ?
                projects.map((project) => <Dropdown.Item key={project._id} as="button" onClick={handleSelection} id={project._id}>{project.title}</Dropdown.Item>) :
                <Dropdown.Item key="null" as="button">{'Create a new project'}</Dropdown.Item>
        }
      </DropdownButton>
    </DropDownButtonStyles>

  );
};
