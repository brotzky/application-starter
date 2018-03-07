import validator from 'validator';

export default function(match, err = 'is not valid') {
  return function(value) {
    return validator.matches(value, match)
      ? undefined
      : {
          defaultMessage: `${err.defaultMessage}`,
          id: err.id || 'form.errors.matches',
          values: { err: err },
        };
  };
}
