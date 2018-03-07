import minLength from '../minLength';

const atLeastThreeCharacters = minLength(3);

describe('[Form Validation] minLength', () => {
  describe('minLength()', () => {
    it('should return an empty string if nothing is passed it', () => {
      expect(minLength()).toMatchSnapshot();
    });

    it('should return a function', () => {
      expect(minLength(3)).toMatchSnapshot();
    });

    it('should return no errors if the number passed is more than the originally specified amount', () => {
      expect(atLeastThreeCharacters('1234')).toMatchSnapshot();
    });

    it('should return an error object when an amount less than specified is passed in', () => {
      expect(atLeastThreeCharacters('1')).toMatchSnapshot();
    });
  });
});
