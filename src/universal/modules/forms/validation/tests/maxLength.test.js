import maxLength from '../maxLength';

const checkIfOverThree = maxLength(3);

describe('[Form Validation] maxLength', () => {
  describe('maxLength()', () => {
    it('should return an empty string if nothing is passed it', () => {
      expect(maxLength()).toMatchSnapshot();
    });

    it('should return a function', () => {
      expect(maxLength(3)).toMatchSnapshot();
    });

    it('should return no errors if the number passed is less than the originally specified amount', () => {
      expect(checkIfOverThree('123')).toMatchSnapshot();
    });

    it('should return an error object when an amount over the specified is passed in', () => {
      expect(checkIfOverThree('1234')).toMatchSnapshot();
    });
  });
});
