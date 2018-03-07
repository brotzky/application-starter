import numeric from '../numeric';

describe('[Form Validation] numeric', () => {
  describe('numeric()', () => {
    it('should return an empty string if nothing is passed it', () => {
      expect(numeric()).toMatchSnapshot();
    });

    it('should return no errors if a string of numbers is passed in', () => {
      expect(numeric('1234')).toMatchSnapshot();
    });

    it('should return an error object when a non-number string is passed in', () => {
      expect(numeric('abc')).toMatchSnapshot();
    });
  });
});
