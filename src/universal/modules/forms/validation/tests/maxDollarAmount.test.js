import maxDollarAmount from '../maxDollarAmount';

const maxOneHundred = maxDollarAmount(100);

describe('[Form Validation] maxDollarAmount', () => {
  describe('maxDollarAmount()', () => {
    it('should return a function', () => {
      expect(maxDollarAmount(100)).toMatchSnapshot();
    });

    it('should return no errors if the number passed is less than the originally specified amount', () => {
      expect(maxOneHundred(0)).toMatchSnapshot();
    });

    it('should return an error object when an amount over the specified is passed in', () => {
      expect(maxOneHundred(200)).toMatchSnapshot();
    });
  });
});
