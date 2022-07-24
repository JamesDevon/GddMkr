import styled, {css} from 'styled-components';

import {color, font} from '../../utils/styles';
import Icon from '../icon/Icon';

export const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  height: 32px;
  width: 100%;
`;

export const InputElement = styled.input`
  height: 100%;
  width: 100%;
  padding: 0 7px;
  border-radius: 3px;
  border: 1px solid ${color.get('borderLightest')};
  color: ${color.get('textDarkest')};
  background: ${color.get('backgroundLightest')};
  transition: background 0.1s;
  ${font.regular}
  ${font.size(15)}
  ${(props: {hasIcon: boolean}) => props.hasIcon && 'padding-left: 32px;'}
  &:hover {
    background: ${color.get('backgroundLight')};
  }
  &:focus {
    background: #fff;
    border: 1px solid ${color.get('borderInputFocus')};
    box-shadow: 0 0 0 1px ${color.get('borderInputFocus')};
  }
  ${(props: {hasIcon: boolean, invalid: any, ref: any}) =>
    props.invalid &&
    css`
      &,
      &:focus {
        border: 1px solid ${color.get('anger')};
        box-shadow: none;
      }
    `}
`;

export const StyledIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  left: 8px;
  pointer-events: none;
  color: ${color.get('textMedium')};
`;
