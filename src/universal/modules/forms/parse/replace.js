export default function(target, replacement) {
  return function(value) {
    const valueStr = value && value.toString();
    return valueStr ? valueStr.replace(target, replacement) : '';
  };
}
