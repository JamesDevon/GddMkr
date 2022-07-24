import React from 'react';

import {TypeIcon} from './Styles';

const IssueTypeIcon = ({type, top, ...otherProps}: any) => (
  <TypeIcon type={type} color={type} size={18} {...otherProps} />
);

export default IssueTypeIcon;
