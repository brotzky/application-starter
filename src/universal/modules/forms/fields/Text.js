// @flow
import React from 'react';
import MaskedInput from 'react-text-mask';
import styled from 'styled-components';
import FormField from '../components/FormField';
import FieldLabel from '../components/FieldLabel';

export const TextStyled = styled.input`
  text-overflow: ellipsis;
  border-width: ${props => props.theme.inputs.border.width};
  border-style: ${props => props.theme.inputs.border.style};
  border-color: ${props =>
    props.meta.active
      ? props.theme.inputs.border.color.focus
      : props.meta.error && props.meta.touched
        ? props.theme.colors.red
        : props.theme.inputs.border.color.default};
  border-radius: ${props => props.theme.inputs.border.radius};
  box-shadow: ${props => props.theme.inputs.boxShadow};
  color: ${props => props.theme.inputs.color.value};
  height: ${props => props.theme.inputs.height};
  width: ${props => props.theme.inputs.width};
  padding: 0 ${props => props.theme.inputs.padding};
  font-size: ${props => props.theme.inputs.fontSize};
  background: ${props =>
    props.disabled ? props.theme.colors.greyLight : '#fff'};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};

  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #989898;
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    color: #989898;
  }
  &:-ms-input-placeholder {
    /* IE 10+ */
    color: #989898;
  }
  &:-moz-placeholder {
    /* Firefox 18- */
    color: #989898;
  }
`;

export const MaskedStyled = TextStyled.withComponent(MaskedInput);

const Text = props => {
  const {
    disabled,
    flex,
    input = {},
    label = '',
    mask,
    meta = {},
    placeholder,
    tooltip,
    type = 'text',
  } = props;
  const { name, value } = input;

  return (
    <FormField flex={flex}>
      {label && (
        <FieldLabel
          label={label}
          meta={meta}
          name={name}
          tooltip={tooltip}
          value={value}
        />
      )}
      {mask ? (
        <MaskedStyled
          {...input}
          disabled={disabled}
          id={name}
          mask={mask}
          meta={meta}
          placeholder={placeholder}
          type={type}
        />
      ) : (
        <TextStyled
          {...props.input}
          disabled={disabled}
          id={name}
          meta={meta}
          onKeyDown={props.onKeyDown}
          placeholder={placeholder}
          type={type}
        />
      )}
    </FormField>
  );
};

export default Text;
