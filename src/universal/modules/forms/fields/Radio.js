import React from 'react';
import { connect } from 'react-redux';
import { Field, getFormSyncErrors, hasSubmitFailed } from 'redux-form';
import styled from 'styled-components';
import FormField from '../components/FormField';
import FieldLabel from '../components/FieldLabel';

const Wrapper = styled.div`
  border: 1px solid
    ${props =>
      props.meta.error && props.meta.touched
        ? props.theme.colors.red
        : props.theme.inputs.border.color.default};
  border-radius: 2px;
  display: flex;
  align-items: center;
  height: ${props => props.theme.inputs.height};
  width: 100%;
`;

const RadioItem = styled.div`
  align-items: center;
  border-right: 1px solid
    ${props =>
      props.meta.error && props.meta.touched
        ? props.theme.colors.red
        : props.theme.inputs.border.color.default};
  display: flex;
  flex: 1;
  height: ${props => props.theme.inputs.height};
  padding: 0 ${props => props.theme.inputs.padding};
  font-size: ${props => props.theme.inputs.fontSize};

  &:last-child {
    border-right: 0;
  }

  input[type='radio'] {
    appearance: none;
    position: relative;
    border: 1px solid ${props => props.theme.colors.grey.mid};
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    height: 22px;
    width: 22px;

    &::before {
      background: ${props => props.theme.buttons.primary.background.hover};
      border-radius: 50%;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      transform: scale(0);
      transition: all 0.15s ease-out;
      width: 100%;
    }

    &:hover,
    &:focus {
      border-color: ${props => props.theme.buttons.primary.background.default};
    }

    &:checked {
      border-color: ${props => props.theme.buttons.primary.background.hover};

      &::before {
        transform: scale(0.75);
      }

      + label {
        color: ${props => props.theme.buttons.primary.background.hover};
      }
    }
  }
`;

const RadioItemLabel = styled.label`
  align-items: center;
  color: ${props => props.theme.colors.grey.mid};
  cursor: pointer;
  display: flex;
  flex: 1;
  margin-left: ${props => props.theme.inputs.padding};
`;

const Radio = props => {
  const { form, submitFailed, syncErrors } = props;
  const currentSyncErrors = syncErrors(form) || {};
  const failed = submitFailed(form);
  const meta = {
    error: currentSyncErrors[props.name],
    touched: failed,
  };

  return (
    <FormField>
      <FieldLabel
        htmlFor={props.name}
        label={props.label}
        meta={meta}
        tooltip={props.tooltip}
      />
      <Wrapper meta={meta}>
        {props.options.map(option => {
          const { format, name, parse, value } = option;

          return (
            <RadioItem meta={meta} key={value}>
              <Field
                component="input"
                format={format}
                id={`${props.name}${name}`}
                name={props.name}
                parse={parse}
                type="radio"
                value={value}
                validate={props.validate}
                disabled={props.disabled}
              />
              <RadioItemLabel htmlFor={`${props.name}${name}`}>
                <span>{name}</span>
              </RadioItemLabel>
            </RadioItem>
          );
        })}
      </Wrapper>
    </FormField>
  );
};

const mapStateToProps = state => ({
  submitFailed: formName => hasSubmitFailed(formName)(state),
  syncErrors: formName => getFormSyncErrors(formName)(state),
});

export default connect(mapStateToProps)(Radio);
