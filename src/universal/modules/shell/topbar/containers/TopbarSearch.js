import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import styled, { keyframes } from 'styled-components';
import { ease } from 'gac-utils/sc';
import Pagination from '../../../ui/pagination/containers/Pagination';
import SearchTerms from '../../../search/containers/SearchTerms';
import SearchResults from '../../../search/containers/SearchResults';
import { getMembers } from 'grow-actions/member/member';
import {
  updateSearchState,
  QUERY_RESET,
} from '../../../search/actions/actions-update-search-state';

const TopBarSearch = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 575px;
  margin-left: 72px;
`;

const scaleYUp = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0.5);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const TopBarSearchResults = styled(SearchResults)`
  position: absolute;
  z-index: 10;
  width: 575px;
  top: 40px;
  left: 0;
  border-radius: 4px;
  background: white;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.1),
    0 8px 30px rgba(27, 39, 51, 0.08);
  transform-origin: center top;
  animation: ${scaleYUp} 0.25s ${ease('out')} forwards;
`;

class TopbarSearch extends Component {
  constructor(props) {
    super(props);
    this.clearSearchResults = this.clearSearchResults.bind(this);
    this.clearSearchResultsEscKey = this.clearSearchResultsEscKey.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.clearSearchResultsEscKey, true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.clearSearchResultsEscKey, true);
  }

  clearSearchResults() {
    const { dispatch } = this.props;
    dispatch(updateSearchState(QUERY_RESET));
    dispatch(reset('search'));
  }

  clearSearchResultsEscKey(event) {
    let isEscape = false;

    if ('key' in event) {
      isEscape = event.key === 'Escape';
    } else {
      isEscape = event.keyCode === 27;
    }

    if (isEscape) {
      this.clearSearchResults();
    }
  }

  render() {
    const {
      dispatch,
      data,
      handlePagination,
      hasMoreResults,
      updateData,
    } = this.props;

    return (
      <TopBarSearch>
        <SearchTerms updateData={updateData} dispatch={dispatch} />
        <TopBarSearchResults
          clearSearchResults={this.clearSearchResults}
          data={data}
          handlePagination={handlePagination}
          hasMoreResults={hasMoreResults}
          updateData={updateData}
        />
      </TopBarSearch>
    );
  }
}

const mapStateToProps = state => ({
  data: state.search,
});

TopbarSearch = Pagination({
  fetchDataAction: getMembers,
  name: 'search',
})(TopbarSearch);

export default connect(mapStateToProps)(TopbarSearch);
