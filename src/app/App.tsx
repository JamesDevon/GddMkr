import React, {Fragment} from 'react';

import NormalizeStyles from './NormalizeStyles';
import BaseStyle from './BaseStyle';

import './App.css';
import Toast from './toast/Toast';
import Paths from './Paths';

/**
 * The main function
 * @constructor
 */
export default function App() {
  return (
    <Fragment>
      <NormalizeStyles />
      <BaseStyle/>
      <Toast/>
      <Paths/>
    </Fragment>
  );
};
