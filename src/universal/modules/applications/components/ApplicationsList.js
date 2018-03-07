import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ApplicationsItem from '../containers/ApplicationsItem';
import { productApplication } from 'grow-utils/productApplicationUtils';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { EmptyFolder } from '../../ui/icons/';
import { EmptyState } from '../../ui/components';
import Table from '../../ui/components/Table/Table';

const QueueListEmptyStateContainer = styled.div`
  min-height: calc(100vh - 180px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ApplicationsList = props => {
  const {
    applications,
    currentStep,
    dispatch,
    isFetching,
    isLoaded,
    showQueueMenu,
    queryParams,
    org,
  } = props;

  if (isLoaded && !isFetching && !applications.length) {
    const { productName } = queryParams;

    const step = currentStep
      ? ` with status ${productApplication(org, {}).getMaskedStatus(
          currentStep,
        )}`
      : '';

    const product = productName
      ? `${capitalizeString(productName, '-', ' ')} `
      : '';

    const text = `No ${product}applications${step} found`;

    return (
      <QueueListEmptyStateContainer>
        <EmptyState Icon={EmptyFolder} text={text} />
      </QueueListEmptyStateContainer>
    );
  }

  return (
    <Table.Body>
      {applications.map(item => (
        <ApplicationsItem
          dispatch={dispatch}
          item={item}
          key={item.id}
          showQueueMenu={showQueueMenu}
          user={props.user}
        />
      ))}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  org: state.auth.organization,
});

export default connect(mapStateToProps)(ApplicationsList);
