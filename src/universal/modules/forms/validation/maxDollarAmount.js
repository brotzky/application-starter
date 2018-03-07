import numeral from 'numeral';

export default function(max) {
  if (!max) {
    return '';
  }
  return function(value) {
    return value > max
      ? {
          defaultMessage: 'cannot be more than {amount}',
          id: 'form.errors.maxDollarAmount',
          values: { amount: numeral(max).format('$0,00') },
        }
      : undefined;
  }
}
