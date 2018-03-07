export default function(value) {
  return value.toLowerCase() !== value
    ? undefined
    : {
        defaultMessage: 'must contain a lowercase letter',
        id: 'form.errors.lowercase',
      };
}
