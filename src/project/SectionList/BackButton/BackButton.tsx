import React from 'react';
import {color} from '../../../shared/utils/styles';
import Icon from '../../../shared/components/icon/Icon';
import {BackButtonDiv} from './Styles';
import {Button} from 'react-bootstrap';

export interface BackButton {
    disabled: boolean,
}

export const BackButton = (props: BackButton) => {
  return (
    <BackButtonDiv>
      <Button variant="backgroundLightPrimary" hidden={props.disabled}>
        <Icon type="back" size={15} top={3} color={color.get('primary')}/>
      </Button>
    </BackButtonDiv>
  );
};
