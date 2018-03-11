const easing = {
  in: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  'in-out': 'cubic-bezier(0.86, 0, 0.07, 1)',
  'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export default function(type = 'out', speed = 0.25) {
  switch (type) {
    case 'in':
      return `transition: all ${speed}s ${easing.in}`;
    case 'in-back':
      return `transition: all ${speed}s ${easing['in-back']}`;
    case 'out-back':
      return `transition: all ${speed}s ${easing['out-back']}`;
    case 'in-out':
      return `transition: all ${speed}s ${easing['in-out']}`;
    case 'in-out-back':
      return `transition: all ${speed}s ${easing['in-out-back']}`;
    case 'out':
    default:
      return `transition: all ${speed}s ${easing.out}`;
  }
}
