import React from 'react';
import {NavUpper} from './UpperBarStyles';
import {DisplayList} from './DiplayList/DisplayList';

export const UpperBar = () => {
  return (
    <NavUpper>
      <DisplayList/>
    </NavUpper>
  );
};
