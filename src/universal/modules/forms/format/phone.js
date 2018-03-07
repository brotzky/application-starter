const phoneFormat = value =>
  value.replace(/^\+1/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

export default phoneFormat;
