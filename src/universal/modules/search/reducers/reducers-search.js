import { paginationReducer } from '../../ui/pagination/reducers/reducers-pagination';

import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_FAILURE,
} from 'grow-actions/member/constants';

import {
  QUERY_RESET,
  SEARCH_GO_TO_PAGE,
  SEARCH_UPDATE_QUERY_PARAMS,
} from '../actions/actions-update-search-state';

const initialState = {
  errors: [],
  isFetching: false,
  queryParams: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  members: [],
  resoures: [],
};

export function searchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_MEMBERS_SUCCESS:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        members: action.payload.data.members,
        resources: action.payload.data.resources,
      });
    case GET_MEMBERS_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isFetching: false,
      });
    case QUERY_RESET:
      return Object.assign({}, state, {
        queryParams: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        },
        members: [],
      });
    default:
      return state;
  }
}

export default paginationReducer(searchReducer, {
  GO_TO_PAGE: SEARCH_GO_TO_PAGE,
  UPDATE_QUERY_PARAMS: SEARCH_UPDATE_QUERY_PARAMS,
});
