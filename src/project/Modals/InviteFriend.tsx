import React, {useEffect} from 'react';
import Form from '../../shared/components/Form';
import {ActionButton, Actions, FormHeading, FormElement} from './Styles';
import {useRequest} from '../../shared/hooks/useHttp';
import {MsConfig} from '../../config/MsConfig';
import {useParams} from 'react-router-dom';
import toast from '../../shared/utils/toast';
import StatusCode from 'status-code-enum';

export const InviteFriend = (props : {modalClose: any}) => {
  const {id} = useParams();
  const {isLoading: inviting, error, sendRequest} = useRequest();

  const inviteFriend = async (values : {email: string}) => {
    await sendRequest({
      url: `${MsConfig.projectsPath}/${id}/invite`,
      method: 'POST',
      body: {
        email: values.email,
      }}, (data, status) => {
      props.modalClose();
      if (status == StatusCode.SuccessOK) {
        toast.success('Your friend now has access to the project!');
      } else if (status == StatusCode.SuccessAlreadyReported) {
        toast.success('Friend already invited!');
      } else {
        toast.error('Inviting friend failed! Is your friend sign up on GDD Maker ?');
      }
    });
  };

  useEffect(() => {
    if (error) {
      toast.error('Inviting friend failed due to system error!');
    }
  }, [error]);

  return (
    <Form
      enableRinitialize
      initialValues={{
        email: '',
      }}
      validations={{
        email: Form.is.email,
      }}
      onSubmit={inviteFriend}
    >
      <FormElement>
        <FormHeading>Invite A Friend to join the project</FormHeading>
        <Form.Field.Input
          name="email"
          label="Email"
          tip="Enter the email of your friend"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={inviting} >
                  Invite
          </ActionButton>
          <ActionButton type="button" variant="danger" onClick={props.modalClose}>
                  Close
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};
