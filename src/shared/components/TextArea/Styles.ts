import styled, {css} from 'styled-components';

import {color, font} from '../../utils/styles';

export const StyledTextarea = styled.div`
  display: inline-block;
  width: 100%;
  textarea {
    overflow-y: hidden;
    width: 100%;
    padding: 8px 12px 9px;
    border-radius: 3px;
    border: 1px solid ${color.get('borderLightest')};
    color: ${color.get('textDarkest')};
    background: ${color.get('backgroundLightest')};
    ${font.regular}
    ${font.size(15)}
    &:focus {
      background: #fff;
      border: 1px solid ${color.get('borderInputFocus')};
      box-shadow: 0 0 0 1px ${color.get('borderInputFocus')};
    }
    ${(props: { invalid: any }) =>
    props.invalid &&
    css`
        &,
        &:focus {
          border: 1px solid ${color.get('danger')};
        }
      `}
  }
`;
