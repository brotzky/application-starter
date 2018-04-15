export default function errorHandler() {
  return function(error, req, res, next) {
    // Required to stay consistent with core backend
    const appError = {
      data: null,
      errorMessage: null,
      errors: [],
    };

    error.code = !isNaN(parseInt(error.code, 10))
      ? parseInt(error.code, 10)
      : 500;
    const formatter = {};

    // Don't show stack trace if it is a 404 error
    if (error.code === 404) {
      error.stack = null;
    }

    formatter['application/json'] = function() {
      delete error.type;

      if (process.env.NODE_ENV === 'production') {
        delete error.stack;
      }

      appError.code = error.code;
      appError.errors = [error.message];

      res.set('Content-Type', 'application/json');
      res.json(appError);
    };

    res.status(error.code);

    const contentType = req.headers['content-type'] || '';
    const accepts = req.headers.accept || '';

    formatter['application/json'](error, req, res, next);
  };
}
