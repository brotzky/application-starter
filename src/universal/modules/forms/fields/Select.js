import React from 'react';
import styled from 'styled-components';
import FormField from '../components/FormField';
import FieldLabel from '../components/FieldLabel';
import { ChevronDown } from '../../ui/icons';

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
  display: flex;
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
    props.isPlaceholder
      ? '#828282'
      : props.hasPlaceholder ? props.theme.colors.black : '#828282'};
  background: ${props =>
    props.disabled
      ? '#f8f8f8'
      : props.isPlaceholder ? props.theme.select.background : '#F8F8F8'};
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
  const {
    disabled,
    flex,
    input = {},
    label = '',
    meta = {},
    sort = false,
  } = props;
  const { name, value } = input;
  const options = sort
    ? props.options.sort(
        (a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0),
      )
    : props.options;

  const selectedObj = props.options.find(
    option => option.value && option.value.indexOf(value) !== -1,
  );
  const selectValue = (selectedObj && selectedObj.name) || '';

  const isPlaceholder =
    selectedObj &&
    (selectedObj.value === '' || selectedObj.value.includes('Select'));
  const hasPlaceholder =
    props.options.length &&
    props.options[0].value &&
    (props.options[0].value.includes('Select') ||
      props.options[0].value === '');
  return (
    <FormField flex={flex}>
      <SelectStyled disabled={disabled} meta={meta} value={value}>
        {label && (
          <FieldLabel label={label} meta={meta} name={name} value={value} />
        )}
        <SelectWrapper>
          <select {...input} id={name} value={value || ''} disabled={disabled}>
            {options.map(option => {
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
            isDefault={selectValue}
            isPlaceholder={isPlaceholder}
            hasPlaceholder={hasPlaceholder}
            disabled={disabled}
            meta={meta}
            value={value}
          >
            {selectValue}
          </SelectValue>
        </SelectWrapper>
        <ChevronDown />
      </SelectStyled>
    </FormField>
  );
};

export default Select;
