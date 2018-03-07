export default function(value) {
  const stripNonDigits = value && value.replace(/[^0-9\.]+/g, '');
  return stripNonDigits ? parseFloat(stripNonDigits) : '';
}
