import replace from '../replace';

const replaceSpace = replace(/\s/, '');

describe('[Form Field Parsing] replace', () => {
  describe('replace()', () => {
    it('should return a function', () => {
      expect(replace()).toMatchSnapshot();
    });

    it('should replace only a single value that is specific', () => {
      expect(replaceSpace('1 2 3')).toMatchSnapshot();
    });

    it('should replace a value in a string that is specific', () => {
      expect(replaceSpace('1 2')).toMatchSnapshot();
    });
  });
});
