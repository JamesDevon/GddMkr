import React from 'react';
import {MultiselectContent} from '../../../../interfaces/MultiSelectContent';
import Form from '../../../../shared/components/Form';
import {ActionButton, Actions, Divider, FormElement} from '../../../Modals/Styles';

export const MultiSelectItemEditor = (props: {item: MultiselectContent, update: any, delete: (id: string) => void}) => {
  const {item} = props;

  return (
    <Form
      enableReinitialize
      initialValues={{
        id: item.id,
        title: item.title,
        description: item.description,
      }}
      onSubmit={async (values: {title: string, description: string}) => {
        props.update(values);
      }}
    >
      <FormElement>
        <Form.Field.Input
          name="title"
        />
        <Divider />
        <Form.Field.TextEditor
          name="description"
          label="Description"
        />
        <Actions>
          <ActionButton type="submit" variant="primary">
              Save
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={() => props.delete(item.id)}>
              Delete
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};
