import React from 'react';
import styled from 'styled-components';
import FormField from '../components/FormField';
import FieldLabel from '../components/FieldLabel';
import { ChevronDown } from '../../ui/icons';
import sortObj from '../../../utils/sortObjectsByNameProperty';
import { capitalizeString } from 'grow-utils/stringFormatting';

const buildSelectOptionValue = option => {
  const value = option.id || option.value;
  return value === '0' ? '' : value;
};

const SelectStyled = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: ${props => props.theme.fields.flexDirection};
  width: 100%;

  select {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
    border-width: ${props => props.theme.select.border.width};
    border-style: ${props => props.theme.select.border.style};
    border-color: ${props =>
      props.meta.active
        ? props.theme.inputs.border.color.focus
        : props.meta.error && props.meta.touched
          ? props.theme.colors.red
          : props.theme.inputs.border.color.default};
    border-radius: 3px;
    background: transparent;
    opacity: 0;
    height: ${props => props.theme.inputs.height};
    width: ${props => props.theme.select.width};
    font-size: ${props => props.theme.inputs.fontSize};
    padding: 0 ${props => props.theme.inputs.padding};
    position: relative;
    z-index: 1;

    &:active {
      outline: none;
    }
  }

  svg {
    height: ${props => props.theme.select.svg.height};
    position: absolute;
    right: ${props => props.theme.inputs.padding};
    top: ${props => props.theme.select.svg.top};

    * {
      stroke: ${props => props.theme.colors.grey.mid};
    }
  }
`;

const SelectValue = styled.div`
  display: block;
  align-items: center;
  position: absolute;
  height: ${props => props.theme.inputs.height};
  width: ${props => props.theme.select.width || '100%'};
  top: 0;
  left: 0;
  border-radius: ${props => props.theme.select.border.radius || '3px'};
  border-width: ${props => props.theme.select.border.width};
  border-style: ${props => props.theme.select.border.style};
  border-color: ${props =>
    props.meta.active
      ? props.theme.inputs.border.color.focus
      : props.meta.error && props.meta.touched
        ? props.theme.colors.red
        : props.theme.inputs.border.color.default};
  color: ${props =>
    props.disabled || props.isPlaceholder
      ? '#828282'
      : props.theme.colors.black};
  background: ${props =>
    props.disabled ? '#f8f8f8' : props.theme.select.background};
  padding: 0 ${props => props.theme.inputs.padding};
  padding-right: ${props => props.theme.inputs.paddingRight};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: ${props => props.theme.inputs.fontSize};
  line-height: ${props => props.theme.inputs.height};
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = props => {
  const { disabled, flex, input = {}, label = '', meta = {}, options } = props;
  const { name, value } = input;

  /**
   * Prepare options:
   * 1. Make a copy of the props.options because we will sort the options. If we don't,
   *    every time we render the select element will insert a placeholder since props.options
   *    has been modified in sort
   * 2. Use utility function "sortObj" to sort options in alphabetical order
   * 3. Insert a placeholder option "Select an option" to first element of options array
   */
  const optionsCopy = options.slice();

  sortObj(optionsCopy).unshift({
    name: 'Select an option',
    value: '',
    disabled: true,
  });

  const selectedObj = optionsCopy.find(option => {
    // In case 'value' are in array format such as "Roles" -> ["MANAGER"].
    // Also normalize values for comparison

    if (Array.isArray(value)) {
      return option.value === value[0];
    }

    return option.value === value;
  });

  const selectValue = (selectedObj && selectedObj.name) || '';

  return (
    <FormField flex={flex}>
      <SelectStyled disabled={disabled} meta={meta} value={value}>
        {label && (
          <FieldLabel label={label} meta={meta} name={name} value={value} />
        )}
        <SelectWrapper>
          <select {...input} id={name}>
            {optionsCopy.map(option => {
              const val = buildSelectOptionValue(option);
              return (
                <option
                  key={option.value}
                  disabled={option.disabled}
                  value={val}
                >
                  {option.name}
                </option>
              );
            })}
          </select>
          <SelectValue
            isPlaceholder={value === ''}
            disabled={disabled}
            meta={meta}
            value={value}
          >
            {capitalizeString(selectValue, ' ', ' ')}
          </SelectValue>
        </SelectWrapper>
        <ChevronDown />
      </SelectStyled>
    </FormField>
  );
};

export default Select;
