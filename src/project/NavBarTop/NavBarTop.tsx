import React from 'react';

import {NavLeft, LogoLink, StyledLogo, Item, ItemText, Bottom} from './NavBarTopStyles';
import {Icon} from '../../shared/components';
import ProfileTooltip from '../../shared/components/AboutTooltip/ProfileTooltip';

export interface INavBarTop {
    inviteFriendModalHelpers: any;
}

export const NavBarTop = (props: INavBarTop) => {
  return (
    <NavLeft>
      <LogoLink to="/">
        <StyledLogo size={50} className="logoApp"/>
      </LogoLink>

      <Item onClick={props.inviteFriendModalHelpers.open}>
        <Icon type="friend" size={22} top={1} left={3} />
        <ItemText>invite a friend</ItemText>
      </Item>

      <Item>
        <Icon type="notification" size={25} top={3} />
        <ItemText>alerts</ItemText>
      </Item>

      <Bottom>
        <ProfileTooltip
          placement="bottom"
          renderLink={(linkProps: any) => (
            <Item {...linkProps}>
              <Icon type="user" size={30} top={4}/>
              <ItemText>UserName</ItemText>
            </Item>
          )}
        />
      </Bottom>
    </NavLeft>
  );
};
