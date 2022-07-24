import React from 'react';
import {IProject} from '../interfaces/IProject';
import Form from '../../shared/components/Form';
import {ActionButton, Actions, Divider, FormHeading, FormElement} from './Styles';
import {genreOptions, renderType} from './ProjectCreate';
import {GenreType} from '../../shared/constants/Projects';
import toast from '../../shared/utils/toast';
import {useRequest} from '../../shared/hooks/useHttp';
import {MsConfig} from '../../config/MsConfig';

const ProjectConfig = (props: {project: IProject, projects: IProject[], setProjects: any, modalClose: () => void, setSelectedProject: any}) => {
  const {isLoading: configuring, error: updateError, sendRequest: sendPut} = useRequest();
  const {isLoading: deleting, error: deleteError, sendRequest: sendDelete} = useRequest();

  const {project, modalClose} = props;
  // @ts-ignore
  const genreType = GenreType[project.genre];

  const url = `${MsConfig.projectsPath}/${project._id}`;
  const projectHandle = props.projects;

  const deleteProject = async () => {
    await sendDelete({url, method: 'DELETE', body: null}, () => {});
    if (deleteError) {
      toast.error('Failed to delete project!');
    } else {
      const newProjects: IProject[] = [];
      projectHandle.forEach((projectH) => {
        if (!(projectH._id===project._id)) {
          newProjects.push(projectH);
        }
      });
      toast.success('Project deleted successfully');
      modalClose();
      props.setProjects(newProjects);
      props.setSelectedProject((newProjects.length>0) ? newProjects[0] : null);
    }
  };

  const updateProject = async (values: { genre: string, title: string, description: string }, form: any) => {
    // @ts-ignore
    values.genre = Object.keys(GenreType).find((k) => GenreType[k] === values.genre);
    await sendPut({url, method: 'PUT', body: values}, (updatedProject) => {
      const newProjects: IProject[] = [];
      projectHandle.forEach((projectH) => {
        if ((projectH._id===project._id)) {
          newProjects.push(updatedProject);
        } else {
          newProjects.push(projectH);
        }
      });
      props.setSelectedProject(updatedProject);
      props.setProjects(newProjects);
    });
    if (updateError) {
      toast.error('Failed to delete project!');
    } else {
      toast.success('Project updated successfully');
      modalClose();
    }
  };

  return (
    <Form
      enableRinitialize
      initialValues={{
        title: project.title,
        genre: genreType,
        description: project.description,
      }}
      validations={{
        genre: Form.is.required(),
        title: [Form.is.required(), Form.is.maxLength(200)],
      }}
      onSubmit={updateProject}
    >
      <FormElement>
        <FormHeading>{project.title}</FormHeading>
        <Form.Field.Select
          name="genre"
          label="Game genre"
          tip="Select the genre of the game. It's genre come with it's own template for the design document"
          options={genreOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Divider />
        <Form.Field.Input
          name="title"
          label="Title"
          tip="Update the title of the project"
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Update the description of your game"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={configuring}>
                  Update Project
          </ActionButton>
          <ActionButton type="button" variant="danger" isWorking={deleting} onClick={deleteProject}>
                  Delete Project
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

export default ProjectConfig;
