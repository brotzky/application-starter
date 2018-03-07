import React from 'react';
import { FadeIn } from '../../../ui/transitions';

const AccountSettingsItem = props => {
  const { isCurrent, isComplete, children } = props;

  return (
    <div className="AccountSettingsSection">
      <FadeIn>
        <div
          className={`AccountSettingsSection__inner  ${isCurrent
            ? 'AccountSettingsSection__inner--active'
            : isComplete ? '' : 'AccountSettingsSection__inner--disabled'}`}
        >
          {children}
        </div>
      </FadeIn>
    </div>
  );
};

export default AccountSettingsItem;
