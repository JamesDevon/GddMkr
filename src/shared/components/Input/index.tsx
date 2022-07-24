import React, {forwardRef} from 'react';

import {StyledInput, InputElement, StyledIcon} from './Styles';

interface IInputProps {
  className: string,
  value: string | number,
  icon: string,
  invalid: boolean,
  filter: RegExp,
  onChange: ((any: any, any2: any) => void),
};


// eslint-disable-next-line react/display-name
const Input = forwardRef(({icon, className, filter, onChange, ...inputProps}: IInputProps, ref) => {
  const handleChange = (event: { target: { value: any; }; }) => {
    if (!filter || filter.test(event.target.value)) {
      onChange(event.target.value, event);
    }
  };

  return (
    <StyledInput className={className}>
      {icon && <StyledIcon type={icon} size={15} />}
      <InputElement {...inputProps} onChange={handleChange} hasIcon={!!icon} ref={ref} />
    </StyledInput>
  );
});

export default Input;
