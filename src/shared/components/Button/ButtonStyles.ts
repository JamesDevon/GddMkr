import styled, {css} from 'styled-components';

import {color, font, mixin} from '../../utils/styles';
import Spinner from '../Spinner/Spinner';

type ObjectKey = keyof typeof buttonVariants;

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  vertical-align: middle;
  line-height: 1;
  padding: 0 ${(props :any) => (props.iconOnly ? 9 : 12)}px;
  white-space: nowrap;
  border-radius: 3px;
  transition: all 0.1s;
  appearance: none;
  ${mixin.clickable}
  ${font.size(14.5)}
  ${(props : any) => buttonVariants[props.variant as ObjectKey]}
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const colored = css`
  color: #fff;
  background: ${(props: any) => color.get(props.variant)};
  ${font.medium}
  &:not(:disabled) {
    &:hover {
      background: ${(props: any) => mixin.lighten(color.get(props.variant), 0.15)};
    }
    &:active {
      background: ${(props:any) => mixin.darken(color.get(props.variant), 0.1)};
    }
    ${(props: any) =>
    props.isActive &&
    css`
        background: ${mixin.darken(color.get(props.variant), 0.1)} !important;
      `}
  }
`;

const secondaryAndEmptyShared = css`
  color: ${color.get('textDark')};
  ${font.regular}
  &:not(:disabled) {
    &:hover {
      background: ${color.get('backgroundLight')};
    }
    &:active {
      color: ${color.get('primary')};
      background: ${color.get('backgroundLightPrimary')};
    }
    ${(props : any) =>
    props.isActive &&
    css`
        color: ${color.get('primary')};
        background: ${color.get('backgroundLightPrimary')} !important;
      `}
  }
`;

const buttonVariants = {
  primary: colored,
  success: colored,
  danger: colored,
  secondary: css`
    background: ${color.get('secondary')};
    ${secondaryAndEmptyShared};
  `,
  empty: css`
    background: #fff;
    ${secondaryAndEmptyShared};
  `,
};

export const StyledSpinner = styled(Spinner)`
  position: relative;
  top: 1px;
`;

export const Text = styled.div`
  padding-left: ${(props: { withPadding: string } & Partial<any>) => (props.withPadding ? 7 : 0)}px;
`;
