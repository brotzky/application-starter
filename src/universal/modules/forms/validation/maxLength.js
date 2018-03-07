export default function(max) {
  if (!max) {
    return '';
  }

  return function(value) {
    return value.length <= max
      ? undefined
      : {
          defaultMessage: 'cannot be more than {max} characters',
          id: 'form.errors.maxLength',
          values: { max: max },
        };
  }
}
