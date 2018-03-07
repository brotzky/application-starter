import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthWrapper from '../../auth/containers/AuthWrapper';
import SearchTerms from './SearchTerms';
import SearchResults from './SearchResults';

const Search = ({ dispatch, search }) => (
  <div className="Search">
    <SearchTerms dispatch={dispatch} />
    <SearchResults search={search} />
  </div>
);

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  search: state.search,
});

export default AuthWrapper(connect(mapStateToProps)(Search));
