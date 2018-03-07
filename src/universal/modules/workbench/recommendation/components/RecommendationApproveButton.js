import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../../ui/modal/actions/actions-modal';
import { Button } from '../../../ui/components';

class RecommendationApproveButton extends Component {
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
      <Button
        onClick={this.handleApproveClick}
        disabled={!this.canEdit()}
        text="Approve"
        appearance="secondary"
        id="ApproveLoan"
        permission="EDIT_APPROVE_LOAN"
        size="large"
      />
    );
  }
}

const mapStateToProps = state => ({
  workbench: state.workbench,
  member: state.member.member,
});

export default connect(mapStateToProps)(RecommendationApproveButton);
