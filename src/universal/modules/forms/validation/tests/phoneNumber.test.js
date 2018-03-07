import phoneNumber from '../phoneNumber';

describe('[Form Validation] phoneNumber', () => {
  describe('phoneNumber()', () => {
    it('should return undefined if nothing is passed it', () => {
      expect(phoneNumber()).toMatchSnapshot();
    });

    it('should return no errors if a valid phone number is passed in', () => {
      expect(phoneNumber('4169999999')).toMatchSnapshot();
    });

    it('should return an error when an invalid phone number is passed in', () => {
      expect(phoneNumber('123')).toMatchSnapshot();
    });
  });
});
