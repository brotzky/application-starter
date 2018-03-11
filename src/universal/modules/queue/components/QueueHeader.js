import React from 'react';
import styled from 'styled-components';
import {
  QueueHeader as QueueHeaderWrapper,
  QueueItemTitle,
  QueueItemHeading,
  QueueSortOptionSelectWrap,
  QueueSortOptionSelect,
} from 'gac-utils/sc';
import { ChevronDown } from '../../ui/icons/';
import getMaskedSteps from 'grow-utils/steps';

const ResetButtonText = styled.span`
  &:hover {
    color: red;
  }
`;

const QueueListHeader = styled.div`
  padding: 0 ${props => props.theme.space}rem;
  position: relative;
  background: #fff;
`;

const HeaderWrapper = styled.div`
  min-height: 58px;
  display: flex;
  align-items: center;
  list-style-type: none;
`;

const HeaderItemCell = styled.div`
  display: block;
  flex: 1;
  padding: 1.37rem 1.37rem 1.37rem 0;
  text-overflow: ellipsis;
  color: #262626;
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  &:last-child {
    padding-right: 0;
  }
  svg {
    top: 52%;
    left: -0.5625rem;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    position: absolute;
    right: 0.75rem;
    pointer-events: none;
  }
`;

const HeaderItemCellChevron = styled.div`
  display: block;
  flex: 1;
  padding: 1.28571rem 1.28571rem 1.28571rem 0;
  text-overflow: ellipsis;
  color: #262626;
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
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
  <QueueHeaderWrapper>
    <QueueListHeader>
      <HeaderWrapper>
        <HeaderItemCell style={{ flex: '1.3' }}>
          <QueueItemTitle>Product</QueueItemTitle>
          <QueueSortOptionSelectWrap>
            <QueueSortOptionSelect
              id="queueItems"
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
                })
              }
            >
              <option value="">All Products</option>
              {products.map(product => (
                <option value={product.productName} key={product.id}>
                  {product.prettyName}
                </option>
              ))}
            </QueueSortOptionSelect>
            <ChevronDown />
          </QueueSortOptionSelectWrap>
        </HeaderItemCell>
        <HeaderItemCell style={{ flex: '1.25' }}>
          <QueueItemTitle>Creator</QueueItemTitle>
          <QueueItemHeading>Name</QueueItemHeading>
        </HeaderItemCell>
        <HeaderItemCell style={{ flex: '0.7' }}>
          <QueueItemTitle>Step</QueueItemTitle>
          <QueueSortOptionSelectWrap>
            <QueueSortOptionSelect
              name="queue-status"
              value={queryParams.currentStep}
              onChange={event =>
                updateData({
                  page: 1,
                  queryParams: {
                    currentStep: event.target.value,
                    start: 0,
                    end: itemsPerPage,
                  },
                })
              }
            >
              <option value="">All</option>
              {steps &&
                steps.map(step => (
                  <option value={step} key={step}>
                    {getMaskedSteps(org, step)}
                  </option>
                ))}
            </QueueSortOptionSelect>
            <ChevronDown />
          </QueueSortOptionSelectWrap>
        </HeaderItemCell>
        <HeaderItemCell style={{ flex: '0.7' }}>
          <QueueItemTitle>Review</QueueItemTitle>
          <QueueSortOptionSelectWrap>
            <QueueSortOptionSelect
              name="queue-status"
              value={queryParams.adminStep}
              onChange={event =>
                updateData({
                  page: 1,
                  queryParams: {
                    adminStep: event.target.value,
                    start: 0,
                    end: itemsPerPage,
                  },
                })
              }
            >
              <option value="">All</option>
              {adminSteps.map(step => (
                <option value={step.name} key={step.name}>
                  {step.prettyName}
                </option>
              ))}
            </QueueSortOptionSelect>
            <ChevronDown />
          </QueueSortOptionSelectWrap>
        </HeaderItemCell>
        <HeaderItemCell style={{ flex: '0.7' }}>
          <QueueItemTitle>State</QueueItemTitle>
          <QueueSortOptionSelectWrap>
            <QueueSortOptionSelect
              id="queueState"
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
                })
              }
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="declined">Declined</option>
              <option value="on-hold">On Hold</option>
              <option value="fraud">Fraud</option>
              <option value="cancelled">Cancelled</option>
              <option value="complete">Complete</option>
            </QueueSortOptionSelect>
            <ChevronDown />
          </QueueSortOptionSelectWrap>
        </HeaderItemCell>
        <HeaderItemCell style={{ flex: '1' }}>
          <QueueItemTitle>Manager</QueueItemTitle>
          <QueueItemHeading>Name</QueueItemHeading>
        </HeaderItemCell>
        <HeaderItemCell
          style={{
            flex: '0.2',
            textAlign: 'right',
            fontSize: '1.4rem',
          }}
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
              })
            }
          >
            <ResetButtonText>Reset</ResetButtonText>
          </button>
        </HeaderItemCell>
      </HeaderWrapper>
    </QueueListHeader>
  </QueueHeaderWrapper>
);

export default QueueHeader;
