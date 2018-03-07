import validator from 'validator';

export default function(value) {
  return validator.isAlphanumeric(value)
    ? undefined
    : {
        defaultMessage: 'cannot contain special characters',
        id: 'form.errors.alphaNumeric',
        values: {},
      };
}
