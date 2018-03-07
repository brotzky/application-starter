import React from 'react';
import { FadeInFast } from '../../../ui/transitions/';

// Some sugar to make the components look cleaner
const CreditBureauContainer = ({ children }) =>
  <FadeInFast>
    <div className="CreditBureau">
      <div className="CreditBureauContainer">
        { children }
      </div>
    </div>
  </FadeInFast>;

export default CreditBureauContainer;
