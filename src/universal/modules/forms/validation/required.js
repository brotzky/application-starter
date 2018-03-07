export default function(value) {
  // Allow 0
  if (typeof value === 'string') {
    if (value.trim().length <= 0) {
      return {
        defaultMessage: ' is required',
        id: 'form.errors.isRequired',
        values: {},
      };
    }
  }
  return value !== undefined && value !== null && value !== ''
    ? undefined
    : {
        defaultMessage: ' is required',
        id: 'form.errors.isRequired',
        values: {},
      };
}
