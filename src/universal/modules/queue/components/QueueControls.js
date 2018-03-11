import React from 'react';
import styled from 'styled-components';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshSmall,
} from '../../ui/icons/';

const QueueControlsContainer = styled.div`
  height: 54px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 2.4rem;
  background: ${props => props.theme.colors.blue};
`;

const QueueControlsWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const QueueSortOptions = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 3.375rem 1.5rem 0;
  color: #fff;
  font-weight: 500;

  &:last-child {
    padding-right: 0;
  }
`;

const QueueSortOptionsLeft = styled(QueueSortOptions)`
  margin: 0 auto 0 0;
`;

const QueueSortOptionsLabel = styled.span`
  margin-right: 1.28571rem;
`;

const QueueSortButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  height: 28px;
  border-radius: 4px;
  margin-right: 1rem;
  padding: 0 1.125rem;
  text-transform: uppercase;
  font-weight: 600;
  background: ${props => (props.active ? 'rgba(0,0,0,.3)' : 'transparent')};
  color: ${props =>
    props.active ? 'hsla(0,0%,100%,.9)' : 'hsla(0,0%,100%,.75)'};
  cursor: pointer;

  svg {
    width: 10px;
    height: 10px;
    position: absolute;
    top: 52%;
    right: 0.75rem;
    transform: translateY(-50%);
    pointer-events: none;

    path {
      fill: #fff;
    }
  }
`;

const QueuePaginationButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 6px transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);

  &:last-child {
    margin-left: 0.75rem;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: #fff;
  }
`;

const QueueSortOptionSelect = styled.select`
  margin: 0;
  padding-right: 1.5rem;
  cursor: pointer;
  text-transform: none;

  option {
    color: ${props => props.theme.colors.black};
  }
`;

const QueueControls = ({
  handlePagination,
  hasMoreResults,
  data,
  updateData,
  userEmail,
}) => {
  const { isFetching, itemsPerPage, queryParams, page } = data;

  return (
    <QueueControlsContainer>
      <QueueControlsWrapper>
        <QueueSortOptionsLeft>
          <QueueSortOptionsLabel>Filter Applications:</QueueSortOptionsLabel>
          <QueueSortButton
            type="button"
            active={queryParams.primaryRep === userEmail}
            onClick={() =>
              updateData({
                page: 1,
                queryParams: {
                  start: 0,
                  end: itemsPerPage,
                  primaryRep: userEmail,
                },
              })
            }
          >
            Me
          </QueueSortButton>
          <QueueSortButton
            type="button"
            active={queryParams.primaryRep === ''}
            onClick={() =>
              updateData({
                page: 1,
                queryParams: {
                  start: 0,
                  end: itemsPerPage,
                  primaryRep: '',
                },
              })
            }
          >
            Everyone
          </QueueSortButton>
          <QueueSortButton
            type="button"
            active={queryParams.primaryRep === 'unclaimed'}
            onClick={() =>
              updateData({
                page: 1,
                queryParams: {
                  start: 0,
                  end: itemsPerPage,
                  primaryRep: 'unclaimed',
                },
              })
            }
          >
            Unclaimed
          </QueueSortButton>
        </QueueSortOptionsLeft>
        <QueueSortOptions>
          <QueueSortOptionsLabel>Items per page:</QueueSortOptionsLabel>
          <QueueSortButton active={true}>
            <QueueSortOptionSelect
              id="queueItems"
              name="queue-items"
              value={itemsPerPage || 15}
              onChange={event =>
                updateData({
                  page: 1,
                  queryParams: {
                    start: 0,
                    end: Number(event.target.value),
                  },
                  itemsPerPage: Number(event.target.value),
                })
              }
            >
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </QueueSortOptionSelect>
            <ChevronDown />
          </QueueSortButton>
        </QueueSortOptions>
        <QueueSortOptions>
          <QueueSortOptionsLabel>Refresh:</QueueSortOptionsLabel>
          <QueuePaginationButton
            title="refresh"
            type="button"
            onClick={() =>
              updateData({
                page,
                itemsPerPage,
                queryParams: {
                  start: queryParams.start || 0,
                  end: queryParams.end || 15,
                  currentStep: queryParams.currentStep || '',
                  primaryRep: queryParams.primaryRep || '',
                },
              })
            }
          >
            <RefreshSmall fill="white" />
          </QueuePaginationButton>
        </QueueSortOptions>
        <QueueSortOptions>
          <QueueSortOptionsLabel>Page {page}</QueueSortOptionsLabel>
          <QueuePaginationButton
            type="button"
            onClick={() => handlePagination('previous')}
            disabled={isFetching || !hasMoreResults('previous')}
          >
            <ChevronLeft />
          </QueuePaginationButton>
          <QueuePaginationButton
            type="button"
            onClick={() => handlePagination('next')}
            disabled={isFetching || !hasMoreResults('next')}
          >
            <ChevronRight />
          </QueuePaginationButton>
        </QueueSortOptions>
      </QueueControlsWrapper>
    </QueueControlsContainer>
  );
};

export default QueueControls;
