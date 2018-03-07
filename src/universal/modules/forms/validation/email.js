import validator from 'validator';

export default function(value) {
  return validator.isEmail(value)
    ? undefined
    : {
        defaultMessage: 'must be a valid email address',
        id: 'form.errors.email',
        values: {},
      };
}
