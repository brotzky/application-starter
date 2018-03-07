import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecommendationApproveButton from '../components/RecommendationApproveButton';
import RecommendationDeclineButton from '../components/RecommendationDeclineButton';

class RecommendationButtons extends Component {
  render() {
    const { firstName, params } = this.props;
    return (
      <div className="RecommendationButtonsContainer">
        <header className="RecommendationFormHeader">
          <h2 className="RecommendationFormHeader__heading">Approve or Decline {firstName}'s {params.workbenchProduct.split('-').join(' ')} application.</h2>
        </header>
        <RecommendationApproveButton />
        <RecommendationDeclineButton />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workbench: state.workbench,
  firstName: state.member.member.firstName,
});

export default connect(mapStateToProps)(RecommendationButtons);
