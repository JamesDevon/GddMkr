import React, {forwardRef} from 'react';
import TextareaAutoSize from 'react-textarea-autosize';

import {StyledTextarea} from './Styles';


const defaultProps = {
  className: undefined,
  invalid: false,
  minRows: 2,
  value: undefined,
  onChange: () => {},
};

// eslint-disable-next-line react/display-name
const Textarea = forwardRef(({className, invalid, onChange, ...textareaProps}: any, ref) => (
  <StyledTextarea className={className} invalid={invalid}>
    <TextareaAutoSize
      {...textareaProps}
      onChange={(event) => onChange(event.target.value, event)}
      inputRef={ref || undefined}
    />
  </StyledTextarea>
));

Textarea.defaultProps = defaultProps;

export default Textarea;
