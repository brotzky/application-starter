import {
  GET_LOAN_BOOK_OVERVIEW_REQUEST,
  GET_LOAN_BOOK_OVERVIEW_SUCCESS,
  GET_LOAN_BOOK_OVERVIEW_FAILURE,
} from 'grow-actions/loan-book/constants';

const initialState = {
  errors: [],
  isFetching: false,
  resources: [],
};

export default function loanBookOverviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOAN_BOOK_OVERVIEW_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_LOAN_BOOK_OVERVIEW_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data.loanBook,
        errors: action.payload.errors,
        isFetching: false,
      });
    case GET_LOAN_BOOK_OVERVIEW_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
      });
    case 'RESET_LOAN_BOOK':
      return initialState;
    default:
      return state;
  }
}
