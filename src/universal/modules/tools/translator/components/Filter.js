import React from 'react';

export default ({ active, onClick, children }) => (
  <button onClick={onClick}>
    {children} {active ? 'ON' : 'OFF'}
  </button>
);
