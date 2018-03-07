import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import SearchResultsItem from '../components/SearchResultsItem';
import SearchResultsControls from '../components/SearchResultsControls';
import Spinner from '../../ui/spinner/spinner';
import { addClassNameIf } from 'grow-utils/addClassNameIf';

class SearchResults extends Component {
  static propTypes = {
    className: PropTypes.string,
    clearSearchResults: PropTypes.func,
    data: PropTypes.object,
    hasMoreResults: PropTypes.func.isRequired,
    handlePagination: PropTypes.func.isRequired,
  };

  handleResultClick = id => {
    const { clearSearchResults, dispatch } = this.props;

    dispatch(push(`/members/${id}`));
    return clearSearchResults();
  };

  renderLoading = () => <Spinner className="SearchResults__spinner" />;

  renderNoResults = () => (
    <div className="SearchResultsItem SearchResultsItem--no-results">
      Sorry, no results found
    </div>
  );

  renderResults(members) {
    return (
      <ul className="SearchResultsList">
        {members.map(member => (
          <SearchResultsItem
            key={member.email}
            handleResultClick={this.handleResultClick}
            item={member}
          />
        ))}
      </ul>
    );
  }

  setResultsWrapperHeight(members, isFetching) {
    const height = members.length * 43.5;
    if (!members.length || isFetching) return '43.5px';
    return height > 435 ? '435px' : `${height}px`;
  }

  render() {
    const {
      className,
      clearSearchResults,
      data,
      hasMoreResults,
      handlePagination,
    } = this.props;
    const { queryParams } = data;
    const someQueryExists = Object.keys(queryParams).some(
      k => queryParams[k] && queryParams[k].length > 0,
    );
    const resultsExists = data.members.length;
    const noResultsExists = !data.members.length && someQueryExists;

    if (!someQueryExists) {
      return null;
    }

    return (
      <div className={`SearchResults ${className}`}>
        <div
          style={{
            height: this.setResultsWrapperHeight(data.members, data.isFetching),
          }}
          className={`
          SearchResults__wrapper
          ${addClassNameIf(data.isFetching, 'SearchResults__wrapper--fetching')}
          ${addClassNameIf(
            noResultsExists,
            'SearchResults__wrapper--no-results',
          )}
        `}
        >
          {(() => {
            if (data.isFetching) {
              return this.renderLoading();
            } else if (resultsExists) {
              return this.renderResults(data.members);
            } else if (noResultsExists) {
              return this.renderNoResults();
            }
          })()}
          <SearchResultsControls
            clearSearchResults={clearSearchResults}
            isFetching={data.isFetching}
            handlePagination={handlePagination}
            hasMoreResults={hasMoreResults}
            page={data.page}
          />
        </div>
      </div>
    );
  }
}

export default connect()(SearchResults);
