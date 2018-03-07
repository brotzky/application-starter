import {
  GET_MEMBER_SUCCESS,
  GET_MEMBER_FAILURE,
  GET_MEMBER_PROFILE_REQUEST,
  GET_MEMBER_PROFILE_SUCCESS,
  GET_MEMBER_PROFILE_FAILURE,
  UPDATE_MEMBER_PROFILE_REQUEST,
  UPDATE_MEMBER_PROFILE_SUCCESS,
  UPDATE_MEMBER_PROFILE_FAILURE,
} from 'grow-actions/member/constants';

import {
  UPDATE_PRODUCT_APPLICATIONS_REQUEST,
  UPDATE_PRODUCT_APPLICATIONS_SUCCESS,
  UPDATE_PRODUCT_APPLICATIONS_FAILURE,
} from 'grow-actions/product-applications/constants';

import {
  EDIT_PROFILE,
  TOGGLE_NOTE_COMPOSER,
} from '../actions/actions-update-member-state';

import { TOGGLE_ACTION_MENU } from '../../queue/actions/actions-update-queue-state';

const initialState = {
  loaded: {},
};

const handleMembers = (state, action) => {
  const fetchedMemberId =
    action.payload.id ||
    (action.payload.data.member && action.payload.data.member.id);

  return Object.assign({}, state, {
    loaded: {
      ...state.loaded,
      [fetchedMemberId]: {
        ...state.loaded[fetchedMemberId],
        ...action.payload.data,
      },
    },
  });
};

export default function membersReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_LOADED_MEMBERS':
      return handleMembers(state, action);
    default:
      return state;
  }
}
