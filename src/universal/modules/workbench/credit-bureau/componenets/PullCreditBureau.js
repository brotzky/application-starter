import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pullCreditBureau } from 'grow-actions/credit-bureau/credit-bureau';
import { Button } from '../../../ui/components';

/**
 * PullCreditBureau handles the PULL CREDIT BUREAU button
 * click along with some copy indicating the consequences.
 */
class PullCreditBureau extends Component {
  constructor(props) {
    super(props);
    this.handleCreditPull = this.handleCreditPull.bind(this);
  }

  /**
   * onlick call handleCreditPull to POST to the backend
   * to pull a new Report from the Credit Bureau. After completion
   * update the select option to be the newest pull.
   */
  handleCreditPull() {
    const { dispatch, memberId } = this.props;
    dispatch(pullCreditBureau(memberId)).then(() => {
      document.querySelector("select[name='creditReportId']").selectedIndex = 0;
    });
  }

  render() {
    const { creditBureau, currentStep } = this.props;

    return (
      <Button
        onClick={() => this.handleCreditPull()}
        isSubmitting={creditBureau.isPullingBureau}
        permission="EDIT_CREDIT_BUREAU"
        disabled={currentStep === 'inquiry'}
        text="Pull Credit Bureau"
        size="large"
      />
    );
  }
}

const mapStateToProps = state => ({
  creditBureau: state.creditBureau,
  currentStep: state.workbench.currentStep,
});

export default connect(mapStateToProps)(PullCreditBureau);
