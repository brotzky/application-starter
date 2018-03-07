import React from 'react';

// Sugar to hide some divs and classes
const CreditBureauControlsContainer = ({ children }) =>
  <div className="CreditBureauOverview">
    <div className="CreditBureauBody">
      { children }
    </div>
  </div>;

export default CreditBureauControlsContainer;
