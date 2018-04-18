/**
 * NOTE:
 * This code is copied from SPECTRUM CHAT
 * Check out their amazing codebase here: https://github.com/withspectrum/spectrum
 * and checkout their amazing community here: https://spectrum.chat
 */

import { Router } from 'express';
import { createSigninRoutes } from './create-signin-routes';

const githubAuthRouter = Router();
const { main, callbacks } = createSigninRoutes('github', {
  scope: ['read:user,user:email'],
});

githubAuthRouter.get('/', main);

githubAuthRouter.get('/callback', ...callbacks);

export default githubAuthRouter;
