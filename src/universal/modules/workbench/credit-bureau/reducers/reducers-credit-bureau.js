import {
  GET_CREDIT_BUREAU_REQUEST,
  GET_CREDIT_BUREAU_SUCCESS,
  GET_CREDIT_BUREAU_FAILURE,
  GET_CREDIT_REPORT_REQUEST,
  GET_CREDIT_REPORT_SUCCESS,
  GET_CREDIT_REPORT_FAILURE,
  PULL_CREDIT_BUREAU_REQUEST,
  PULL_CREDIT_BUREAU_SUCCESS,
  PULL_CREDIT_BUREAU_FAILURE,
} from 'grow-actions/credit-bureau/constants';

import { RESET_WORKBENCH } from 'grow-actions/workbench/constants';

const initialState = {
  dateLastRetrieved: '',
  report: {
    id: null,
    hit: false,
    dateRetrieved: '',
    report: '',
  },
  reports: [],
  errors: [],
  isFetching: true,
  isFetchingReport: false,
  isPullingBureau: false,
};

export function checklistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CREDIT_BUREAU_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_CREDIT_BUREAU_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isFetching: false,
      });
    case GET_CREDIT_BUREAU_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isFetching: false,
      });
    case GET_CREDIT_REPORT_REQUEST:
      return Object.assign({}, state, {
        isFetchingReport: true,
      });
    case GET_CREDIT_REPORT_SUCCESS:
      return Object.assign({}, state, {
        report: action.payload.data.report,
        errors: action.payload.errors,
        isFetchingReport: false,
      });
    case GET_CREDIT_REPORT_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetchingReport: false,
      });
    case PULL_CREDIT_BUREAU_REQUEST:
      return Object.assign({}, state, {
        isPullingBureau: true,
      });
    case PULL_CREDIT_BUREAU_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isPullingBureau: false,
      });
    case PULL_CREDIT_BUREAU_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isPullingBureau: false,
      });
    case RESET_WORKBENCH:
      return initialState;
    default:
      return state;
  }
}

export default checklistReducer;
