#!/usr/bin/env node

require('babel-register')({
  plugins: [
    'dynamic-import-node',
    'transform-es2015-modules-commonjs',
    'transform-class-properties',
  ],
});

require('babel-polyfill');

require('../api/api');
