export default function cookies(req, res, next) {
  req.feathers.cookies = req.cookies;
  next();
}
