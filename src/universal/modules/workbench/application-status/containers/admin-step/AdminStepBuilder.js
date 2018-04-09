import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { adminStepsProceed } from 'grow-actions/product-applications/product-applications-steps';
import { getWorkbench } from 'grow-actions/workbench/workbench';
import { updateQueueState } from '../../../../queue/actions/actions-update-queue-state';
import { ease } from 'gac-utils/sc';
import AccountSettingsComplete from '../../components/AccountSettingsComplete';
import AccountSettingsText from '../../components/AccountSettingsText';
import AccountSettingsItem from '../../components/AccountSettingsItem';
import { CheckCircleFilled } from '../../../../ui/icons';
import { Spinner } from 'gac-ui/components/';

const AccountSettingsCheck = styled.div`
  border-right: 1px solid #efefef;
  height: 78px;
  padding: 0px 3rem;
  display: flex;
  align-items: center;
  ${props => (props.active ? `border-color: ${props.theme.colors.blue}` : '')};
`;

const AccountSettingsCheckCheck = styled.div`
  color: black;
  display: flex;
  align-items: center;
`;

const StyledCheckCircleFilled = styled(CheckCircleFilled)`
  width: 26px;
  height: 26px;
  rect {
    fill: white;
  }
  * {
    fill: ${props => props.theme.colors.blue};
  }
`;

const uncheckedActive = css`
  background: white;
  border-color: ${props => props.theme.colors.blue};
`;
const uncheckedDisabled = css`
  background: white;
  cursor: not-allowed;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: white;
  }
`;

const ChecklistItemStatusUnchecked = styled.button`
  position: relative;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  border: 1px solid rgb(173, 173, 173);
  cursor: pointer;
  ${ease('out')};

  &::before {
    opacity: 0;
    transform: scale(0.8);
    content: '';
    display: block;
    position: absolute;
    top: 4px;
    right: 4px;
    bottom: 4px;
    left: 4px;
    background: ${props => props.theme.colors.blue};
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    ${ease('out')};
  }

  &:hover {
    box-shadow: inset 0px -1px 3px rgba(0, 0, 0, 0.1);
    &::before {
      transform: scale(1);
      opacity: 1;
    }
  }

  ${props => (props.active ? uncheckedActive : uncheckedDisabled)};
`;

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
        <AccountSettingsCheck active={isOnCurrentStepWithPermissions}>
          <AccountSettingsCheckCheck>
            {completedThisStep ? (
              <StyledCheckCircleFilled
                height="27"
                width="27"
                id={`${step}_COMPLETE`}
              />
            ) : this.state.isUpdating ? (
              <Spinner size={27} color="#448aff" />
            ) : (
              <ChecklistItemStatusUnchecked
                id={step}
                onClick={() =>
                  this.handleProceedClick(isOnCurrentStepWithPermissions)
                }
                active={isOnCurrentStepWithPermissions}
              />
            )}
          </AccountSettingsCheckCheck>
        </AccountSettingsCheck>
        {completedThisStep ? (
          <AccountSettingsComplete header={header} data={currentStepData} />
        ) : (
          <AccountSettingsCheckCheck>
            <AccountSettingsText
              header={header}
              subheader={
                hasPermission
                  ? subheader
                  : 'You do not have permission to complete this step'
              }
              showSubheader={isOnCurrentStepWithPermissions}
            />
          </AccountSettingsCheckCheck>
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
        adminStep.data.proceedAudit.date,
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
