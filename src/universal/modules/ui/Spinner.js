import React from 'react';

const Spinner = ({
  size = 24,
  strokeWidth = 6,
  className = '',
  color = 'white',
}) => {
  // if (isIE) {
  //   return <div className={`Spinner-ie ${className}`}></div>;
  // } else {
  return (
    <div className={`Spinner ${className}`}>
      <svg
        className="Spinner__spinner"
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px` }}
        viewBox="0 0 66 66"
      >
        <circle
          className="Spinner__circle"
          stroke={color}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </div>
  );
  // }
};

export default Spinner;
