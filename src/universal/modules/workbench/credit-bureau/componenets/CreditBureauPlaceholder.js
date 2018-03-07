import React from 'react';

const row = () => (
  <div
    style={{
      marginBottom: '50px'
    }}
  >
    <div
      style={{
        height: '12px',
        width: '660px',
        background: '#efefef',
        marginBottom: '15px'
      }}
    />
    <div
      style={{
        height: '12px',
        width: '660px',
        background: '#efefef',
        marginBottom: '15px'
      }}
    />
    <div
      style={{
        height: '12px',
        width: '600px',
        background: '#efefef',
        marginBottom: '15px'
      }}
    />
  </div>
);

const CreditBureauPlaceholder = () => {
  return (
    <div>
      {row()}
      {row()}
      {row()}
      {row()}
      {row()}
      {row()}
      {row()}
    </div>
  );
};

export default CreditBureauPlaceholder;
