require('babel-register')({
  plugins: [
    'dynamic-import-node',
    'transform-es2015-modules-commonjs',
    'transform-class-properties',
  ],
});

require('isomorphic-fetch');

if (process.env.NODE_ENV === 'production') {
  require('./server');
} else {
  require('./server');
}
