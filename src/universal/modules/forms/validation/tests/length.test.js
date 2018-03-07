import length from '../length';

const threeCharacters = length(3);

describe('[Form Validation] length', () => {
  describe('length()', () => {
    it('should return a function that will validate the length', () => {
      expect(length(3)).toMatchSnapshot();
    });

    it('should return no errors if a valid length string is passed in', () => {
      expect(threeCharacters('123')).toMatchSnapshot();
    });

    it('should return an error object when an invalid length is passed in', () => {
      expect(threeCharacters('1234')).toMatchSnapshot();
    });
  });
});
