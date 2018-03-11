import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AuthWrapper from '../../auth/containers/AuthWrapper';
import SearchTerms from './SearchTerms';
import SearchResults from './SearchResults';

const SearchWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
`;

const Search = ({ dispatch, search }) => (
  <SearchWrapper>
    <SearchTerms dispatch={dispatch} />
    <SearchResults search={search} />
  </SearchWrapper>
);

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  search: state.search,
});

export default AuthWrapper(connect(mapStateToProps)(Search));
