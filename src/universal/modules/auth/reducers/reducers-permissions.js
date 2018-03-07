import {
  AUTH_CHECK_SUCCESS,
  AUTH_SUCCESS,
  AUTH_UPDATE_PERMISSION,
  AUTH0_SUCCESS,
  GET_ENV_PROPERTIES_SUCCESS,
} from 'grow-actions/auth/constants';

const initialState = {
  permissions: null,
  envProperties: null,
};

export default function permissionsReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH0_SUCCESS:
    case AUTH_SUCCESS:
    case AUTH_CHECK_SUCCESS:
      return Object.assign({}, state, {
        permissions: action.payload.data.permissions,
      });
    case AUTH_UPDATE_PERMISSION:
      return Object.assign({}, state, {
        permissions: action.payload,
      });
    case GET_ENV_PROPERTIES_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        envProperties: action.payload,
      });
    default:
      return state;
  }
}
