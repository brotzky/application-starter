import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../../ui/spinner/spinner';

const StatusTextLoading = ({ isFetching }) =>
  isFetching ? (
    <Spinner className="RecommendationSpinner" color="#448aff" size={28} />
  ) : null;

StatusTextLoading.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

export default StatusTextLoading;
