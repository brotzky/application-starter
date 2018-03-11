import React from 'react';
import MaskedInput from 'react-text-mask';
import styled from 'styled-components';
import validator from 'validator';
import FormField from '../components/FormField';
import { ease } from 'gac-utils/sc';

const PHONE_NUMBER_INVALID = 'Please enter a valid phone number';
const StyledMaskedInput = styled(MaskedInput)`
  appearance: none;
  border: none;
  width: 100%;
  height: 20px;
  padding: 1.6rem;
  color: ${props => props.theme.colors.blue};
  background: white;
  ${ease('out')};
  flex: 1;

  &:focus,
  &:active {
    outline: none;
    border-color: ${props => props.theme.colors.blue};
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  &::-moz-placeholder {
    color: #bbb;
  }

  &:-ms-input-placeholder {
    color: #bbb;
  }
`;

export const isValid = value => {
  let error;
  let valid;
  const phoneNumberRaw = value.replace(/[-()\s]/g, '');

  if (!validator.isMobilePhone(phoneNumberRaw, 'en-US')) {
    error = PHONE_NUMBER_INVALID;
    valid = false;
  }

  return {
    error,
    valid,
  };
};

const showErrorState = props =>
  (props.submissionErrors &&
    props.submissionErrors.includes('INVALID_PHONE_NUMBER')) ||
  (props.meta.submitFailed && props.meta.error) ||
  (props.meta.error && props.meta.touched) ||
  (props.meta.error && props.meta.value && props.meta.pristine);

const Phone = props => (
  <FormField
    {...props}
    label={'Phone Number'}
    hasError={showErrorState(props)}
    inlineMessage={PHONE_NUMBER_INVALID}
    showInlineMessageByDefault={false}
  >
    <StyledMaskedInput
      {...props.input}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      type="tel"
      name="tel"
      id={props.name}
      autoFocus={props.meta.active}
      placeholder={props.placeholder || '(###) ###-####'}
    />
  </FormField>
);
export default Phone;
