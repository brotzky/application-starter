/**
 * index.js
 * Utility function to create pagination range based on a list of items to show
 * @param {array} list the list of items that need pagination
 * Default items per page is 15. Use "UPDATE_TRANSACTION_ITEMS_PER_PAGE" action to update it
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ChevronRight, ChevronLeft } from '../../../../modules/ui/icons/';
import { UPDATE_TRANSACTION_PAGE_NUMBER } from 'grow-actions/cashflow-transactions/constants';

const PaginationContainer = styled.div`
  margin: 0 auto 1rem;
  display: flex;
  justify-content: center;
  max-width: 60%;
`;

const PrevArrow = styled.button`
  width: 40px;
  padding: 0.5rem;
  &:hover {
    background: ${props => props.theme.colors.greyBg};
  }
`;

const StyledChevronLeft = styled(ChevronLeft)`
  ${props =>
    props.isFirst
      ? `path {
          &:first-child {
            fill: ${props.theme.colors.greyMid};
            stroke: ${props.theme.colors.greyMid};
            stroke-width: 0.4;
            opacity: 0.2;
          }
        };`
      : `path {
          &:first-child {
            fill: ${props.theme.colors.blue};
            stroke: ${props.theme.colors.blue};
            stroke-width: 0.4;
          }
        };`};
`;

const NextArrow = styled.button`
  width: 40px;
  padding: 0.5rem;
  &:hover {
    background: ${props => props.theme.colors.greyBg};
  }
`;

const StyledChevronRight = styled(ChevronRight)`
  ${props =>
    props.isLast
      ? `path {
          &:first-child {
            fill: ${props.theme.colors.greyMid};
            stroke: ${props.theme.colors.greyMid};
            stroke-width: 0.4;
          }
        };`
      : `path {
          &:first-child {
            fill: ${props.theme.colors.blue};
            stroke: ${props.theme.colors.blue};
            stroke-width: 0.4;
          }
        };`};
`;

const PageNumber = styled.button`
  width: 35px;
  height: 35px;
  text-align: center;
  padding: 0.5rem;
  transition: all 300ms ease;
  background: none;
  border-bottom: 2px solid transparent;

  ${props =>
    props.active
      ? `font-weight: 600; 
      color: ${props.theme.colors.blue}; 
      border-color: ${props.theme.colors.blue}`
      : ''};

  &:hover {
    background: ${props => props.theme.colors.greyBg};
    color: ${props => props.theme.colors.blue};
  }
`;

class Pagination extends PureComponent {
  constructor(props) {
    super(props);
    const { list, itemsPerPage } = this.props;
    const listLength = list.length;
    const numberOfPages = Math.ceil(listLength / itemsPerPage);
    const endPage = numberOfPages >= 10 ? 10 : numberOfPages; // endPage cannot be larger than the number of page'
    /**
     * Not indices. Not zero-based! Just human readable page numbers
     * startPage === current start page number for pagination display
     * endPage === current end page number for pagination display
     */
    this.state = {
      numberOfPages,
      startPage: 1,
      endPage,
    };
  }

  /**
   * Each time this component receives new list, we will check if the length has changed 
   * to determine if re-calculating and re-rendering of page range are needed
   */
  componentWillReceiveProps(nextProps) {
    const nextList = nextProps.list;
    const currentList = this.props.list;
    if (nextList.length !== currentList.length) {
      const numberOfPages = Math.ceil(
        nextList.length / this.props.itemsPerPage,
      );
      const endPage = numberOfPages >= 10 ? 10 : numberOfPages;

      this.setState({ startPage: 1, endPage, numberOfPages });
    }
  }

  // To calculate and set Page Range for this.state (startPage, endPage)
  setPageRange = () => {
    const { activePageNumberIndex } = this.props;
    const { startPage, endPage, numberOfPages } = this.state;
    const activePageNumber = activePageNumberIndex + 1;
    const newStartPage = Math.floor(activePageNumberIndex / 10) * 10 + 1;
    const newEndPage =
      newStartPage + 9 >= numberOfPages ? numberOfPages : newStartPage + 9;

    // only update the range if necessary
    if (!(activePageNumber >= startPage && activePageNumber <= endPage)) {
      this.setState({
        startPage: newStartPage,
        endPage: newEndPage,
      });
    }
  };

  // Left arrow button
  handleMoveToPrevPage = async () => {
    const { activePageNumberIndex } = this.props;

    // reset new page range
    if (activePageNumberIndex !== 0) {
      await this.props.updatePageIndex(activePageNumberIndex - 1);
      await this.setPageRange();
      this.createPaginationRange();
    }
  };

  // Right arrow button
  handleMoveToNextPage = async () => {
    const { numberOfPages } = this.state;
    const { activePageNumberIndex } = this.props;

    // update index when page has not reached to the end
    if (activePageNumberIndex !== numberOfPages - 1) {
      // set new end page and account for the last set of page numbers
      await this.props.updatePageIndex(activePageNumberIndex + 1);
      await this.setPageRange();
      this.createPaginationRange();
    }
  };

  // Individual page click
  handlePageClick = async event => {
    const newPageIndex = Number(event.target.innerHTML) - 1;
    await this.props.updatePageIndex(newPageIndex);
    await this.setPageRange();
    this.createPaginationRange();
  };

  /**
   * To create individual page number button in the pagination range
   * @param {Number/String} key the key React is used as component key 
   * @param {Number} pageNum the page number 
   * @param {Function} onClickFunc the onClick function reference to attach to the element
   */
  createPageNode = (key, pageNum, onClickFunc) => {
    const { activePageNumberIndex } = this.props;

    return (
      <PageNumber
        onClick={onClickFunc}
        key={key}
        active={activePageNumberIndex === pageNum - 1}
      >
        {pageNum}
      </PageNumber>
    );
  };

  /**
   * To create entire pagination range for navigation
   * All params are NOT indices
   * It will make sure not to render page range greater than numberOfPages
   */
  createPaginationRange = () => {
    const pageNumbers = [];
    const { startPage, endPage, numberOfPages } = this.state;

    // show "1" and "..." if not on the first page
    if (startPage !== 1) {
      pageNumbers.push(
        this.createPageNode(1, 1, this.handlePageClick),
        this.createPageNode('prevDots', '...', this.handlePrevDotClick),
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(this.createPageNode(i, i, this.handlePageClick));
    }

    // show "..." and last page if not on the last page
    if (endPage !== numberOfPages) {
      pageNumbers.push(
        this.createPageNode('nextDots', '...', this.handleNextDotClick),
        this.createPageNode(numberOfPages, numberOfPages, this.handlePageClick),
      );
    }
    return pageNumbers;
  };

  // For the "..." moving to the previous page range
  handlePrevDotClick = () => {
    const { startPage } = this.state;
    this.setState({
      startPage: startPage - 10,
      endPage: startPage - 1,
    });
  };

  // For the "..." moving to the next page range
  handleNextDotClick = () => {
    const { numberOfPages, startPage, endPage } = this.state;
    const newEndPage =
      endPage + 10 > numberOfPages ? numberOfPages : endPage + 10;

    this.setState({
      startPage: startPage + 10,
      endPage: newEndPage,
    });
  };

  render() {
    const { activePageNumberIndex } = this.props;
    const isFirst = activePageNumberIndex === 0;
    const isLast = activePageNumberIndex === this.state.numberOfPages - 1;

    return (
      <PaginationContainer>
        <PrevArrow onClick={this.handleMoveToPrevPage}>
          <StyledChevronLeft isFirst={isFirst} />
        </PrevArrow>
        {this.createPaginationRange()}
        <NextArrow isLast={isLast} onClick={this.handleMoveToNextPage}>
          <StyledChevronRight isLast={isLast} />
        </NextArrow>
      </PaginationContainer>
    );
  }
}

const mapStateToProps = state => ({
  activePageNumberIndex:
    state.cashflowTransactions.pagination.activePageNumberIndex,
  itemsPerPage: state.cashflowTransactions.pagination.itemsPerPage,
});

const mapDispatchToProps = dispatch => ({
  updatePageIndex: newPageIndex =>
    dispatch({
      type: UPDATE_TRANSACTION_PAGE_NUMBER,
      payload: { newPageIndex },
    }),
});

Pagination.propTypes = {
  activePageNumberIndex: PropTypes.number.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  updatePageIndex: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
