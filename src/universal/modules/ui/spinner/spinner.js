import React from 'react';

// const isIE = !!window.MSInputMethodContext && !!document.documentMode;

const Spinner = ({
  size = 24,
  strokeWidth = 6,
  className = '',
  color = '#fff',
}) => {
  // if (isIE) {
  //   return <div className={`spinner-ie ${className}`} />;
  // }
  return (
    <div className={`Spinner ${className}`}>
      <svg
        className="Spinner__spinner"
        width={size}
        height={size}
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
};

export default Spinner;
