// Affordability calculator: get items by its source
export default (fields, index) => ({
  transactions: fields.get(index).source === 'TRANSACTIONS',
  manual: fields.get(index).source === 'MANUAL',
  bureau: fields.get(index).source === 'BUREAU',
  both: fields.get(index).source === 'BOTH',
  'new-row': fields.get(index).source === undefined, // for new rows
});
