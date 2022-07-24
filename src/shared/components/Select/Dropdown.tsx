import React, {useState, useRef, useLayoutEffect} from 'react';
import {uniq} from 'lodash';

import {KeyCodes} from '../../constants/keyCodes';

import {ClearIcon, Dropdown, DropdownInput, Options, Option, OptionsNoResults} from './Styles';

interface ISelectDropdownProps {
  dropdownWidth: number,
  value: any,
  isValueEmpty: boolean,
  searchValue: string,
  setSearchValue: ((e: any) => void),
  $inputRef: any,
  deactivateDropdown: () => void,
  options: any[],
  onChange: ((e: any) => void),
  onCreate: ((e: any, a:any) => void),
  isMulti: boolean,
  withClearValue: boolean,
  propsRenderOption: ((e: any) => void),
  $selectRef: any,
};

const SelectDropdown = (props: ISelectDropdownProps) => {
  const [isCreatingOption, setCreatingOption] = useState(false);

  const $optionsRef : React.MutableRefObject<any> = useRef();

  useLayoutEffect(() => {
    const setFirstOptionAsActive = () => {
      const $active = getActiveOptionNode();
      if ($active) $active.classList.remove(activeOptionClass);

      if ($optionsRef.current.firstElementChild) {
        $optionsRef.current.firstElementChild.classList.add(activeOptionClass);
      }
    };
    setFirstOptionAsActive();
  });

  const selectOptionValue = (optionValue: any) => {
    props.deactivateDropdown();
    if (props.isMulti) {
      props.onChange(uniq([...props.value, optionValue]));
    } else {
      props.onChange(optionValue);
    }
  };

  const createOption = (newOptionLabel: any) => {
    setCreatingOption(true);
    props.onCreate(newOptionLabel, (createdOptionValue: any) => {
      setCreatingOption(false);
      selectOptionValue(createdOptionValue);
    });
  };

  const clearOptionValues = () => {
    props.$inputRef.current.value = '';
    props.$inputRef.current.focus();
    props.onChange(props.isMulti ? [] : null);
  };

  const handleInputKeyDown = (event: any) => {
    if (event.keyCode === KeyCodes.ESCAPE) {
      handleInputEscapeKeyDown(event);
    } else if (event.keyCode === KeyCodes.ENTER) {
      handleInputEnterKeyDown(event);
    } else if (event.keyCode === KeyCodes.ARROW_DOWN || event.keyCode === KeyCodes.ARROW_UP) {
      handleInputArrowUpOrDownKeyDown(event);
    }
  };

  const handleInputEscapeKeyDown = (event: any) => {
    event.nativeEvent.stopImmediatePropagation();
    props.deactivateDropdown();
  };

  const handleInputEnterKeyDown = (event: any) => {
    event.preventDefault();

    const $active = getActiveOptionNode();
    if (!$active) return;

    const optionValueToSelect = $active.getAttribute('data-select-option-value');
    const optionLabelToCreate = $active.getAttribute('data-create-option-label');

    if (optionValueToSelect) {
      selectOptionValue(optionValueToSelect);
    } else if (optionLabelToCreate) {
      createOption(optionLabelToCreate);
    }
  };

  const handleInputArrowUpOrDownKeyDown = (event: any) => {
    const $active = getActiveOptionNode();
    if (!$active) return;

    const $options = $optionsRef.current;
    const $optionsHeight = $options.getBoundingClientRect().height;
    const $activeHeight = $active.getBoundingClientRect().height;

    if (event.keyCode === KeyCodes.ARROW_DOWN) {
      if ($options.lastElementChild === $active) {
        $active.classList.remove(activeOptionClass);
        $options.firstElementChild.classList.add(activeOptionClass);
        $options.scrollTop = 0;
      } else {
        $active.classList.remove(activeOptionClass);
        $active.nextElementSibling.classList.add(activeOptionClass);
        if ($active.offsetTop > $options.scrollTop + $optionsHeight / 1.4) {
          $options.scrollTop += $activeHeight;
        }
      }
    } else if (event.keyCode === KeyCodes.ARROW_UP) {
      if ($options.firstElementChild === $active) {
        $active.classList.remove(activeOptionClass);
        $options.lastElementChild.classList.add(activeOptionClass);
        $options.scrollTop = $options.scrollHeight;
      } else {
        $active.classList.remove(activeOptionClass);
        $active.previousElementSibling.classList.add(activeOptionClass);
        if ($active.offsetTop < $options.scrollTop + $optionsHeight / 2.4) {
          $options.scrollTop -= $activeHeight;
        }
      }
    }
  };

  const handleOptionMouseEnter = (event: any) => {
    const $active = getActiveOptionNode();
    if ($active) $active.classList.remove(activeOptionClass);
    event.currentTarget.classList.add(activeOptionClass);
  };

  const getActiveOptionNode = () => $optionsRef.current.querySelector(`.${activeOptionClass}`);

  const optionsFilteredBySearchValue = props.options.filter((option: any) =>
    option.label
        .toString()
        .toLowerCase()
        .includes(props.searchValue.toLowerCase()),
  );

  const removeSelectedOptionsMulti = (opts: any) => opts.filter((option: any) => !props.value.includes(option.value));
  const removeSelectedOptionsSingle = (opts: any) => opts.filter((option: any) => props.value !== option.value);

  const filteredOptions = props.isMulti ?
    removeSelectedOptionsMulti(optionsFilteredBySearchValue) :
    removeSelectedOptionsSingle(optionsFilteredBySearchValue);

  const isSearchValueInOptions = props.options.map((option) => option.label).includes(props.searchValue);
  const isOptionCreatable = props.searchValue && !isSearchValueInOptions;

  return (
    <Dropdown width={props.dropdownWidth}>
      <DropdownInput
        type="text"
        placeholder="Search"
        ref={props.$inputRef}
        autoFocus
        onKeyDown={handleInputKeyDown}
        onChange={(event) => props.setSearchValue(event.target.value)}
      />

      {!props.isValueEmpty && props.withClearValue && <ClearIcon type="close" onClick={clearOptionValues} />}

      <Options ref={$optionsRef}>
        {filteredOptions.map((option: any) => (
          <Option
            key={option.value}
            data-select-option-value={option.value}
            data-testid={`select-option:${option.label}`}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => selectOptionValue(option.value)}
          >
            {props.propsRenderOption ? props.propsRenderOption(option) : option.label}
          </Option>
        ))}

        {isOptionCreatable && (
          <Option
            data-create-option-label={props.searchValue}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => createOption(props.searchValue)}
          >
            {isCreatingOption ? `Creating "${props.searchValue}"...` : `Create "${props.searchValue}"`}
          </Option>
        )}
      </Options>

      {filteredOptions.length === 0 && <OptionsNoResults>No results</OptionsNoResults>}
    </Dropdown>
  );
};

const activeOptionClass = 'jira-select-option-is-active';

export default SelectDropdown;
