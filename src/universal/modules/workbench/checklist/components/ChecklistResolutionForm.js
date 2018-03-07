import React from 'react';
import { connect } from 'react-redux';
import ChecklistCorrectForm from '../containers/ChecklistCorrectForm';

const ChecklistResolutionForm = props => {
  const {
    checklistDetails,
    checklistItem: { name, prettyName, permissions = {} },
    isVerified,
    userPermissions,
  } = props;

  const hasPermission = permissions.edit
    ? Boolean(userPermissions[permissions.edit])
    : true;

  return (
    <div className="ChecklistResolution__conent">
      {hasPermission ? (
        <div>
          <p className="ChecklistResolution__text">
            {isVerified ? (
              `You are unresolving ${prettyName}`
            ) : (
              `Please enter your reasons for resolving ${prettyName}`
            )}
          </p>
          <ChecklistCorrectForm
            checklistItemDetails={checklistDetails[name]}
            {...props}
          />
        </div>
      ) : (
        <p style={{ margin: '15px auto 0' }}>
          You do not have permission to resolve the{' '}
          <strong>{prettyName}</strong> checklist item. Please ask an
          adminstrator to update your permissions to proceed.
        </p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  checklistDetails: state.checklist.checklistDetails,
  isFetchingDetails: state.checklist.isFetchingDetails,
  userPermissions: (state.permissions && state.permissions.permissions) || {},
});

export default connect(mapStateToProps)(ChecklistResolutionForm);
