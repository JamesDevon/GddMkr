import React, {useState, useRef} from 'react';

import useOnOutsideClick from '../../hooks/onOutsideClick';
import {KeyCodes} from '../../constants/keyCodes';
import Icon from '../icon/Icon';

import Dropdown from './Dropdown';
import {
  StyledSelect,
  ValueContainer,
  ChevronIcon,
  Placeholder,
  ValueMulti,
  ValueMultiItem,
  AddMore,
} from './Styles';

interface ISelectProps {
  className: string,
  variant: 'normal' | 'empty',
  dropdownWidth: number,
  name: string,
  value: any[] | string | number,
  defaultValue: any,
  placeholder: string,
  invalid: boolean,
  options: any[],
  onChange: (e: any) => void,
  onCreate: () => void,
  isMulti: boolean,
  withClearValue: boolean,
  renderValue: (e: any) => void,
  renderOption: () => void,
};


const Select = (props : ISelectProps) => {
  const [stateValue, setStateValue] = useState(props.defaultValue || (props.isMulti ? [] : null));
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const isControlled = props.value !== undefined;
  const value = isControlled ? props.value : stateValue;

  const $selectRef : React.MutableRefObject<any>= useRef();
  const $inputRef : React.MutableRefObject<any> = useRef();

  const activateDropdown = () => {
    if (isDropdownOpen) {
      $inputRef.current.focus();
    } else {
      setDropdownOpen(true);
    }
  };

  const deactivateDropdown = () => {
    setDropdownOpen(false);
    setSearchValue('');
    $selectRef.current.focus();
  };

  useOnOutsideClick($selectRef, isDropdownOpen, deactivateDropdown);

  const preserveValueType = (newValue: any) => {
    const areOptionValuesNumbers = props.options.some((option) => typeof option.value === 'number');

    if (areOptionValuesNumbers) {
      if (props.isMulti) {
        return newValue.map(Number);
      }
      if (newValue) {
        return Number(newValue);
      }
    }
    return newValue;
  };

  const handleChange = (newValue: any) => {
    if (!isControlled) {
      setStateValue(preserveValueType(newValue));
    }
    props.onChange(preserveValueType(newValue));
  };

  const removeOptionValue = (optionValue: any) => {
    handleChange(value.filter((val: any) => val !== optionValue));
  };

  const handleFocusedSelectKeydown = (event: any) => {
    if (isDropdownOpen) return;

    if (event.keyCode === KeyCodes.ENTER) {
      event.preventDefault();
    }
    if (event.keyCode !== KeyCodes.ESCAPE && event.keyCode !== KeyCodes.TAB && !event.shiftKey) {
      setDropdownOpen(true);
    }
  };

  const getOption = (optionValue: any) => props.options.find((option) => option.value === optionValue);
  const getOptionLabel = (optionValue: any) => (getOption(optionValue) || {label: ''}).label;

  const isValueEmpty = props.isMulti ? !value.length : !getOption(value);

  return (
    <StyledSelect
      className={props.className}
      variant={props.variant}
      ref={$selectRef}
      tabIndex="0"
      onKeyDown={handleFocusedSelectKeydown}
      invalid={props.invalid}
    >
      <ValueContainer
        variant={props.variant}
        data-testid={props.name ? `select:${name}` : 'select'}
        onClick={activateDropdown}
      >
        {isValueEmpty && <Placeholder>{props.placeholder}</Placeholder>}

        {!isValueEmpty && !props.isMulti && props.renderValue ?
            props.renderValue({value}) :
          getOptionLabel(value)}

        {!isValueEmpty && props.isMulti && (
          <ValueMulti variant={props.variant}>
            {value.map((optionValue : any) =>
                props.renderValue ? (
                  props.renderValue({
                    value: optionValue,
                    removeOptionValue: () => removeOptionValue(optionValue),
                  })
              ) : (
                <ValueMultiItem key={optionValue} onClick={() => removeOptionValue(optionValue)}>
                  {getOptionLabel(optionValue)}
                  <Icon type="close" size={14} />
                </ValueMultiItem>
              ),
            )}
            <AddMore>
              <Icon type="plus" />
              Add more
            </AddMore>
          </ValueMulti>
        )}

        {(!props.isMulti || isValueEmpty) && props.variant !== 'empty' && (
          <ChevronIcon type="chevron-down" top={1} />
        )}
      </ValueContainer>

      {isDropdownOpen && (
        <Dropdown
          dropdownWidth={props.dropdownWidth}
          value={value}
          isValueEmpty={isValueEmpty}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          $selectRef={$selectRef}
          $inputRef={$inputRef}
          deactivateDropdown={deactivateDropdown}
          options={props.options}
          onChange={handleChange}
          onCreate={props.onCreate}
          isMulti={props.isMulti}
          withClearValue={props.withClearValue}
          propsRenderOption={props.renderOption}
        />
      )}
    </StyledSelect>
  );
};

export default Select;
