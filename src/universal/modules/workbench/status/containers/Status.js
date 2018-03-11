import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  dispatchPropType,
  workbenchPropType,
  paramsPropType,
} from 'gac-utils/proptypes';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EmptyState, Pill } from '../../../ui/components';
import StatusOverrideFormWrapper from '../components/StatusOverrideForm';
import { updateApprovalDeclineNote } from 'grow-actions/status/status';
import ModalContent from '../../../ui/modal/components/ModalContent';
import { hideModal } from '../../../ui/modal/actions/actions-modal';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { getPermission } from 'grow-utils/permissionCheck';
import { notificationPush } from '../../../ui/notifications/actions';

import ReactSelect from '../../../forms/fields/ReactSelect';

import StatusActiveFormWrapper from '../components/StatusActiveForm';
import StatusCancelledFormWrapper from '../components/StatusCancelledForm';
import StatusDeclineFormWrapper from '../components/StatusDeclineForm';
import StatusOnHoldFormWrapper from '../components/StatusOnHoldForm';
import StatusFraudFormWrapper from '../components/StatusFraudForm';
import StatusModalHeader from '../components/StatusModalHeader';

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Declined', value: 'declined' },
  { label: 'On Hold', value: 'on-hold' },
  { label: 'Fraud', value: 'fraud' },
];
const StatusManagementWrapper = styled.div`
  padding: 2.8rem 0;
  width: 800px;
`;

const Header = styled.header`
  margin-bottom: 1.125rem;
  h2 {
    font-size: 1.875rem;
    margin: 0;
  }
`;
const SubHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 5px;
  > * {
    margin-right: 5px;
  }
`;
const StyledReactSelect = styled(ReactSelect)`
  width: 150px;
  div.Select-control,
  .Select-input {
    padding-left: 5px;
  }
`;
const InlineErrorMessage = styled.p`
  margin-top: 2.25rem;
  color: ${props => props.theme.colors.red};
  font-weight: 600;
  text-align: center;
`;
/**
 * Product Application must be in Step VERIFICATION or UNDERWRITING
 * in order to leave comments. Once a decision has been made a lot of
 * the recommendation features are disabled
 */
class Status extends Component {
  state = {
    changeToStatus: undefined,
  };

  handleApprovalDeclineCommentSubmit = data => {
    const { dispatch, workbench } = this.props;
    const apiBody = { comment: data.approvalDeclineText };
    dispatch(updateApprovalDeclineNote(workbench.id, 'comment', apiBody));
  };

  renderForm = () => {
    const { workbench } = this.props;
    switch (this.state.changeToStatus) {
      case 'active':
        return <StatusActiveFormWrapper {...this.props} />;
      case 'cancelled':
        return <StatusCancelledFormWrapper {...this.props} />;
      case 'declined':
        return <StatusDeclineFormWrapper {...this.props} />;
      case 'on-hold':
        return <StatusOnHoldFormWrapper {...this.props} />;
      case 'fraud':
        return <StatusFraudFormWrapper {...this.props} />;
      default:
        return (
          <StatusOverrideFormWrapper
            workbenchId={workbench.id}
            onSubmit={this.handleApprovalDeclineCommentSubmit}
          />
        );
    }
  };

  /**
   * User selects a new status and we must check if user has permission.
   * @param obj react-select option {label,value}
   */
  selectStatus = obj => {
    const { workbench, permissions, dispatch } = this.props;
    if (!obj) {
      this.setState({ changeToStatus: undefined });
    } else {
      const { value } = obj;
      const permissionObj = getPermission(
        workbench.state,
        value.replace('-', '_').toUpperCase(),
        permissions,
      );
      if (
        permissionObj.hasPermission &&
        this.isSameAdmin() &&
        workbench.state !== value
      ) {
        this.setState({
          changeToStatus: value,
        });
      } else {
        dispatch(
          notificationPush({
            id: workbench.id,
            message: `You do not have the permissions to make this change.`,
            kind: 'error',
            dismissAfter: 5000,
          }),
        );
      }
    }
  };

  pillColor = value => {
    switch (value) {
      case 'active':
        return 'success';
      case 'declined':
      case 'fraud':
      case 'cancelled':
        return 'error';
      default:
        return null;
    }
  };

  isSameAdmin = () =>
    this.props.workbench.primaryRep.email === this.props.user.email;

  renderStatus = () => {
    const { workbench, dispatch } = this.props;
    const { changeToStatus } = this.state;

    if (workbench.errors.includes('NO_PERMISSION')) {
      return (
        <div className="ChecklistPlaceholder">
          <EmptyState errors={workbench.errors} />
        </div>
      );
    }

    return (
      <ModalContent
        modalAction={() => dispatch(hideModal())}
        modalFullscreen={false}
      >
        <div>
          <Header>
            <h2>Manual Override Application Status</h2>
          </Header>

          <SubHeader>
            <span>Change status from </span>
            <Pill state={this.pillColor(workbench.state)}>
              {capitalizeString(workbench.state, '-', ' ')}
            </Pill>
            <span>to</span>
            <StyledReactSelect
              placeholder="Select a status"
              disabled={!this.isSameAdmin()}
              options={statusOptions.filter(
                item => item.value !== workbench.state,
              )}
              onChange={this.selectStatus}
              value={changeToStatus}
              valueComponent={() => {
                return (
                  <Pill state={this.pillColor(changeToStatus)}>
                    {capitalizeString(changeToStatus, '-', ' ')}
                  </Pill>
                );
              }}
            />
          </SubHeader>
          {!this.isSameAdmin() && (
            <InlineErrorMessage>
              You must claim this application to make edits.
            </InlineErrorMessage>
          )}
          <StatusManagementWrapper>
            {changeToStatus && <StatusModalHeader workbench={workbench} />}
            {this.renderForm()}
          </StatusManagementWrapper>
        </div>
      </ModalContent>
    );
  };

  render() {
    return this.props.workbench.isFetching ? null : this.renderStatus();
  }
}

Status.propTypes = {
  dispatch: dispatchPropType.isRequired,
  workbench: workbenchPropType.isRequired,
  params: paramsPropType.isRequired,
  permissions: PropTypes.objectOf(PropTypes.bool).isRequired,
};

const mapStateToProps = state => ({
  workbench: state.workbench,
  permissions: state.permissions.permissions,
  user: state.user,
});

export default connect(mapStateToProps)(Status);
