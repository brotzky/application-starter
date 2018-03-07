import { paginationReducer } from '../../../ui/pagination/reducers/reducers-pagination';

import {
  GET_LOAN_BOOK_AMORTIZATION_REQUEST,
  GET_LOAN_BOOK_AMORTIZATION_SUCCESS,
  GET_LOAN_BOOK_AMORTIZATION_FAILURE,
} from 'grow-actions/loan-book/constants';

const initialState = {
  errors: [],
  isFetching: false,
  amortization: [],
  resources: [],
};

export function loanBookAmortizationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOAN_BOOK_AMORTIZATION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_LOAN_BOOK_AMORTIZATION_SUCCESS:
      const { results, resources } = action.payload.data;
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        amortization: results,
        resources,
      });
    case GET_LOAN_BOOK_AMORTIZATION_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        resources,
      });
    case 'RESET_LOAN_BOOK':
      return initialState;
    default:
      return state;
  }
}

export default paginationReducer(loanBookAmortizationReducer, {
  GO_TO_PAGE: 'LOAN_BOOK_AMORTIZATION_GO_TO_PAGE',
  UPDATE_QUERY_PARAMS: 'LOAN_BOOK_AMORTIZATION_UPDATE_QUERY_PARAMS',
});
