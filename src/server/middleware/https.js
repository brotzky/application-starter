/**
 * Create a middleware to redirect http requests to https
 * @param {Object} options Options
 * @returns {Function} The express middleware handler
 */
export default function(options) {
  options = options || {};
  const httpsPort = options.httpsPort || 443;

  return function(req, res, next) {
    if (req.protocol !== 'https' && process.env.NODE_ENV !== 'development') {
      const parts = req.get('host').split(':');
      const host = parts[0] || 'localhost';

      return res.redirect('https://' + host + ':' + httpsPort + req.url);
    }
    next();
  };
}
