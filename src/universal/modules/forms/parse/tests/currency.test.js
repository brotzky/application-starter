import currency from '../currency';

describe('[Form Field Parsing] currency', () => {
  describe('currency()', () => {
    it('should strip a currency string formatting and return a number', () => {
      expect(currency('$1,000.00')).toMatchSnapshot();
    });
  });
});
