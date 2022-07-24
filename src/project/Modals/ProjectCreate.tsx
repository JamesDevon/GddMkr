import React, {useState} from 'react';

import {GenreType, GenreTypeCopy} from '../../shared/constants/Projects';
import toast from '../../shared/utils/toast';
import Form from '../../shared/components/Form';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from './Styles';
import IssueTypeIcon from '../../shared/components/IssueTypeIcon';
import {IProject} from '../interfaces/IProject';
import {ProjectService} from '../../service/api/projects/ProjectService';
import {IReturn} from '../../service/api/interfaces/IReturn';

const ProjectCreate = ({fetchProject, modalClose}: any) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const createProject = async (values: { type: string, title: string, description: string }) : Promise<IReturn<Partial<IProject>>> => {
    setIsCreating(true);
    const newProject : Partial<IProject> = {
      // @ts-ignore
      genre: Object.keys(GenreType).find((k) => GenreType[k] === values.type),
      title: values.title,
      description: values.description,
    };
    const result = await ProjectService.createProject(newProject);
    setIsCreating(false);
    return result;
  };


  return (
    <Form
      enableReinitialize
      initialValues={{
        type: GenreType.FPS,
        title: '',
        description: '',
      }}
      validations={{
        type: Form.is.required(),
        title: [Form.is.required(), Form.is.maxLength(200)],
      }}
      onSubmit={async (values: any, form: any) => {
        const {success, msg, data} = await createProject(values);
        if (success) {
          toast.success(msg);
          modalClose();
          await fetchProject(data);
        } else {
          Form.handleAPIError(msg, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Project</FormHeading>
        <Form.Field.Select
          name="type"
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
          tip="Enter the title of the game"
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the game in as much detail as you'd like."
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
                        Create Project
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
                        Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

export const genreOptions = Object.values(GenreType).map((type) => ({
  value: type,
  label: GenreTypeCopy[type],
}));

export const renderType = ({value: type}: any) => (
  <SelectItem withBottomMargin={undefined}>
    <IssueTypeIcon type={type} top={1} />
    <SelectItemLabel>{GenreTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
);


export default ProjectCreate;
