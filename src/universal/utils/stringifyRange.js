export default (obj = {}) =>
  JSON.stringify({
    // When min === 0 it is falsey. We need to parse it to "0" and not null
    min: obj && (obj.min || obj.min === 0) ? Number(obj.min).toFixed(1) : null,
    max: obj && obj.max ? Number(obj.max).toFixed(1) : null,
  });
