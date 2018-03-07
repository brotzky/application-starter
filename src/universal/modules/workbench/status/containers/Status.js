import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  dispatchPropType,
  workbenchPropType,
  paramsPropType,
} from 'gac-utils/proptypes';
import styled from 'styled-components';
import { EmptyState } from '../../../ui/components';
import StatusOverrideFormWrapper from '../components/StatusOverrideForm';
import StatusButtons from './StatusButtons';
import { updateApprovalDeclineNote } from 'grow-actions/status/status';

const StatusManagementWrapper = styled.div`padding: 2.8rem;`;
/**
* Product Application must be in Step VERIFICATION or UNDERWRITING
* in order to leave comments. Once a decision has been made a lot of
* the recommendation features are disabled
*/
class Status extends Component {
  handleApprovalDeclineCommentSubmit = data => {
    const { dispatch, params: { workbenchId } } = this.props;
    const apiBody = { comment: data.approvalDeclineText };
    dispatch(updateApprovalDeclineNote(workbenchId, 'comment', apiBody));
  };

  renderStatus() {
    const { workbench, params } = this.props;

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
          <h2 className="SectionHeader__heading">Status Management</h2>
        </header>
        <StatusManagementWrapper>
          <StatusOverrideFormWrapper
            workbenchId={params.workbenchId}
            onSubmit={this.handleApprovalDeclineCommentSubmit}
          />
          <StatusButtons />
        </StatusManagementWrapper>
      </div>
    );
  }

  render() {
    return (
      <div className="Recommendation">
        {this.props.workbench.isFetching ? null : this.renderStatus()}
      </div>
    );
  }
}

Status.propTypes = {
  dispatch: dispatchPropType.isRequired,
  workbench: workbenchPropType.isRequired,
  params: paramsPropType.isRequired,
};

const mapStateToProps = state => ({
  workbench: state.workbench,
});

export default connect(mapStateToProps)(Status);
