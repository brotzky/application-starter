import proxy from 'http-proxy-middleware';
import url from 'url';
const isDev = process.env.NODE_ENV === 'development';

/**
 * const env should always equal 'development' when webpack-dev-server
 * is executing. So we are creating our own --env.dev value.
 */
const env = {
  env: process.argv[2] || 'dev',
};

const target = 'localhost:8081';

function buildEnvOnRequest(req) {
  const host = req.get('host');
  const subdomain = host.split('.')[0].split('-');
  const domainEnv = subdomain[1];

  // Workaround for localhost
  if (host.includes('localhost')) {
    return {
      env: env.env,
    };
  }

  return {
    env: domainEnv,
  };
}

export function buildDynamicTarget(req) {
  const { env } = buildEnvOnRequest(req);

  return `https://api-${env}.appspot.com`;
}

export function buildDynamicHeaders(proxyReq, req, res) {
  const { env } = buildEnvOnRequest(req);

  const forwardHost = `${env}.example.com`;

  proxyReq.setHeader('X-Forwarded-Host', forwardHost);
}

export default function() {
  return proxy({
    target,
    changeOrigin: true,
    secure: false,
    router: buildDynamicTarget,
    onProxyReq: buildDynamicHeaders,
  });
}
