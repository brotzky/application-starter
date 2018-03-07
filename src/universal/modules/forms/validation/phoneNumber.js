import validator from 'validator';

export default function(value) {
  if (!value) { return undefined; }
  
  const str = value || '';
  return validator.isMobilePhone(str, 'en-CA')
    ? undefined
    : {
        defaultMessage: 'must be a valid phone number',
        id: 'form.errors.invalidPhoneNumber',
        values: {},
      };
}
