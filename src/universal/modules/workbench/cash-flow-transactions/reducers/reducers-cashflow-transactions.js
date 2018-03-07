import {
  GET_CASHFLOW_TRANSACTIONS_REQUEST,
  GET_CASHFLOW_TRANSACTIONS_SUCCESS,
  GET_CASHFLOW_TRANSACTIONS_FAILURE,
  UPDATE_TRANSACTION_PAGE_NUMBER,
  UPDATE_TRANSACTION_ITEMS_PER_PAGE,
  INIT_SORTED_TRANSACTIONS,
  UPDATE_SORTED_TRANSACTIONS,
} from 'grow-actions/cashflow-transactions/constants';

import {
  GET_MEMBER_SUCCESS,
  SYNC_MEMBER_FROM_MEMORY_SUCCESS,
} from 'grow-actions/member/constants';

import { RESET_WORKBENCH } from 'grow-actions/workbench/constants';

const slicedList = (page = 1, per = 10, list = []) => {
  const start = (page - 1) * per;
  const end = per === 0 ? list.length : start + per;

  return end === list.length ? list.slice(start) : list.slice(start, end);
};

const totalPages = (per = 10, list = []) => {
  const total = Math.ceil(list.length / per);

  return total || 0;
};

const initialState = {
  bankAccounts: [],
  errors: [],
  isFetching: false,
  pagination: {
    activePageNumberIndex: 0,
    itemsPerPage: 12,
  },
};

export default function cashflowTransactions(state = initialState, action) {
  let bankAccounts;
  switch (action.type) {
    case SYNC_MEMBER_FROM_MEMORY_SUCCESS:
      return Object.assign({}, initialState, {
        ...action.payload.data.cashflowTransactions,
      });
    case GET_CASHFLOW_TRANSACTIONS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_CASHFLOW_TRANSACTIONS_SUCCESS:
      /**
       * This GET /banking API is out of date and still returns the response
       * without the standard wrapping { data: null, errors: [] }. This is why
       * we have to verify action.payload.user instead of action.payload.data.user
       */
      bankAccounts =
        (action.payload.user && action.payload.user.bankAccounts) || [];

      return Object.assign({}, state, {
        bankAccounts: bankAccounts.map((account, i) => ({
          ...account,
          collapsed: i > 0,
          page: 1,
          pagedList: slicedList(1, 10, account.transactions),
          perPage: 10,
          totalPages: totalPages(10, account.transactions),
        })),
        errors: [...state.errors],
        isFetching: false,
      });
    case GET_CASHFLOW_TRANSACTIONS_FAILURE:
      return Object.assign({}, state, {
        errors: [...action.payload.errors],
        isFetching: false,
      });
    case 'GET_CASHFLOW_TRANSACTIONS_NEXT':
      return Object.assign({}, state, {
        bankAccounts: state.bankAccounts.map((account, i) => {
          let nextPage = account.page + 1;
          if (nextPage > account.totalPages) {
            nextPage = 1;
          }
          if (action.payload === i) {
            return {
              ...account,
              page: nextPage,
              pagedList: slicedList(
                nextPage,
                account.perPage,
                account.transactions,
              ),
            };
          }
          return account;
        }),
      });
    case 'GET_CASHFLOW_TRANSACTIONS_PREVIOUS':
      return Object.assign({}, state, {
        bankAccounts: state.bankAccounts.map((account, i) => {
          let prevPage = account.page - 1;
          if (prevPage < 1) {
            prevPage = 1;
          }
          if (action.payload === i) {
            return {
              ...account,
              page: prevPage,
              pagedList: slicedList(
                prevPage,
                account.perPage,
                account.transactions,
              ),
            };
          }
          return account;
        }),
      });
    case 'COLLAPSE_TRANSACTIONS':
      return Object.assign({}, state, {
        bankAccounts: state.bankAccounts.map((account, i) => {
          if (action.payload.accountIndex === i) {
            return {
              ...account,
              collapsed: action.payload.collapsed,
            };
          }
          return account;
        }),
      });
    case RESET_WORKBENCH:
    case GET_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        bankAccounts: [],
      });
    case UPDATE_TRANSACTION_PAGE_NUMBER:
      return Object.assign({}, state, {
        pagination: {
          ...state.pagination,
          activePageNumberIndex: action.payload.newPageIndex,
        },
      });
    case UPDATE_TRANSACTION_ITEMS_PER_PAGE:
      return Object.assign({}, state, {
        pagination: {
          ...state.pagination,
          itemsPerPage: action.payload.itemsPerPage,
        },
      });
    default:
      return state;
  }
}
