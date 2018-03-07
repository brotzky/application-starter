import minDollarAmount from '../minDollarAmount';

const minFiveDollars = minDollarAmount(5);

describe('[Form Validation] minDollarAmount', () => {
  describe('minDollarAmount()', () => {
    it('should return a function', () => {
      expect(minDollarAmount(5)).toMatchSnapshot();
    });

    it('should return no errors if the number passed is more than the originally specified amount', () => {
      expect(minFiveDollars(10)).toMatchSnapshot();
    });

    it('should return an error object when an amount less than specified is passed in', () => {
      expect(minFiveDollars(0)).toMatchSnapshot();
    });
  });
});
