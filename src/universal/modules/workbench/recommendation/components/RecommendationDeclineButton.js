import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '../../../ui/components';
import { showModal } from '../../../ui/modal/actions/actions-modal';

class RecommendationDeclineButton extends Component {
  handleDeclineClick = () => {
    const { dispatch, workbench } = this.props;
    return dispatch(
      showModal('RECOMMENDATION_DECLINE_MODAL', { dispatch, workbench }),
    );
  };

  canEdit() {
    const { workbench } = this.props;

    return true;
    return (
      workbench.state === 'active' &&
      workbench.currentStep !== 'pre-closing' &&
      workbench.currentStep !== 'serving' &&
      workbench.currentStep !== 'closing'
    );
  }

  render() {
    return (
      <Button
        onClick={this.handleDeclineClick}
        text="Decline"
        disabled={!this.canEdit()}
        appearance="secondary"
        size="large"
      />
    );
  }
}

const mapStateToProps = state => ({
  workbench: state.workbench,
});

export default connect(mapStateToProps)(RecommendationDeclineButton);
