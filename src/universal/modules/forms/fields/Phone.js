import React from 'react';
import MaskedInput from 'react-text-mask';
import validator from 'validator';
import FormField from '../components/FormField';

const PHONE_NUMBER_INVALID = 'Please enter a valid phone number';

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
    <MaskedInput
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
      className={`FormInput ${props.className}Input`}
    />
  </FormField>
);

export default Phone;
