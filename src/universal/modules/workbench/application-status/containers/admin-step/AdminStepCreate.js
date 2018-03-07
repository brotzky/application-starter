import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../../../ui/modal/actions/actions-modal';
import AccountSettingsItem from '../../components/AccountSettingsItem';
import AccountSettingsComplete from '../../components/AccountSettingsComplete';
import AccountSettingsText from '../../components/AccountSettingsText';
import { CheckCircleFilled } from '../../../../ui/icons';
import { permissionSelector } from 'gac-utils/selectors';

const AdminStepCreate = props => {
  const { adminSteps, dispatch, hasPermission, workbench, user } = props;

  const isClaimed = workbench.primaryRep.email === user.email;

  const isOnComplianceWithPermission =
    adminSteps &&
    adminSteps.currentStep &&
    adminSteps.currentStep.name === 'COMPLIANCE' &&
    hasPermission;

  const completedCompliance =
    adminSteps &&
    adminSteps.steps &&
    adminSteps.steps.some(
      step =>
        step.name === 'COMPLIANCE' &&
        step.data &&
        step.data.proceedAudit &&
        step.data.proceedAudit.firstName,
    );

  const complianceData = (adminSteps &&
    adminSteps.steps &&
    adminSteps.steps.find(step => step.name === 'COMPLIANCE').data) || {
    name: '',
  };

  return (
    <div style={{ marginBottom: '3.9375rem' }}>
      <AccountSettingsItem
        isComplete={completedCompliance}
        isCurrent={isOnComplianceWithPermission}
      >
        <div
          className={`AccountSettingsCheck ${isOnComplianceWithPermission
            ? 'AccountSettingsCheck--active'
            : ''}`}
        >
          <div className="AccountSettings__check">
            {completedCompliance ? (
              <CheckCircleFilled
                height="27px"
                width="27px"
                className="ChecklistItem__status-icon--success"
                id={`${complianceData.name}_COMPLETE`}
              />
            ) : (
              <div
                id={complianceData.name}
                onClick={() =>
                  dispatch(
                    showModal('ACCOUNT_SETTINGS_MODAL', {
                      isClaimed,
                      dispatch,
                    }),
                  )}
                className={`
                      ChecklistItem__status--unchecked
                      ${isOnComplianceWithPermission
                        ? 'ChecklistItem__status--unchecked--active'
                        : 'ChecklistItem__status--unchecked--disabled'}
                    `}
              />
            )}
          </div>
        </div>

        <div className="AccountSettingsDetails">
          {completedCompliance ? (
            <AccountSettingsComplete
              header="Compliance & Create Account"
              data={complianceData}
            />
          ) : (
            <div className="AccountSettings__check">
              <AccountSettingsText
                header="KYC Review & Create Account"
                subheader={
                  hasPermission ? (
                    'Application status must be in Review and all checklists must be verified to proceed'
                  ) : (
                    'You do not have permission to complete this step'
                  )
                }
                showSubheader={isOnComplianceWithPermission}
              />
            </div>
          )}
        </div>
      </AccountSettingsItem>
    </div>
  );
};

const mapStateToProps = state => ({
  checklist: state.checklist,
  workbench: state.workbench,
  adminSteps: state.workbench.adminSteps,
  user: state.user,
  member: state.member,
  hasPermission: permissionSelector(state, 'EDIT_ADMINISTRATOR'),
});

export default connect(mapStateToProps)(AdminStepCreate);
