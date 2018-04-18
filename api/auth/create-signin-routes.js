/**
 * NOTE:
 * This code is copied from SPECTRUM CHAT
 * Check out their amazing codebase here: https://github.com/withspectrum/spectrum
 * and checkout their amazing community here: spectrum.chat
 *
 * A reusable set of routes for signing in with different providers. Handles token-based authentication.
 * Usage:
 *
 * const { main, callbacks } = createSigninRoutes('facebook');
 * facebookRouter.get('/', main);
 * facebookRouter.get('/callback', ...callbacks);
 */
import passport from 'passport';
import { URL } from 'url';
import { signCookie, getCookies } from 'shared/cookie-utils';

const IS_PROD = process.env.NODE_ENV === 'production';

export const createSigninRoutes = (strategy, strategyOptions) => {
  return {
    // The main route takes care of storing the redirect URL in the session
    // and passing the right options
    main: (req, ...rest) => {
      let url = FALLBACK_URL;
      if (typeof req.query.r === 'string' && isSpectrumUrl(req.query.r)) {
        url = req.query.r;
      }

      // Attach the redirectURL and authType to the session so we have it in the /auth/twitter/callback route
      // $FlowIssue
      req.session.redirectUrl = url;
      if (req.query.authType === 'token') {
        // $FlowIssue
        req.session.authType = 'token';
      }

      return passport.authenticate(strategy, strategyOptions)(req, ...rest);
    },
    // The callbacks take care of authenticating, setting the response cookies,
    // redirecting to the right place and handling tokens
    callbacks: [
      passport.authenticate(strategy, {
        failureRedirect: IS_PROD ? '/' : 'http://localhost:3000/',
      }),
      (req, res) => {
        const redirectUrl = req.session.redirectUrl
          ? new URL(req.session.redirectUrl)
          : new URL(FALLBACK_URL);
        redirectUrl.searchParams.append('authed', 'true');

        // Add the session cookies to the query params if token authentication
        if (
          req.session.authType === 'token' &&
          req.cookies &&
          req.cookies.session &&
          req.cookies['session.sig']
        ) {
          const cookies = getCookies(req.session.passport);

          redirectUrl.searchParams.append(
            'accessToken',
            signCookie(
              `session=${cookies.session}; session.sig=${
                cookies['session.sig']
              }`,
            ),
          );
          req.session.authType = undefined;
        }

        req.session.redirectUrl = undefined;
        return res.redirect(redirectUrl.href);
      },
    ],
  };
};
