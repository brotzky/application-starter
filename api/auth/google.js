/**
 * NOTE:
 * This code is copied from SPECTRUM CHAT
 * Check out their amazing codebase here: https://github.com/withspectrum/spectrum
 * and checkout their amazing community here: https://spectrum.chat
 */

import { Router } from 'express';
import { createSigninRoutes } from './create-signin-routes';

const googleAuthRouter = Router();
const { main, callbacks } = createSigninRoutes('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
  ],
});

googleAuthRouter.get('/', main);

googleAuthRouter.get('/callback', ...callbacks);

export default googleAuthRouter;
