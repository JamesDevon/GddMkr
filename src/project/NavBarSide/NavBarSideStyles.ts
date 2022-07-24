import styled from 'styled-components';

import {color, sizes, font, mixin, zIndexValues} from '../../shared/utils/styles';

export const Sidebar = styled.div`
  position: fixed;
  z-index: ${zIndexValues.navLeft - 1};
  top: 8%;
  left: 0;
  height: 100vh;
  width: ${sizes.secondarySideBarWidth}px;
  padding: 0 16px 24px;
  background: ${color.get('backgroundLightest')};
  border-right: 1px solid ${color.get('borderLightest')};
  ${mixin.scrollableY};
  ${mixin.customScrollbar()};
  @media (max-width: 1100px) {
    width: ${sizes.secondarySideBarWidth - 10}px;
  };
  @media (max-width: 999px) {
    display: none;
  };
`;

export const ProjectInfo = styled.div`
  display: flex;
  padding: 24px 4px;
  margin-left: 20px;
`;

export const ProjectTexts = styled.div`
  padding: 3px 0 0 10px;
`;

export const ProjectName = styled.div`
  color: ${color.get('textDark')};
  ${font.size(15)};
  ${font.medium};
`;

export const ProjectCategory = styled.div`
  color: ${color.get('textMedium')};
  ${font.size(13)};
`;

export const Divider = styled.div`
  margin-top: 17px;
  padding-top: 18px;
  border-top: 1px solid ${color.get('borderLight')};
`;

export const LinkItem = styled.div`
  position: relative;
  display: flex;
  padding: 8px 12px;
  border-radius: 3px;
  ${mixin.clickable}
  ${(props: any) =>
    !props.to ? `cursor: not-allowed;` : `&:hover { background: ${color.get('backgroundLight')}; }`}
  i {
    margin-right: 15px;
    font-size: 20px;
  }
  &.active {
    color: ${color.get('primary')};
    background: ${color.get('backgroundLight')};
    i {
      color: ${color.get('primary')};
    }
  }
`;

export const LinkText = styled.div`
  padding-top: 2px;
  ${font.size(14.7)};
`;

export const NotImplemented = styled.div`
  display: inline-block;
  position: absolute;
  top: 7px;
  left: 40px;
  width: 140px;
  padding: 5px 0 5px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  color: ${color.get('textDark')};
  background: ${color.get('backgroundMedium')};
  opacity: 0;
  ${font.size(11.5)};
  ${font.bold}
  ${LinkItem}:hover & {
    opacity: 1;
  }
`;
