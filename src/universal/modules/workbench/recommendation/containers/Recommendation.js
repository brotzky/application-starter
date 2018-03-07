import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  updateApprovalNote,
  updateRecommendationNote,
} from 'grow-actions/recommendation/recommendation';
import { EmptyState } from '../../../ui/components';
import RecommendationAnnouncement from '../components/RecommendationAnnouncement';
import RecommendationCommentsForm from './RecommendationCommentsForm';
import RecommendationApprovalForm from './RecommendationApprovalForm';
import RecommendationButtons from './RecommendationButtons';

/**
* Product Application must be in Step VERIFICATION or UNDERWRITING
* in order to leave comments. Once a decision has been made a lot of
* the recommendation features are disabled
*/
class Recommendation extends Component {
  constructor(props) {
    super(props);

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleApprovalCommentSubmit = this.handleApprovalCommentSubmit.bind(
      this,
    );
  }

  componentWillMount() {
    // return this.props.dispatch({ type: 'RESET_CHECKLIST' });
  }

  handleCommentSubmit(data) {
    const { dispatch, params: { workbenchId } } = this.props;
    const apiBody = { comment: data.commentText };
    dispatch(updateRecommendationNote(workbenchId, apiBody));
  }

  handleApprovalCommentSubmit(data) {
    const { dispatch, params: { workbenchId } } = this.props;
    const apiBody = { comment: data.approvalText };
    dispatch(updateApprovalNote(workbenchId, 'comment', apiBody));
  }

  renderRecommendation() {
    const { workbench, params, org } = this.props;

    if (workbench.errors.includes('NO_PERMISSION')) {
      return (
        <div className="ChecklistPlaceholder">
          <EmptyState errors={workbench.errors} />
        </div>
      );
    }

    return (
      <div className="RecommendationOverview">
        <header className="SectionHeader">
          <h2 className="SectionHeader__heading">Recommendation</h2>
        </header>
        <RecommendationAnnouncement org={org} workbench={workbench} />
        <div className="RecommendationContainer">
          <div className="RecommendationStep">
            <RecommendationCommentsForm
              workbenchId={params.workbenchId}
              onSubmit={this.handleCommentSubmit}
            />
          </div>
          <div className="RecommendationStep">
            <RecommendationApprovalForm
              workbenchId={params.workbenchId}
              onSubmit={this.handleApprovalCommentSubmit}
            />
          </div>
          <div className="RecommendationStep">
            <RecommendationButtons params={params} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Recommendation">
        {this.props.workbench.isFetching ? null : this.renderRecommendation()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workbench: state.workbench,
  org: state.auth.organization,
});

export default connect(mapStateToProps)(Recommendation);
