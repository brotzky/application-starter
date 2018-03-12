require('babel-register')({
  plugins: [
    'dynamic-import-node',
    'transform-es2015-modules-commonjs',
    'transform-class-properties',
  ],
});

require('isomorphic-fetch');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

require('./server');
