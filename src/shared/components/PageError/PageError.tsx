import React from 'react';

import {ErrorPage, ErrorPageInner, ErrorBox, StyledIcon, Title} from './PageErrorStyles';

const PageError = () => (
  <ErrorPage>
    <ErrorPageInner>
      <ErrorBox>
        <StyledIcon type="bug" />
        <Title>There’s been a glitch…</Title>
        <p>
          {'We’re not quite sure what went wrong. Please try again later '}
        </p>
      </ErrorBox>
    </ErrorPageInner>
  </ErrorPage>
);

export default PageError;
