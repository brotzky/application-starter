// filtered items based on the toggle so we can get the right amount in total
export default function(
  calculator = [],
  isManualToggled,
  isTransactionsToggled,
  isBureauToggled,
  isBothToggled,
) {
  return calculator.filter(
    item =>
      (item.source === 'MANUAL' && isManualToggled) ||
      (item.source === 'TRANSACTIONS' && isTransactionsToggled) ||
      (item.source === 'BUREAU' && isBureauToggled) ||
      (item.source === 'BOTH' && isBothToggled) ||
      item.source === undefined, // this is for new rows that is just an empty object
  );
}
