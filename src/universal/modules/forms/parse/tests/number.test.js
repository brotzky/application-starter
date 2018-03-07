import number from '../number';

describe('[Form Field Parsing] number', () => {
  describe('number()', () => {
    it('should return an integer from a string', () => {
      expect(number('123')).toMatchSnapshot();
    });
  });
});
