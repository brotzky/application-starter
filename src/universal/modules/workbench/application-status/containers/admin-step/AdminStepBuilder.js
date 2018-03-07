import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { adminStepsProceed } from 'grow-actions/product-applications/product-applications-steps';
import { getWorkbench } from 'grow-actions/workbench/workbench';
import { updateQueueState } from '../../../../queue/actions/actions-update-queue-state';
import AccountSettingsComplete from '../../components/AccountSettingsComplete';
import AccountSettingsText from '../../components/AccountSettingsText';
import AccountSettingsItem from '../../components/AccountSettingsItem';
import { CheckCircleFilled } from '../../../../ui/icons';
import Spinner from '../../../../ui/spinner/spinner';

class AdminStepBuilder extends Component {
  state = { isUpdating: false };

  handleProceedClick = isOnCurrentStepWithPermissions => {
    const { dispatch, isLastStep, workbench } = this.props;

    if (isOnCurrentStepWithPermissions) {
      this.setState({ isUpdating: true });

      return dispatch(adminStepsProceed(workbench.id)).then(() => {
        this.setState({ isUpdating: false });

        if (isLastStep) {
          dispatch(getWorkbench(workbench.id));
          dispatch(updateQueueState('QUEUE_IS_STALE'));
        }
      });
    }
  };

  render() {
    const {
      header,
      subheader,
      isOnCurrentStepWithPermissions,
      completedThisStep,
      currentStepData,
      hasPermission,
      step,
    } = this.props;

    return (
      <AccountSettingsItem
        isComplete={completedThisStep}
        isCurrent={isOnCurrentStepWithPermissions}
      >
        <div
          className={`AccountSettingsCheck ${isOnCurrentStepWithPermissions
            ? 'AccountSettingsCheck--active'
            : ''}`}
        >
          <div className="AccountSettings__check">
            {completedThisStep ? (
              <CheckCircleFilled
                height="27"
                width="27"
                className="ChecklistItem__status-icon--success"
                id={`${step}_COMPLETE`}
              />
            ) : this.state.isUpdating ? (
              <Spinner size={27} color="#448aff" />
            ) : (
              <button
                id={step}
                onClick={() =>
                  this.handleProceedClick(isOnCurrentStepWithPermissions)}
                className={`
                        ChecklistItem__status--unchecked
                        ${isOnCurrentStepWithPermissions
                ? 'ChecklistItem__status--unchecked--active'
                : 'ChecklistItem__status--unchecked--disabled'}
                      `}
              />
            )}
          </div>
        </div>
        {completedThisStep ? (
          <AccountSettingsComplete header={header} data={currentStepData} />
        ) : (
          <div className="AccountSettings__check">
            <AccountSettingsText
              header={header}
              subheader={
                hasPermission ? (
                  subheader
                ) : (
                  'You do not have permission to complete this step'
                )
              }
              showSubheader={isOnCurrentStepWithPermissions}
            />
          </div>
        )}
      </AccountSettingsItem>
    );
  }
}

AdminStepBuilder.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  workbench: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
    ]),
  ).isRequired,
  isOnCurrentStepWithPermissions: PropTypes.bool,
  completedThisStep: PropTypes.bool,
  currentStepData: PropTypes.objectOf(PropTypes.object),
  hasPermission: PropTypes.bool.isRequired,
};

AdminStepBuilder.defaultProps = {
  isOnCurrentStepWithPermissions: false,
  completedThisStep: false,
  currentStepData: {},
};

const mapStateToProps = (state, ownProps) => {
  const { step, permission } = ownProps;
  const { adminSteps } = state.workbench;

  const hasPermission = permission
    ? Boolean(state.permissions.permissions[permission])
    : true;

  const isOnCurrentStepWithPermissions =
    adminSteps &&
    adminSteps.currentStep &&
    adminSteps.currentStep.name === step &&
    hasPermission;

  const completedThisStep =
    adminSteps &&
    adminSteps.steps &&
    adminSteps.steps.some(
      adminStep =>
        adminStep.name === step &&
        adminStep.data &&
        adminStep.data.proceedAudit &&
        adminStep.data.proceedAudit.firstName,
    );

  const currentStepData =
    adminSteps &&
    adminSteps.steps &&
    adminSteps.steps.find(adminStep => adminStep.name === step).data;

  return {
    workbench: state.workbench,
    isOnCurrentStepWithPermissions,
    completedThisStep,
    currentStepData,
    hasPermission,
  };
};

export default connect(mapStateToProps)(AdminStepBuilder);
