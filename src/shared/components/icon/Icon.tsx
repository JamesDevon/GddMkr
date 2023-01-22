import React from 'react';

import {StyledIcon} from './StyledIcon';

const fontIconCodes = new Map<string, string>([
  ['user', '\\F4D7'],
  ['notification', '\\F18A'],
  ['friend', '\\F4D0'],
  ['controller', '\\F2D4'],
  ['create', '\\F4FA'],
  ['back', '\\F10F'],
  ['zoom-in', '\\F62C'],
  ['zoom-out', '\\F62D'],
  ['exit-fullscreen', '\\F3DE'],
  ['enter-fullscreen', '\\F3DF'],
  ['config', '\\F3E4'],
  ['selector', '\\\F234'],
  ['add', '\\\F4FE'],
]);


const defaultProps = {
  className: undefined,
  size: 16,
  left: 0,
  top: 0,
};

const Icon = (props: any) => (
  <StyledIcon {...props} code={fontIconCodes.get(props.type)} data-testid={`icon:${props.type}`} />
);

Icon.defaultProps = defaultProps;

export default Icon;
