export default function(width, dir, color) {
  if (dir === 'up') {
    return `border-left: (${width} / 2) solid transparent;
  border-right: (${width} / 2) solid transparent;
  border-bottom: (${width} / 2) solid ${color};`;
  } else if (dir === 'down') {
    return `border-left: (${width} / 2) solid transparent;
  border-right: (${width} / 2) solid transparent;
  border-top: (${width} / 2) solid ${color};`;
  } else if (dir === 'right') {
    return `border-top: ${width} solid transparent;
  border-bottom: ${width} solid transparent;
  border-left: ${width} solid ${color};`;
  } else if (dir === 'left') {
    return `border-top: ${width} solid transparent;
  border-bottom: ${width} solid transparent;
  border-right: ${width} solid ${color};`;
  }
}
