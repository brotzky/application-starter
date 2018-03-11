import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { push } from 'react-router-redux';
import SearchResultsItem from '../components/SearchResultsItem';
import SearchResultsControls from '../components/SearchResultsControls';
import { Spinner } from 'gac-ui/components/';

const SearchResultsContainer = styled.div`
  min-height: 43.5px;
  padding-bottom: 43.5px;
  color: #585858;
`;
const SearchResultsSpinnerWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchResultsNoResults = styled.div`
  padding: 1rem 3rem;

  &:nth-child(even) {
    background: #fafafa;
  }

  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: ${props => props.theme.colors.black};
`;

const SearchResultsWrapper = styled.div`
  ${props => props.isFetching && 'height: 80px'};
  ${props => props.noResults && 'height: 45px'};
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
`;
class SearchResults extends Component {
  static propTypes = {
    className: PropTypes.string,
    clearSearchResults: PropTypes.func,
    data: PropTypes.object,
    hasMoreResults: PropTypes.func.isRequired,
    handlePagination: PropTypes.func.isRequired,
  };

  setResultsWrapperHeight = (members, isFetching) => {
    const height = members.length * 45;
    if (!members.length || isFetching) return '45px';
    return height > 435 ? '450px' : `${height}px`;
  };

  handleResultClick = id => {
    this.props.dispatch(push(`/members/${id}`));
    return this.props.clearSearchResults();
  };

  renderLoading = () => (
    <SearchResultsSpinnerWrapper>
      <Spinner color={this.props.theme.colors.blue} />
    </SearchResultsSpinnerWrapper>
  );

  renderNoResults = () => (
    <SearchResultsNoResults>Sorry, no results found</SearchResultsNoResults>
  );

  renderResults(members) {
    return (
      <ul style={{ listStyle: 'none' }}>
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
      <SearchResultsContainer className={className}>
        <SearchResultsWrapper
          style={{
            height: this.setResultsWrapperHeight(data.members, data.isFetching),
          }}
          isFetching={data.isFetching}
          noResults={noResultsExists}
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
        </SearchResultsWrapper>
      </SearchResultsContainer>
    );
  }
}

export default withTheme(SearchResults);
