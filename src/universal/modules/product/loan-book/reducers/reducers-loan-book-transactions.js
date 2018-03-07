import { paginationReducer } from '../../../ui/pagination/reducers/reducers-pagination';

import {
  GET_LOAN_BOOK_TRANSACTIONS_REQUEST,
  GET_LOAN_BOOK_TRANSACTIONS_SUCCESS,
  GET_LOAN_BOOK_TRANSACTIONS_FAILURE,
} from 'grow-actions/loan-book/constants';

const initialState = {
  errors: [],
  isFetching: false,
  transactions: [],
  resources: [],
};

export function loanBookTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOAN_BOOK_TRANSACTIONS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_LOAN_BOOK_TRANSACTIONS_SUCCESS:
      const { results, resources } = action.payload.data;
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        transactions: results,
        resources,
      });
    case GET_LOAN_BOOK_TRANSACTIONS_FAILURE:
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

export default paginationReducer(loanBookTransactionsReducer, {
  GO_TO_PAGE: 'LOAN_BOOK_TRANSACTIONS_GO_TO_PAGE',
  UPDATE_QUERY_PARAMS: 'LOAN_BOOK_TRANSACTIONS_UPDATE_QUERY_PARAMS',
});
