import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import StatusDeclineButton from '../../../status/components/StatusDeclineButton';
import { Button } from '../../../../ui/components';
import { showModal } from '../../../../ui/modal/actions/actions-modal';

const ButtonWrapper = styled.div`
  margin-right: 3rem;
  display: inline-block;
`;

class ApplicationStatusApproval extends Component {
  handleApproveClick = () => {
    const { dispatch, member, workbench } = this.props;

    return dispatch(
      showModal('RECOMMENDATION_APPROVE_MODAL', {
        dispatch,
        member,
        workbench,
      }),
    );
  };

  canEdit() {
    const { workbench } = this.props;
    return (
      workbench.adminSteps &&
      workbench.adminSteps.currentStep.name === 'DONE' &&
      workbench.state === 'active' &&
      workbench.currentStep !== 'approved' &&
      workbench.currentStep !== 'pre-closing' &&
      workbench.currentStep !== 'serving' &&
      workbench.currentStep !== 'closing'
    );
  }

  render() {
    return (
      <div>
        <ButtonWrapper>
          <Button
            onClick={this.handleApproveClick}
            disabled={!this.canEdit()}
            text="Approve"
            appearance="secondary"
            id="ApproveLoan"
            permission="EDIT_APPROVE_LOAN"
            size="large"
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <StatusDeclineButton isFromAppStatusPage={true} />
        </ButtonWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workbench: state.workbench,
  member: state.member.member,
});

export default connect(mapStateToProps)(ApplicationStatusApproval);
