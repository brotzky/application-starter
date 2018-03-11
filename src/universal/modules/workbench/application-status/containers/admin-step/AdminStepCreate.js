import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { ease } from 'gac-utils/sc';
import { showModal } from '../../../../ui/modal/actions/actions-modal';
import AccountSettingsItem from '../../components/AccountSettingsItem';
import AccountSettingsComplete from '../../components/AccountSettingsComplete';
import AccountSettingsText from '../../components/AccountSettingsText';
import { CheckCircleFilled } from '../../../../ui/icons';
import { permissionSelector } from 'gac-utils/selectors';

const AccountSettingsCheck = styled.div`
  border-right: 1px solid #efefef;
  height: 78px;
  padding: 0px 3rem;
  display: flex;
  align-items: center;
  ${props =>
    props.active ? `border-color: ${props.theme.banks.grow.pri}` : ''};
`;

const AccountSettingsCheckCheck = styled.div`
  color: black;
  display: flex;
  align-items: center;
`;

const StyledCheckCircleFilled = styled(CheckCircleFilled)`
  width: 26px;
  height: 26px;
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
    box-shadow: 0px 1px 1px rgba(black, 0.1);
    border-radius: 50%;
    ${ease('out')};
  }

  &:hover {
    box-shadow: inset 0px -1px 3px rgba(black, 0.1);
    &::before {
      transform: scale(1);
      opacity: 1;
    }
  }

  ${props => (props.active ? uncheckedActive : uncheckedDisabled)};
`;

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
        <AccountSettingsCheck active={isOnComplianceWithPermission}>
          <AccountSettingsCheckCheck>
            {completedCompliance ? (
              <StyledCheckCircleFilled
                height="27px"
                width="27px"
                id={`${adminSteps.currentStep.name}_COMPLETE`}
              />
            ) : (
              <ChecklistItemStatusUnchecked
                id={adminSteps.currentStep.name}
                onClick={() =>
                  dispatch(
                    showModal('ACCOUNT_SETTINGS_MODAL', {
                      isClaimed,
                      dispatch,
                    }),
                  )
                }
                active={isOnComplianceWithPermission}
              />
            )}
          </AccountSettingsCheckCheck>
        </AccountSettingsCheck>
        {completedCompliance ? (
          <AccountSettingsComplete
            header="Compliance & Create Account"
            data={complianceData}
          />
        ) : (
          <AccountSettingsCheckCheck>
            <AccountSettingsText
              header="KYC Review & Create Account"
              subheader={
                hasPermission
                  ? 'Application status must be in Review and all checklists must be verified to proceed'
                  : 'You do not have permission to complete this step'
              }
              showSubheader={isOnComplianceWithPermission}
            />
          </AccountSettingsCheckCheck>
        )}
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
