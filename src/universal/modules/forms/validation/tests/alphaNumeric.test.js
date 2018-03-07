import alphaNumeric from '../alphaNumeric';

describe('[Form Validation] alphaNumeric', () => {
  describe('alphaNumeric()', () => {
    it('should return no errors if a string of numbers is passed in', () => {
      expect(alphaNumeric('111')).toMatchSnapshot();
    });

    it('should return no errors if a string of only alphabetical letters is passed in', () => {
      expect(alphaNumeric('asdf')).toMatchSnapshot();
    });

    it('should return an error object when special characeters are passed in', () => {
      expect(alphaNumeric('&!(#')).toMatchSnapshot();
    });
  });
});
