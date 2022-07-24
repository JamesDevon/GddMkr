import styled, {css} from 'styled-components';

import {color, mixin, zIndexValues} from '../../utils/styles';
import Icon from '../icon/Icon';

export const ScrollOverlay = styled.div`
  z-index: ${zIndexValues.modal};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  ${mixin.scrollableY}
`;

export const ClickableOverlay = styled.div`
  min-height: 100%;
  background: rgba(9, 30, 66, 0.54);
  ${(props: { variant: string, ref:any }) => clickOverlayStyles.get(props.variant)}
`;

const clickOverlayStyles = new Map<string, any>([
  ['center', css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
  `],
  ['aside', ''],
]);

export const StyledModal = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  background: #fff;
  ${(props: { variant: string, ref:any, width: any }) => modalStyles.get(props.variant)}
`;

const modalStyles = new Map<string, any>([
  ['center', css`
    max-width: ${(props: any) => props.width}px;
    vertical-align: middle;
    border-radius: 3px;
    ${mixin.boxShadowMedium}
  `],
  ['aside', css`
    min-height: 100vh;
    max-width: ${(props: any) => props.width}px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  `],
]);

export const CloseIcon = styled(Icon)`
  position: absolute;
  font-size: 25px;
  color: ${color.get('textMedium')};
  transition: all 0.1s;
  ${mixin.clickable}
  ${(props: any) => closeIconStyles.get(props.variant)}
`;

const closeIconStyles = new Map<string, any>([
  ['center', css`
    top: 10px;
    right: 12px;
    padding: 3px 5px 0px 5px;
    border-radius: 4px;
    &:hover {
      background: ${color.get('backgroundLight')};
    }
  `],
  ['aside', css`
    top: 10px;
    right: -30px;
    width: 50px;
    height: 50px;
    padding-top: 10px;
    border-radius: 3px;
    text-align: center;
    background: #fff;
    border: 1px solid ${color.get('borderLightest')};
    ${mixin.boxShadowMedium};
    &:hover {
      color: ${color.get('primary')};
    }
  `],
]);
