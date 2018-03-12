const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env
      .PORT || 3000}/dist/`,
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/',
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
  },
  environment,
);
