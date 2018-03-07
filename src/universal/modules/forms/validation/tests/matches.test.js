import matches from '../matches';

const matchesHello = matches('hello');

describe('[Form Validation] matches', () => {
  describe('matches()', () => {
    it('should return a function', () => {
      expect(matches('hello')).toMatchSnapshot();
    });

    it('should return no errors if the string matches string originally defined', () => {
      expect(matchesHello('hello')).toMatchSnapshot();
    });

    it('should return an error object when the string does not match the specific one', () => {
      expect(matchesHello('Hello')).toMatchSnapshot();
    });
  });
});
