import React from 'react';
import MoneyInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
import FormField from '../components/FormField';
import FieldLabel from '../components/FieldLabel';

const numberMask = createNumberMask({
  prefix: '$',
  allowDecimal: true,
});

const Money = props => {
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
    <FormField {...props}>
      {label && (
        <FieldLabel
          label={label}
          meta={meta}
          name={name}
          tooltip={tooltip}
          value={value}
        />
      )}
      <MoneyInput
        {...input}
        mask={numberMask}
        type={type || 'text'}
        id={name}
        step="0.01"
        min="0"
        disabled={disabled}
        placeholder={placeholder}
      />
    </FormField>
  );
};

export default Money;
