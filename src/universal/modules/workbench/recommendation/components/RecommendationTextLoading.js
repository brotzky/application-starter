import React from 'react';
import Spinner from '../../../ui/spinner/spinner';

const RecommendationTextLoading = ({ isFetching }) =>
  isFetching ? <Spinner className="RecommendationSpinner" color="#448aff" size={28} /> : null;

export default RecommendationTextLoading;
