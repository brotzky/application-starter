import fetch from 'isomorphic-fetch';
import errors from '@feathersjs/errors';
import { buildDynamicTarget } from '../../src/server/middleware/proxy';
import { buildHeaders } from 'grow-actions/api';

export default (async function auth(req, res, next) {
  const cookies = req.feathers.cookies;
  const authError = new errors.NotAuthenticated('UNAUTHENTICATED').toJSON();
  const generalError = new errors.GeneralError(
    new Error('INTERNAL_SERVER'),
  ).toJSON();

  // Eject early if there's no SID to be found
  if (!cookies.SID) {
    return next(new errors.NotAuthenticated());
  }

  // Otherwise, build the auth request
  const target = buildDynamicTarget(req);
  const headers = buildHeaders(target, cookies);
  const endpoint = `${target}/v1/auth/check`;

  try {
    const response = await fetch(endpoint, { headers });
    const data = await response.json();

    if (
      response.body.status === 401 ||
      (data && data.errors[0] === 'LOGIN_FAILED')
    ) {
      return next(authError);
    }
  } catch (err) {
    console.warn(err);
    return next(generalError);
  }

  next();
});
