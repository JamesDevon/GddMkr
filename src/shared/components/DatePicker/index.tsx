import React, {useState, useRef} from 'react';

import {formatDate, formatDateTime} from '../../utils/dateTime';
import useOnOutsideClick from '../../hooks/onOutsideClick';
import Input from '../Input';

import DateSection from './DateSection';
import TimeSection from './TimeSection';
import {StyledDatePicker, Dropdown} from './Styles';


const defaultProps = {
  className: undefined,
  withTime: true,
  value: undefined,
};

const DatePicker = ({className, withTime, value, onChange, ...inputProps}: any) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const $containerRef = useRef();

  useOnOutsideClick($containerRef, isDropdownOpen, () => setDropdownOpen(false));

  return (
  // @ts-ignore
    <StyledDatePicker ref={$containerRef}>
      <Input
        icon="calendar"
        {...inputProps}
        className={className}
        autoComplete="off"
        value={getFormattedInputValue(value, withTime)}
        onClick={() => setDropdownOpen(true)}
      />
      {isDropdownOpen && (
        <Dropdown withTime={withTime}>
          <DateSection
            withTime={withTime}
            value={value}
            onChange={onChange}
            setDropdownOpen={setDropdownOpen}
          />
          {withTime && (
            <TimeSection value={value} onChange={onChange} setDropdownOpen={setDropdownOpen} />
          )}
        </Dropdown>
      )}
    </StyledDatePicker>
  );
};

const getFormattedInputValue = (value: any, withTime: any) => {
  if (!value) return '';
  return withTime ? formatDateTime(value) : formatDate(value);
};

DatePicker.defaultProps = defaultProps;

export default DatePicker;
