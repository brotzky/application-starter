import numeral from 'numeral';

const currencyFormat = currency => numeral(currency).format('$ 0,0.00');

export default currencyFormat;
