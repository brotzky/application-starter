import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { ease, colors } from 'gac-utils/sc';
import { ChevronLeft, ChevronRight } from '../../../ui/icons/';
const PaginationPage = styled.div`
  color: #000;
  margin-right: 10px;
`;

const UsersPaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const QueuePaginationButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  position: relative;
  background: ${props => props.theme.colors.greyMid};
  box-shadow: 0 2px 6px rgba(black, 0);
  cursor: pointer;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  &:active {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    margin-left: 0.8rem;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.35;
  }
`;
const PaginationButtonIconLeft = styled(ChevronLeft)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: white;
`;
const PaginationButtonIconRight = styled(ChevronRight)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: white;
`;

class UsersPagination extends PureComponent {
  render() {
    const { currentPage, change, dispatch, pagesSumm } = this.props;
    const isPrevPageDisabled = currentPage === 1;
    const isNextPageDisabled =
      currentPage === pagesSumm || currentPage > pagesSumm;

    return (
      <UsersPaginationWrapper>
        <PaginationPage>Page {currentPage}</PaginationPage>
        <QueuePaginationButton
          type="button"
          onClick={() =>
            dispatch(change('users-pagination', 'page', currentPage - 1))
          }
          disabled={isPrevPageDisabled}
        >
          <PaginationButtonIconLeft />
        </QueuePaginationButton>
        <QueuePaginationButton
          type="button"
          onClick={() =>
            dispatch(change('users-pagination', 'page', currentPage + 1))
          }
          disabled={isNextPageDisabled}
        >
          <PaginationButtonIconRight />
        </QueuePaginationButton>
      </UsersPaginationWrapper>
    );
  }
}

export default UsersPagination;
