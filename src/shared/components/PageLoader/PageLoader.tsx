import React from 'react';

import StyledPageLoader from './PageLoaderStyles';
import Spinner from '../Spinner/Spinner';

export const PageLoader = () => {
  return (
    <StyledPageLoader>
      <Spinner size={70} />
    </StyledPageLoader>);
};
