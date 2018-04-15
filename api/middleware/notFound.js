export default function notFound() {
  return (req, res, next) => {
    next(new Error('Page not found'));
  };
}
