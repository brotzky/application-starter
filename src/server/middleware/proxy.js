import proxy from 'http-proxy-middleware';

const isDev = process.env.NODE_ENV === 'development';

/**
 * const env should always equal 'development' when webpack-dev-server
 * is executing. So we are creating our own --env.dev value.
 */

const env = {
  org: process.argv[2] || 'demo',
  env: process.argv[3] || 'dev',
};

if (!process.argv[2] && isDev) {
  throw new Error(
    'You must provide the organization and enviroment: > yarn start <organization> <env>',
  );
}

const forwardHost = `${env.org}-${env.env}-gac.poweredbygrow.com`;
const appspot = `https://admin-api-dot-grow-${env.org}-${env.env}.appspot.com`;
const headers = {
  'X-Forwarded-Host': forwardHost,
};

export default proxy({
  target: appspot,
  headers,
  changeOrigin: true,
  secure: false,
});
