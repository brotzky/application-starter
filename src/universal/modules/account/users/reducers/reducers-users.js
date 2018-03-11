import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_INVITE_REQUEST,
  GET_INVITE_SUCCESS,
  GET_INVITE_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
  SORT_USERS,
} from 'grow-actions/user/constants';

import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
  GET_ROLE_FAILURE,
  CREATE_ROLE_REQUEST,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
} from 'grow-actions/roles/constants';

const initialState = {
  errors: [],
  isFetching: false,
  isFetchingRole: false,
  creatingUser: false,
  resources: [],
  permissions: [],
  profilePicture: '',
  users: [],
  roles: [],
  role: {},
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case CREATE_USER_REQUEST:
      return Object.assign({}, state, {
        creatingUser: true,
      });
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        users: action.payload.data.users,
      });
    case CREATE_USER_SUCCESS:
      return Object.assign({}, state, {
        creatingUser: false,
        users: [action.payload.data.user, ...state.users],
      });
    case GET_INVITE_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.error,
      });

    case UPDATE_USER_PROFILE_SUCCESS:
      const position = state.users.findIndex(
        user => user.id === action.payload.data.user.id,
      );

      return Object.assign({}, state, {
        creatingUser: false,
        users: [
          ...state.users.slice(0, position),
          action.payload.data.user,
          ...state.users.slice(position + 1),
        ],
      });
    case DELETE_USER_SUCCESS:
      const deletedPosition = state.users.findIndex(
        user => user.id === action.payload.data.user.id,
      );

      return Object.assign({}, state, {
        users: [
          ...state.users.slice(0, deletedPosition),
          ...state.users.slice(deletedPosition + 1),
        ],
      });
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
        users: action.payload.data.users,
      });
    case CREATE_USER_FAILURE:
      return Object.assign({}, state, {
        creatingUser: false,
      });
    case GET_USERS_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
      });
    case GET_ROLES_SUCCESS:
      return Object.assign({}, state, {
        roles: action.payload.data.roles,
        permissions: action.payload.data.permissions,
        isFetchingRole: false,
      });
    case GET_ROLES_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
      });
    case GET_ROLE_REQUEST:
    case GET_ROLES_REQUEST:
    case CREATE_ROLE_REQUEST:
    case UPDATE_ROLE_REQUEST:
    case DELETE_ROLE_REQUEST:
      return Object.assign({}, state, {
        isFetchingRole: true,
      });
    case GET_ROLE_FAILURE:
    case CREATE_ROLE_FAILURE:
    case UPDATE_ROLE_FAILURE:
    case DELETE_ROLE_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetchingRole: false,
      });
    case CREATE_ROLE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingRole: false,
        roles: [...state.roles, action.payload.data],
      });
    case UPDATE_ROLE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingRole: false,
        roles: state.roles.map(role => {
          if (role.id === action.payload.data.id) {
            return action.payload.data;
          }
          return role;
        }),
      });
    case DELETE_ROLE_SUCCESS:
      return Object.assign({}, state, {
        isFetchingRole: false,
      });
    case GET_ROLE_SUCCESS:
      return Object.assign({}, state, {
        role: action.payload.data,
        isFetchingRole: false,
      });
    case 'RESET_ROLE':
      return Object.assign({}, state, {
        role: {},
      });
    default:
      return state;
  }
}
