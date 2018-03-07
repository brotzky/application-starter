import React from 'react';
import styled from 'styled-components';
import Table from '../../ui/components/Table/Table';
import { ChevronDown } from '../../ui/icons/';
import { capitalizeString } from 'grow-utils/stringFormatting';
import getMaskedSteps from 'grow-utils/steps';

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const StyledHeaderCell = styled(Table.HeaderCell)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  min-height: 60px;
  border-bottom: 0;
`;

const SelectWrap = styled.span`
  display: inline-block;
  max-width: 15px;
  margin-left: 5px;
  position: relative;
`;
const StyledChevron = styled(ChevronDown)`
  width: 10px;
  height: 10px;
  position: absolute;
  top: 4px;
  left: 52%;
  translateY(-50%);
  pointer-events: none;
  * {
    fill: grey;
  }
`;
const StyledHeaderRow = styled(Table.Row)`height: 64px;`;
const ApplicationsHeader = ({
  itemsPerPage,
  queryParams,
  updateData,
  products,
  adminSteps,
  org,
  steps,
}) => (
  <Table.Header>
    <StyledHeaderRow>
      <StyledHeaderCell>
        <Header>Date</Header>
      </StyledHeaderCell>
      <StyledHeaderCell>
        <Header>Creator</Header>
      </StyledHeaderCell>
      <StyledHeaderCell>
        <Header>
          Status
          <SelectWrap>
            <select
              name="queue-status"
              style={{ opacity: '0' }}
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
            <StyledChevron />
          </SelectWrap>
        </Header>
      </StyledHeaderCell>
      <StyledHeaderCell>
        <Header>
          Review{' '}
          <SelectWrap>
            <select
              name="queue-status"
              value={queryParams.adminStep}
              style={{ opacity: '0' }}
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
            <StyledChevron />
          </SelectWrap>
        </Header>
      </StyledHeaderCell>
      <StyledHeaderCell>
        <Header>State</Header>
      </StyledHeaderCell>
      <StyledHeaderCell>
        <Header>Users</Header>
      </StyledHeaderCell>
    </StyledHeaderRow>
  </Table.Header>
);

export default ApplicationsHeader;
