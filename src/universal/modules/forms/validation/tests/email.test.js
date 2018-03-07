import email from '../email';

describe('[Form Validation] email', () => {
  describe('email()', () => {
    it('should return no errors if a valid email is passed in', () => {
      expect(email('test@test.com')).toMatchSnapshot();
    });

    it('should return an error object when an invalid email is passed in', () => {
      expect(email('bademail')).toMatchSnapshot();
    });
  });
});
