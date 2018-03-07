import React from 'react';
import { addClassNameIf } from 'grow-utils/addClassNameIf';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshSmall,
} from '../../ui/icons/';

const QueueControls = ({
  handlePagination,
  hasMoreResults,
  data,
  updateData,
  userEmail,
}) => {
  const { isFetching, itemsPerPage, queryParams, page } = data;

  return (
    <div className="QueueControls">
      <div className="Queue__wrapper QueueControls__wrapper">
        <div className="QueueSortOptions QueueSortOptions--align-left">
          <span className="QueueSortOptions__label">Filter Applications:</span>
          <button
            type="button"
            className={`QueueSortOptions__button ${addClassNameIf(
              queryParams.primaryRep === userEmail,
              'QueueSortOptions__button--active',
            )}`}
            onClick={() =>
              updateData({
                page: 1,
                queryParams: {
                  start: 0,
                  end: itemsPerPage,
                  primaryRep: userEmail,
                },
              })}
          >
            <span className="QueueSortOptions__value">Me</span>
          </button>
          <button
            type="button"
            className={`QueueSortOptions__button ${addClassNameIf(
              queryParams.primaryRep === '',
              'QueueSortOptions__button--active',
            )}`}
            onClick={() =>
              updateData({
                page: 1,
                queryParams: {
                  start: 0,
                  end: itemsPerPage,
                  primaryRep: '',
                },
              })}
          >
            <span className="QueueSortOptions__value">Everyone</span>
          </button>
          <button
            type="button"
            className={`QueueSortOptions__button ${addClassNameIf(
              queryParams.primaryRep === 'unclaimed',
              'QueueSortOptions__button--active',
            )}`}
            onClick={() =>
              updateData({
                page: 1,
                queryParams: {
                  start: 0,
                  end: itemsPerPage,
                  primaryRep: 'unclaimed',
                },
              })}
          >
            <span className="QueueSortOptions__value">Unclaimed</span>
          </button>
        </div>
        <div className="QueueSortOptions">
          <span className="QueueSortOptions__label">Items per page:</span>
          <span className="QueueSortOptions__value QueueSortOptions__button QueueSortOptions__button--active">
            <select
              id="queueItems"
              className="QueueSortOptions__select"
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
                })}
            >
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <ChevronDown className="QueueSortOptions__chevron" />
          </span>
        </div>
        <div className="QueueSortOptions">
          <span className="QueueSortOptions__label">Refresh:</span>
          <button
            title="refresh"
            type="button"
            className="QueueSortOptions__button QueuePagination__button"
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
              })}
          >
            <RefreshSmall
              className="QueuePagination__button-icon"
              fill="white"
            />
          </button>
        </div>
        <div className="QueueSortOptions QueuePagination">
          <span className="QueueSortOptions__label">Page {page}</span>
          <button
            type="button"
            className="QueuePagination__button"
            onClick={() => handlePagination('previous')}
            disabled={isFetching || !hasMoreResults('previous')}
          >
            <ChevronLeft className="QueuePagination__button-icon" />
          </button>
          <button
            type="button"
            className="QueuePagination__button"
            onClick={() => handlePagination('next')}
            disabled={isFetching | !hasMoreResults('next')}
          >
            <ChevronRight className="QueuePagination__button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueueControls;
