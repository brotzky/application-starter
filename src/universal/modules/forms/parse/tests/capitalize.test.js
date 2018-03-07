import capitalize from '../capitalize';

describe('[Form Field Parsing] capitalize', () => {
  describe('capitalize()', () => {
    it('should make the first letter capital of a string', () => {
      expect(capitalize('hello')).toMatchSnapshot();
    });
  });
});
