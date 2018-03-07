import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { productApplicationStepProceed } from 'grow-actions/product-applications/product-applications-steps';
import { Button } from '../../../../ui/components';

class ApplicationStatusFund extends Component {
  handleFundClick = () => {
    this.props.dispatch(
      productApplicationStepProceed(
        this.props.member.id,
        this.props.workbench.id,
        {
          stepAction: 'FUND_LOAN',
        },
      ),
    );
  };

  render() {
    const { workbench } = this.props;

    // Dirty, but will clean this up when re-doing step validation
    const canFundLoan =
      workbench.currentStep === 'approved' ||
      workbench.currentStep === 'pre-closing' ||
      workbench.currentStep === 'pending-agreement' ||
      workbench.currentStep === 'closing';

    return (
      <div>
        <Button
          onClick={this.handleFundClick}
          appearance="secondary"
          size="large"
          disabled={!canFundLoan}
          permission="EDIT_STEP_FUND_LOAN"
          id="FundLoan"
          text="Fund"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workbench: state.workbench,
  member: state.member.member,
});

export default connect(mapStateToProps)(ApplicationStatusFund);
