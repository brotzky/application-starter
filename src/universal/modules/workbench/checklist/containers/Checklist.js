import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { EmptyState } from '../../../ui/components';
import { ErrorCircle } from '../../../ui/icons/';
import ChecklistView from './ChecklistView';
import ChecklistPlaceholder from '../components/ChecklistPlaceholder';

const Container = styled.div`
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
`;

class Checklist extends Component {
  renderErrorEmptyState = () => (
    <Container>
      <EmptyState
        Icon={ErrorCircle}
        text={`Failed to retrieve checklist items for this ${capitalizeString(
          this.props.params.workbenchProduct,
          '-',
          ' ',
        )}`}
      />
    </Container>
  );

  render() {
    const {
      activeChecklists,
      checklist,
      member,
      params,
      user,
      users,
    } = this.props;

    const isLoading =
      checklist.isFetching ||
      member.isFetching ||
      user.isFetching ||
      users.isFetchingRole;

    const hasError =
      !checklist.checklists.length &&
      !params.workbenchTab &&
      (!checklist.checklists.length && !params.profileSection);

    if (!isLoading && hasError) return this.renderErrorEmptyState();

    return isLoading ? (
      <ChecklistPlaceholder />
    ) : (
      <ChecklistView params={params} />
    );
  }
}

const mapStateToProps = state => ({
  checklist: state.checklist,
  user: state.user,
  users: state.user,
  member: state.member,
});

export default connect(mapStateToProps)(Checklist);
