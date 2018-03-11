import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  QueuePlaceholder,
  QueueList as QueueListWrapper,
  QueueApplications,
} from 'gac-utils/sc';
import QueueItem from '../containers/QueueItem';
import { productApplication } from 'grow-utils/productApplicationUtils';
import { capitalizeString } from 'grow-utils/stringFormatting';
import { EmptyFolder } from '../../ui/icons/';
import { EmptyState } from '../../ui/components';

const QueueListEmptyStateContainer = styled.div`
  min-height: calc(100vh - 180px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QueueList = props => {
  const {
    applications,
    currentStep,
    dispatch,
    isFetching,
    isLoaded,
    showQueueMenu,
    permissions,
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
    <QueueApplications>
      {isFetching ? (
        <QueuePlaceholder />
      ) : (
        <QueueListWrapper>
          {applications.map(item => (
            <QueueItem
              dispatch={dispatch}
              item={item}
              key={item.id}
              showQueueMenu={showQueueMenu}
              permissions={permissions}
              user={props.user}
            />
          ))}
        </QueueListWrapper>
      )}
    </QueueApplications>
  );
};

const mapStateToProps = state => ({
  org: state.auth.organization,
});

export default connect(mapStateToProps)(QueueList);
