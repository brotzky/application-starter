export default function(percent, comparison) {
  return function(value) {
    if (!value) {
      return '';
    }
    const percentFloat = parseFloat(value.replace(/%/g, ''));
    if (comparison === 'max') {
      return percentFloat <= percent
        ? undefined
        : {
            defaultMessage: `cannot be greater than ${percent}%`,
            id: 'form.errors.percentage1',
            values: {},
          };
    } else {
      return percentFloat >= percent
        ? undefined
        : {
            defaultMessage: `cannot be less than ${percent}%`,
            id: 'form.errors.percentage1',
            values: {},
          };
    }
  };
}
