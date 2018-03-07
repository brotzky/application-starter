import required from '../required';

describe('[Form Validation] required', () => {
  describe('required()', () => {
    it('should return an error object if nothing is passed it', () => {
      expect(required()).toMatchSnapshot();
    });

    it('should return no errors if a string is passed in', () => {
      expect(required('string')).toMatchSnapshot();
    });

    it('should return no errors if 0 is passed in', () => {
      expect(required(0)).toMatchSnapshot();
    });
  });
});
