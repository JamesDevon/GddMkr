import styled from 'styled-components';
import {color, mixin, zIndexValues} from '../../shared/utils/styles';

export const RadioContainer = styled.div`
  font-size: 8px;
`;

export const NavUpper = styled.aside`
  z-index: ${zIndexValues.navLeft};
  position: fixed;
  top: 6%;
  left: 0;
  overflow-y: hidden;
  height: 2%;
  width: 100%;
  background: ${color.get('primary')};
  transition: all 0.1s;
  ${mixin.hardwareAccelerate}
  display: flex;
  align-items: center;
  justify-content: left;
`;
