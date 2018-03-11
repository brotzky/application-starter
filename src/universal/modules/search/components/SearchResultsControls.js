import React from 'react';
import styled, { css } from 'styled-components';
import { QueuePaginationButton } from 'gac-utils/sc';
import { ChevronLeft, ChevronRight, Remove } from '../../ui/icons/';
import { ease } from 'gac-utils/sc';

const SearchResultsControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 43.5px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 1.6rem;
  background: #f9f9f9;

  > * {
    flex: 1;
  }
`;

const SearchResultsControlsClose = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  font-weight: 600;
  ${ease('out')};

  &:hover {
    opacity: 0.7;
  }
`;
const SearchResultsControlsCloseIcon = styled(Remove)`
  margin-right: 1rem;
  * {
    fill: ${props => props.theme.banks.grow.pri};
  }
`;

const buttonIcon = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: white;
  }`;

const StyledChevronLeft = styled(ChevronLeft)`
  ${buttonIcon};
`;

const StyledChevronRight = styled(ChevronRight)`
  ${buttonIcon};
`;

const SearchResultsControls = props => (
  <SearchResultsControlsWrapper>
    <SearchResultsControlsClose onClick={props.clearSearchResults}>
      <SearchResultsControlsCloseIcon />
      <span>Close search</span>
    </SearchResultsControlsClose>
    <div
      style={{
        textAlign: 'center',
      }}
    >
      Page {props.page}
    </div>
    <div
      style={{
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <QueuePaginationButton
        type="button"
        onClick={() => props.handlePagination('previous')}
        disabled={props.isFetching || !props.hasMoreResults('previous')}
        style={{ background: '#448aff' }}
      >
        <StyledChevronLeft />
      </QueuePaginationButton>
      <QueuePaginationButton
        type="button"
        onClick={() => props.handlePagination('next')}
        disabled={props.isFetching | !props.hasMoreResults('next')}
        style={{ background: '#448aff' }}
      >
        <StyledChevronRight />
      </QueuePaginationButton>
    </div>
  </SearchResultsControlsWrapper>
);

export default SearchResultsControls;
