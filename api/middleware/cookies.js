export default function(req, res, next) {
  req.feathers.cookies = req.cookies;
  next();
}
