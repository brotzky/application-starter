import React from 'react';
import moment from 'moment';

export const AccountSettingsComplete = ({ data, header }) => {
  const { proceedAudit } = data;

  return (
    <div className="AccountSettingsCompleteContainer">
      <div className="AccountSettingsComplete">
        <div className="AccountSettingsComplete__top">{header}</div>
        <div className="AccountSettingsComplete__sub">
          Completed by {proceedAudit.firstName} {proceedAudit.lastName}{' '}
          {moment(proceedAudit.date).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsComplete;
