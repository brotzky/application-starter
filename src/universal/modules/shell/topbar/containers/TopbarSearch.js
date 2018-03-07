import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { addClassNameIf } from 'grow-utils/addClassNameIf';
import Pagination from '../../../ui/pagination/containers/Pagination';
import SearchTerms from '../../../search/containers/SearchTerms';
import SearchResults from '../../../search/containers/SearchResults';
import { getMembers } from 'grow-actions/member/member';
import {
  updateSearchState,
  QUERY_RESET
} from '../../../search/actions/actions-update-search-state';

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
      updateData
    } = this.props;

    return (
      <div className="TopbarSearch">
        <SearchTerms
          updateData={updateData}
          className={`Topbar__search ${addClassNameIf(data.showSearchBar, 'Topbar__search--active')}`}
          dispatch={dispatch}
        />
        <SearchResults
          className="Topbar__search-results"
          clearSearchResults={this.clearSearchResults}
          data={data}
          handlePagination={handlePagination}
          hasMoreResults={hasMoreResults}
          updateData={updateData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.search
});

TopbarSearch = Pagination({
  fetchDataAction: getMembers,
  name: 'search'
})(TopbarSearch);

export default connect(mapStateToProps)(TopbarSearch);
