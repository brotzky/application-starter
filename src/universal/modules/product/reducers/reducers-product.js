import { combineReducers } from 'redux';
import {
  loanBookOverviewReducer,
  loanBookPaymentsReducer,
  loanBookTransactionsReducer,
  loanBookAmortizationReducer,
} from '../loan-book/reducers/';

const productReducer = combineReducers({
  loanBookAmortization: loanBookAmortizationReducer,
  loanBookOverview: loanBookOverviewReducer,
  loanBookPayments: loanBookPaymentsReducer,
  loanBookTransactions: loanBookTransactionsReducer,
});

export default productReducer;
