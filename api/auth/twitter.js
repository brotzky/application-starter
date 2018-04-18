/**
 * NOTE:
 * This code is copied from SPECTRUM CHAT
 * Check out their amazing codebase here: https://github.com/withspectrum/spectrum
 * and checkout their amazing community here: https://spectrum.chat
 */

import { Router } from 'express';
import { createSigninRoutes } from './create-signin-routes';

const twitterAuthRouter = Router();
const { main, callbacks } = createSigninRoutes('twitter');

twitterAuthRouter.get('/', main);

twitterAuthRouter.get('/callback', ...callbacks);

export default twitterAuthRouter;
