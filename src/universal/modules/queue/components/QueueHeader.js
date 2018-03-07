import React from 'react';
import styled from 'styled-components';

import { ChevronDown } from '../../ui/icons/';
import { capitalizeString } from 'grow-utils/stringFormatting';
import getMaskedSteps from 'grow-utils/steps';

const ResetButtonText = styled.span`
  &:hover {
    color: red;
  }
`;

const QueueHeader = ({
  itemsPerPage,
  queryParams,
  updateData,
  products,
  adminSteps,
  org,
  steps,
}) => (
  <header className="QueueHeader">
    <ul className="QueueList QueueHeader__list">
      <li className="QueueItem QueueHeader__item">
        <ul className="Queue__wrapper QueueItem__wrapper">
          <li
            className="QueueItem__cell QueueItem__cell-header"
            style={{ flex: '1.3' }}
          >
            <div className="QueueItem__title">Product</div>
            <span className="QueueSortOptions__select-wrap">
              <select
                id="queueItems"
                className="QueueSortOptions__value QueueSortOptions__button QueueHeader__button QueueSortOptions__select"
                name="queue-products"
                value={queryParams.productName}
                onChange={event =>
                  updateData({
                    page: 1,
                    queryParams: {
                      productName: event.target.value,
                      start: 0,
                      end: itemsPerPage,
                    },
                  })}
              >
                <option value="">All Products</option>
                {products.map(product => (
                  <option value={product.productName} key={product.id}>
                    {product.prettyName}
                  </option>
                ))}
              </select>
              <ChevronDown className="QueueSortOptions__chevron QueueHeader__chevron" />
            </span>
          </li>
          <li
            className="QueueItem__cell QueueItem__cell-header"
            style={{ flex: '1.25' }}
          >
            <div className="QueueItem__title">Creator</div>
            <div className="QueueItem__heading">Name</div>
          </li>
          <li
            className="QueueItem__cell QueueItem__cell-header"
            style={{ flex: '0.7' }}
          >
            <div className="QueueItem__title">Step</div>
            <span className="QueueSortOptions__select-wrap">
              <select
                name="queue-status"
                className="QueueSortOptions__value QueueSortOptions__button QueueHeader__button QueueSortOptions__select"
                value={queryParams.currentStep}
                onChange={event =>
                  updateData({
                    page: 1,
                    queryParams: {
                      currentStep: event.target.value,
                      start: 0,
                      end: itemsPerPage,
                    },
                  })}
              >
                <option value="">All</option>
                {steps &&
                  steps.map(step => (
                    <option value={step} key={step}>
                      {getMaskedSteps(org, step)}
                    </option>
                  ))}
              </select>
              <ChevronDown className="QueueSortOptions__chevron QueueHeader__chevron" />
            </span>
          </li>
          <li
            className="QueueItem__cell QueueItem__cell-header"
            style={{ flex: '0.7' }}
          >
            <div className="QueueItem__title">Review</div>
            <span className="QueueSortOptions__select-wrap">
              <select
                name="queue-status"
                className="QueueSortOptions__value QueueSortOptions__button QueueHeader__button QueueSortOptions__select"
                value={queryParams.adminStep}
                onChange={event =>
                  updateData({
                    page: 1,
                    queryParams: {
                      adminStep: event.target.value,
                      start: 0,
                      end: itemsPerPage,
                    },
                  })}
              >
                <option value="">All</option>
                {adminSteps.map(step => (
                  <option value={step.name} key={step.name}>
                    {step.prettyName}
                  </option>
                ))}
              </select>
              <ChevronDown className="QueueSortOptions__chevron QueueHeader__chevron" />
            </span>
          </li>
          <li
            className="QueueItem__cell QueueItem__cell-header"
            style={{ flex: '0.7' }}
          >
            <div className="QueueItem__title">State</div>
            <span className="QueueSortOptions__select-wrap">
              <select
                id="queueState"
                className="QueueSortOptions__value QueueSortOptions__button QueueHeader__button QueueSortOptions__select"
                name="queue-state"
                value={queryParams.state || 15}
                onChange={event =>
                  updateData({
                    page: 1,
                    queryParams: {
                      start: 0,
                      end: itemsPerPage,
                      state: event.target.value,
                    },
                  })}
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="declined">Declined</option>
                <option value="on-hold">On Hold</option>
                <option value="fraud">Fraud</option>
                <option value="cancelled">Cancelled</option>
                <option value="complete">Complete</option>
              </select>
              <ChevronDown className="QueueSortOptions__chevron QueueHeader__chevron" />
            </span>
          </li>
          <li className="QueueItem__cell QueueItem__cell-header">
            <div className="QueueItem__title">Manager</div>
            <div className="QueueItem__heading">Name</div>
          </li>
          <li
            className="QueueItem__cell QueueItem__cell-header QueueItem__cell--sm QueueItem__cell--align-right"
            style={{ overflow: 'visible' }}
          >
            <button
              onClick={event =>
                updateData({
                  page: 1,
                  queryParams: {
                    start: 0,
                    end: itemsPerPage,
                    currentStep: '',
                    state: '',
                    adminStep: '',
                    productName: '',
                  },
                })}
            >
              <ResetButtonText>Reset</ResetButtonText>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </header>
);

export default QueueHeader;
