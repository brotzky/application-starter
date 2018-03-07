export default function(min) {
  if (!min) return '';
  
  return function(value) {
    return value.length >= min
      ? undefined
      : {
          defaultMessage: `must be at least ${min} characters`,
          id: 'form.errors.minLength',
          values: { min: min },
        };
  }
}
