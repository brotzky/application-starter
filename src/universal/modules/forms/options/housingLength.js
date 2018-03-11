import stringifyRange from 'gac-utils/stringifyRange';

export default [
  {
    name: '0-2 years',
    value: stringifyRange({ min: 0.0, max: 2.0 }),
  },
  {
    name: '3-4 years',
    value: stringifyRange({ min: 3.0, max: 4.0 }),
  },
  {
    name: '5+ years',
    value: stringifyRange({ min: 5.0, max: null }),
  },
];
