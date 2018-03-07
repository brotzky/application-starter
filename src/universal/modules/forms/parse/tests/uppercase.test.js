import uppercase from '../uppercase';

describe('[Form Field Parsing] uppercase', () => {
  describe('uppercase()', () => {
    it('should return an uppercase version of a string', () => {
      expect(uppercase('abc')).toMatchSnapshot();
    });
  });
});
