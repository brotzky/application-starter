export default function(value) {
  return value.toUpperCase() !== value
    ? undefined
    : {
        defaultMessage: 'must contain an uppercase letter',
        id: 'form.errors.uppercase',
      };
}
