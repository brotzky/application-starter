import React from 'react';
import styled from 'styled-components';
import FormField from '../components/FormField';

const Label = styled.label`
  color: ${props => props.theme.colors.greyMidDark};
  display: inline-block;
  font-size: 1.4rem;
  position: relative;
  cursor: pointer;
  margin-bottom: 2rem;

  &:before {
    display: inline-block;
    width: 26px;
    height: 26px;
    content: '';
    vertical-align: middle;
    margin-right: 1.125rem;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.grey.light};
  }

  span {
    margin-left: ${props => `${props.theme.space / 1.5}rem`};
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  &:focus + label:before,
  &:active + label:before {
    border-color: ${props =>
    props.meta.active
      ? props.theme.inputs.border.color.focus
      : props.theme.inputs.border.color.default};
  }

  &:checked + label::before {
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE4cHgiIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwgMCkiPgo8cG9seWxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iNiwxMiAxMCwxNiAxOCw4IAoiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz4KPC9nPjwvc3ZnPg==');
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #448aff;
    border-color: #448aff;
  }
`;

const LabelError = styled.div`
  color: ${props => props.theme.colors.red};
  margin-bottom: ${props => `${props.theme.space / 2}rem`};
`;

const Checkbox = props => {
  const { input = {}, label = '', meta = {} } = props;
  const { name, value } = input;

  return (
    <FormField>
      {meta.touched && meta.error && <LabelError>* Required</LabelError>}
      <Input
        {...input}
        checked={value}
        id={name}
        meta={meta}
        type="checkbox"
        value={value}
      />
      <Label htmlFor={name}>{label}</Label>
    </FormField>
  );
};

export default Checkbox;
