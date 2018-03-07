export default function(length) {
  return function(value) {
    const valueString = value && value.toString();
    return valueString.length === length
      ? undefined
      : {
          defaultMessage: 'should be {length} characters',
          id: 'form.errors.length',
          values: { length: length },
        };
  }
}
