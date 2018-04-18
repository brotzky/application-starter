/**
 * NOTE:
 * This code is copied from SPECTRUM CHAT
 * Check out their amazing codebase here: https://github.com/withspectrum/spectrum
 * and checkout their amazing community here: https://spectrum.chat
 */

import { Router } from 'express';

const IS_PROD = process.env.NODE_ENV === 'production';
const HOME = IS_PROD ? '/' : 'http://localhost:8080/';
const logoutRouter = Router();

logoutRouter.get('/', (req, res) => {
  req.session = null;
  return res.redirect(HOME);
});

export default logoutRouter;
