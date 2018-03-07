/**
 * syncMembers()
 * redux middleware that will sync a member from the redux store
 * instead of calling our backend through an API. The main usecase of this
 * middleware is for joint applications within the workbench.
 */

import {
  GET_MEMBER_SUCCESS,
  GET_MEMBER_FAILURE,
  GET_MEMBER_PROFILE_SUCCESS,
  GET_MEMBER_PROFILE_FAILURE,
  UPDATE_MEMBER_PROFILE_SUCCESS,
  UPDATE_MEMBER_PROFILE_FAILURE,
  SYNC_MEMBER_FROM_MEMORY_REQUEST,
  SYNC_MEMBER_FROM_MEMORY_SUCCESS,
} from 'grow-actions/member/constants';

import {
  GET_CASHFLOW_TRANSACTIONS_SUCCESS,
  GET_CASHFLOW_TRANSACTIONS_FAILURE,
} from 'grow-actions/cashflow-transactions/constants';
import {
  UPDATE_PRODUCT_APPLICATIONS_SUCCESS,
  UPDATE_PRODUCT_APPLICATIONS_FAILURE,
} from 'grow-actions/product-applications/constants';

export const syncMembers = store => next => action => {
  switch (action.type) {
    case SYNC_MEMBER_FROM_MEMORY_REQUEST:
      const member = store.getState().members.loaded[action.payload];
      store.dispatch({
        type: SYNC_MEMBER_FROM_MEMORY_SUCCESS,
        payload: { data: member },
      });
    default:
  }

  switch (action.type) {
    case GET_MEMBER_SUCCESS:
    case GET_MEMBER_FAILURE:
    case GET_MEMBER_PROFILE_SUCCESS:
    case GET_MEMBER_PROFILE_FAILURE:
    case UPDATE_MEMBER_PROFILE_SUCCESS:
    case UPDATE_MEMBER_PROFILE_FAILURE:
    case UPDATE_PRODUCT_APPLICATIONS_SUCCESS:
    case UPDATE_PRODUCT_APPLICATIONS_FAILURE:
      action.payload.id = store.getState().member.member.id;
      store.dispatch({
        type: 'UPDATE_LOADED_MEMBERS',
        payload: action.payload,
      });

    default:
  }

  switch (action.type) {
    case GET_CASHFLOW_TRANSACTIONS_SUCCESS:
    case GET_CASHFLOW_TRANSACTIONS_FAILURE:
      store.dispatch({
        type: 'UPDATE_LOADED_MEMBERS',
        payload: {
          data: {
            cashflowTransactions: action.payload,
          },
          id: store.getState().member.member.id,
        },
      });

    default:
  }

  return next(action);
};
