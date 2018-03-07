import percentage from '../percentage';

describe('[Form Validation] percentage', () => {
  describe('percentage()', () => {
    it('should return a function', () => {
      expect(percentage()).toMatchSnapshot();
    });

    it('should return an empty string if nothing is passed it', () => {
      expect(percentage()()).toMatchSnapshot();
    });

    it('should return no errors if a percentage less than 100 is passed in', () => {
      expect(percentage('100', 'max')('99%')).toMatchSnapshot();
    });

    it('should return no errors if a percentage greater than 100 is passed in', () => {
      expect(percentage('100', 'min')('101%')).toMatchSnapshot();
    });

    it('should return no errors if a percentage less than 100 is passed in', () => {
      expect(percentage('100', 'random')('101')).toMatchSnapshot();
    });

    it('should return an error when a percentage over 100 is passed in', () => {
      expect(percentage('100', 'max')('120')).toMatchSnapshot();
    });

    it('should return an error when a percentage less than 100 is passed in', () => {
      expect(percentage('100', 'min')('90')).toMatchSnapshot();
    });

    it('should return an error when a percentage less than 100 is passed in, with comparison string being a random string other than "max"', () => {
      expect(percentage('100', 'random')('99')).toMatchSnapshot();
    });

    it('should return no error when a percentage passed in equals to the percentage in comparison ("max" comparison)', () => {
      expect(percentage('91', 'max')('91')).toMatchSnapshot();
    });

    it('should return no error when a percentage passed in equals to the percentage in comparison ("min" comparison)', () => {
      expect(percentage('90', 'min')('90')).toMatchSnapshot();
    });

    it('should return no error when a percentage passed in equals to the percentage in comparison ("random" comparison)', () => {
      expect(percentage('80', 'random')('80')).toMatchSnapshot();
    });
  });
});
