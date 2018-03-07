import numeral from 'numeral';

export default function(min) {
  return function(value) {
    return value < min
      ? {
          defaultMessage: 'cannot be less than {amount}',
          id: 'form.errors.minDollarAmount',
          values: { amount: numeral(min).format('$0,00') },
        }
      : undefined;
  };
}
