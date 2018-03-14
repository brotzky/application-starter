export default function(req, res, next) {
  res.set({
    'Strict-Transport-Security': 'max-age=31536000',
  });

  next();
}
