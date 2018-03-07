import { paginationReducer } from '../../../ui/pagination/reducers/reducers-pagination';

import {
  GET_LOAN_BOOK_PAYMENTS_REQUEST,
  GET_LOAN_BOOK_PAYMENTS_SUCCESS,
  GET_LOAN_BOOK_PAYMENTS_FAILURE,
  CREATE_LOAN_BOOK_PAYMENT_SCHEDULE_REQUEST,
  CREATE_LOAN_BOOK_PAYMENT_SCHEDULE_SUCCESS,
  CREATE_LOAN_BOOK_PAYMENT_SCHEDULE_FAILURE,
  CREATE_LOAN_BOOK_PAYMENT_REQUEST,
  CREATE_LOAN_BOOK_PAYMENT_SUCCESS,
  CREATE_LOAN_BOOK_PAYMENT_FAILURE,
  CREATE_LOAN_BOOK_PAYMENT_COLLECTIONS_SUCCESS,
  CREATE_LOAN_BOOK_PAYMENT_COLLECTIONS_FAILURE,
} from 'grow-actions/loan-book/constants';

import { TOGGLE_ACTION_MENU } from '../../../queue/actions/actions-update-queue-state';

const initialState = {
  createdCollectionsSuccess: false,
  createdCollectionsFailure: false,
  createdNewPaymentSchedule: false,
  createdNewPayment: false,
  errors: [],
  isCreatingNewPaymentSchedule: false,
  isCreatingNewPayment: false,
  isFetching: false,
  itemsPerPage: 10,
  page: 1,
  payments: [],
  resources: [],
  showActionMenu: false,
};

export function loanBookPaymentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOAN_BOOK_PAYMENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_LOAN_BOOK_PAYMENTS_SUCCESS:
      const { results, resources } = action.payload.data;
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        payments: results,
        resources,
      });
    case GET_LOAN_BOOK_PAYMENTS_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        resources,
      });
    case CREATE_LOAN_BOOK_PAYMENT_SCHEDULE_REQUEST:
      return Object.assign({}, state, {
        isCreatingNewPaymentSchedule: true,
      });
    case CREATE_LOAN_BOOK_PAYMENT_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        createdNewPaymentSchedule: true,
        isCreatingNewPaymentSchedule: false,
      });
    case CREATE_LOAN_BOOK_PAYMENT_SCHEDULE_FAILURE:
      return Object.assign({}, state, {
        createdNewPaymentSchedule: false,
        isCreatingNewPaymentSchedule: false,
      });
    case CREATE_LOAN_BOOK_PAYMENT_REQUEST:
      return Object.assign({}, state, {
        isCreatingNewPayment: true,
      });
    case CREATE_LOAN_BOOK_PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        createdNewPayment: true,
        isCreatingNewPayment: false,
      });
    case CREATE_LOAN_BOOK_PAYMENT_FAILURE:
      return Object.assign({}, state, {
        createdNewPayment: false,
        isCreatingNewPayment: false,
      });
    case CREATE_LOAN_BOOK_PAYMENT_COLLECTIONS_SUCCESS:
      return Object.assign({}, state, {
        createdCollectionsSuccess: true,
      });
    case CREATE_LOAN_BOOK_PAYMENT_COLLECTIONS_FAILURE:
      return Object.assign({}, state, {
        createdCollectionsFailure: true,
      });
    case TOGGLE_ACTION_MENU:
      return Object.assign({}, state, {
        showActionMenu: action.payload,
      });
    case 'RESET_LOAN_BOOK':
      return initialState;
    default:
      return state;
  }
}

export default paginationReducer(loanBookPaymentsReducer, {
  GO_TO_PAGE: 'LOAN_BOOK_PAYMENTS_GO_TO_PAGE',
  UPDATE_QUERY_PARAMS: 'LOAN_BOOK_PAYMENTS_UPDATE_QUERY_PARAMS',
});
