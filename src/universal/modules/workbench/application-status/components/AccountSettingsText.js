import React from 'react';

export const AccountSettingsText = ({ header, subheader, showSubheader }) => {
  return (
    <div className="AccountSettingsText">
      <h4 className="AccountSettingsText__header">
        {header}
      </h4>
      {!showSubheader &&
        <p className="AccountSettingsText__subheader">
          {subheader}
        </p>}
    </div>
  );
};

export default AccountSettingsText;
