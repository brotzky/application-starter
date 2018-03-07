import proxy from 'http-proxy-middleware';

const isDev = process.env.NODE_ENV === 'development';

/**
 * const env should always equal 'development' when webpack-dev-server
 * is executing. So we are creating our own --env.dev value.
 */

const env = {
  org: process.argv[2] || 'grow',
  env: process.argv[3] || 'dev',
};

if (!process.argv[2] && isDev) {
  throw new Error(
    'You must provide the organization and enviroment: > yarn start <organization> <env>',
  );
}

const target = `https://${env.org}-${env.env}-gac.poweredbygrow.com`;

export default proxy({ target, changeOrigin: true, secure: false });
