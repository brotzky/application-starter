import { paginationReducer } from '../../../ui/pagination/reducers/reducers-pagination';

import {
  GET_LOAN_BOOK_PAYMENTS_RETURNED_REQUEST,
  GET_LOAN_BOOK_PAYMENTS_RETURNED_SUCCESS,
  GET_LOAN_BOOK_PAYMENTS_RETURNED_FAILURE,
  UPDATE_LOAN_BOOK_PAYMENTS_RETURNED_REQUEST,
  UPDATE_LOAN_BOOK_PAYMENTS_RETURNED_SUCCESS,
  UPDATE_LOAN_BOOK_PAYMENTS_RETURNED_FAILURE,
} from 'grow-actions/loan-book/constants';

import {
  LOAN_BOOK_PAYMENTS_RETURNED_GO_TO_PAGE,
  LOAN_BOOK_PAYMENTS_RETURNED_UPDATE_QUERY_PARAMS,
  LOAN_BOOK_PAYMENTS_RETURNED_UPDATE_ITEMS_PER_PAGE,
} from '../constants';

import {
  TOGGLE_ACTION_MENU,
} from '../../../queue/actions/actions-update-queue-state';

const initialState = {
  errors: [],
  isFetching: false,
  isLoaded: false,
  isUpdating: false,
  payments: [],
  resources: [],
  selectedPaymentId: '',
};

export function personalLoanPaymentsReturnedReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOAN_BOOK_PAYMENTS_RETURNED_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_LOAN_BOOK_PAYMENTS_RETURNED_SUCCESS:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        isLoaded: true,
        payments: action.payload.data.results,
        resources: action.payload.data.resources || [],
      });
    case GET_LOAN_BOOK_PAYMENTS_RETURNED_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        isLoaded: true,
      });
    case UPDATE_LOAN_BOOK_PAYMENTS_RETURNED_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true,
      });
    case UPDATE_LOAN_BOOK_PAYMENTS_RETURNED_SUCCESS:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isUpdating: false,
        payments: state.payments.map(p => {
          if (p.id === action.payload.data.payment.id) {
            return action.payload.data.payment;
          }
          return p;
        }),
      });
    case UPDATE_LOAN_BOOK_PAYMENTS_RETURNED_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isUpdating: false,
      });
    case TOGGLE_ACTION_MENU:
      return Object.assign({}, state, {
        selectedPaymentId: action.payload,
      });
    default:
      return state;
  }
}

export default paginationReducer(personalLoanPaymentsReturnedReducer, {
  GO_TO_PAGE: LOAN_BOOK_PAYMENTS_RETURNED_GO_TO_PAGE,
  UPDATE_QUERY_PARAMS: LOAN_BOOK_PAYMENTS_RETURNED_UPDATE_QUERY_PARAMS,
  UPDATE_ITEMS_PER_PAGE: LOAN_BOOK_PAYMENTS_RETURNED_UPDATE_ITEMS_PER_PAGE,
});
