import validator from 'validator';

export default function(value) {
  if (!value) {
    return '';
  }
  
  const valueString = value > -1 ? value.toString() : '';
  return validator.isNumeric(valueString)
    ? undefined
    : {
        defaultMessage: 'can only contain numbers',
        id: 'form.errors.numeric',
        values: {},
      };
}
