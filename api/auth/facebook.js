/**
 * NOTE:
 * This code is copied from SPECTRUM CHAT
 * Check out their amazing codebase here: https://github.com/withspectrum/spectrum
 * and checkout their amazing community here: https://spectrum.chat
 */

import { Router } from 'express';
import { createSigninRoutes } from './create-signin-routes';

const facebookAuthRouter = Router();
const { main, callbacks } = createSigninRoutes('facebook', {
  scope: ['email'],
});

facebookAuthRouter.get('/', main);

facebookAuthRouter.get('/callback', ...callbacks);

export default facebookAuthRouter;
