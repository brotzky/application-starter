import React from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import styled from 'styled-components';
import FormField from '../components/FormField';
import FieldLabel from '../components/FieldLabel';

const SelectEasyList = styled.div`
  border: 1px solid
    ${props =>
    props.meta.active
      ? props.theme.inputs.border.color.focus
      : props.meta.error && props.meta.touched
        ? props.theme.colors.red
        : props.theme.inputs.border.color.default};
  border-radius: 2px;
  width: 100%;

  > div {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid
      ${props =>
    props.meta.active
      ? props.theme.inputs.border.color.focus
      : props.meta.error && props.meta.touched
        ? props.theme.colors.red
        : props.theme.inputs.border.color.default};

    &:last-child {
      border-bottom: none;
    }
  }
`;

const SelectEasyItem = styled.button`
  position: relative;
  align-items: center;
  background: ${props =>
    props.active
      ? props.theme.buttons.primary.background.hover
      : 'linear-gradient(to bottom, #fff, #f9fafb)'};
  border-right: 1px solid
    ${props =>
    props.meta.active
      ? props.theme.inputs.border.color.focus
      : props.meta.error && props.meta.touched
        ? props.theme.colors.red
        : props.theme.inputs.border.color.default};
  border-radius: 0;

  color: ${props =>
    props.active
      ? props.theme.buttons.primary.color.hover
      : props.theme.colors.grey.dark};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
  display: flex;
  font-size: ${props => props.theme.selectEasy.item.fontSize};
  line-height: 1.2;
  justify-content: center;
  padding: ${props => props.theme.selectEasy.item.padding};
  text-align: center;
  transition: all 0.15s ease-out;
  width: ${props => props.width};

  &:hover,
  &:focus {
    background: ${props =>
    props.active
      ? props.theme.buttons.primary.background.hover
      : props.theme.colors.grey.lightest};
  }

  &:last-child {
    border-right: none;
  }

  ${props =>
    props.disabled
      ? `
    &::after {
      content: '';
      background: rgba(0, 0, 0, 0.03);
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    `
      : ''};
`;

// https://gist.github.com/webinista/11240585
const foldm = (r, j) =>
  r.reduce((a, b, i, g) => (!(i % j) ? a.concat([g.slice(i, i + j)]) : a), []);

const SelectEasy = props => {
  const { disabled, flex, input = {}, label = '', meta = {} } = props;
  const { name, value } = input;
  const optionsLen = props.options.length;
  const options = foldm(props.options, optionsLen <= 5 ? optionsLen : 4);

  return (
    <FormField flex={flex}>
      <FieldLabel label={label} meta={meta} name={name} value={value} />
      <SelectEasyList meta={meta}>
        {options.map((option, index) => (
          <div key={index}>
            {option.map(o => {
              const handleClick = disabled
                ? () => {}
                : () => props.dispatch(change(meta.form, name, o.value));

              return (
                <SelectEasyItem
                  active={value === o.value}
                  disabled={disabled}
                  key={o.name}
                  meta={meta}
                  onClick={handleClick}
                  type="button"
                  width={option.length <= 5 ? `${100 / option.length}%` : '25%'}
                >
                  {o.name}
                </SelectEasyItem>
              );
            })}
          </div>
        ))}
      </SelectEasyList>
    </FormField>
  );
};

export default connect()(SelectEasy);
