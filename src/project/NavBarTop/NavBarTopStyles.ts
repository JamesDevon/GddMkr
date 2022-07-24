import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

import {font, color, mixin, zIndexValues} from '../../shared/utils/styles';
import {Logo} from '../../shared/components/Logo/Logo';

export const NavLeft = styled.aside`
  z-index: ${zIndexValues.navLeft};
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: hidden;
  height: 6%;
  width: 100%;
  background: ${color.get('backgroundDarkPrimary')};
  transition: all 0.1s;
  ${mixin.hardwareAccelerate}
  display: flex;
  align-items: center;
  justify-content: right;
`;


export const LogoLink = styled(NavLink)`
  position: absolute;
  left: 20px;
  transition: left 0.1s;
`;

export const StyledLogo = styled(Logo)`
  display: inline-block;
  margin-right: auto;
  padding: 10px;
  ${mixin.clickable}
`;

export const Bottom = styled.div`
  position: relative;
  padding-left: 64px;
  padding-right: 64px;
  right: 20px;
`;

export const Item = styled.div`
  position: relative;
  width: auto;
  height: 42px;
  line-height: 42px;
  padding-left: 64px;
  padding-right: 0px;
  color: #deebff;
  transition: color 0.1s;
  ${mixin.clickable}
  
  i {
    position: absolute;
    left: 18px;
  }
`;

export const ItemText = styled.div`
  position: relative;
  right: 12px;
  visibility: hidden;
  opacity: 0;
  text-transform: uppercase;
  transition: all 0.1s;
  transition-property: right, visibility, opacity;
  ${font.bold}
  ${font.size(12)}
  ${NavLeft}:hover & {
    right: 0;
    visibility: visible;
    opacity: 1;
  }
`;
