import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UNLOCK_USER_PROFILE_SUCCESS,
  ENABLE_2FA_TO_USER_REQUEST,
  ENABLE_2FA_TO_USER_SUCCESS,
  ENABLE_2FA_TO_USER_FAILURE,
  DISABLE_2FA_TO_USER_REQUEST,
  DISABLE_2FA_TO_USER_SUCCESS,
  DISABLE_2FA_TO_USER_FAILURE,
  ADD_PASSWORD_TO_USER_SUCCESS,
  ADD_PASSWORD_TO_USER_FROM_PROFILE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
} from 'grow-actions/user/constants';

import { UPLOAD_PROFILE_PICTURE_SUCCESS } from 'grow-actions/upload-file/constants';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  profilePicture: '',
  role: [],
  errors: [],
  isFetching: false,
  isUpdating: false,
  isDeleting: false,
  auth0MfaEnabled: false,
  auth0Updating: false,
  auth0InviteStatus: '',
  oldPasswordValidationError: '',
  resources: [],
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return Object.assign({}, state.settings, {
        isFetching: true,
      });
    case UPDATE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        oldPasswordValidationError: '',
      });
    case UPDATE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        oldPasswordValidationError: action.payload
          ? 'Plese enter your old password correctly'
          : '',
      });
    case UPDATE_USER_PROFILE_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true,
      });
    case DELETE_USER_REQUEST:
      return Object.assign({}, state, {
        isDeleting: true,
      });
    case GET_USER_PROFILE_SUCCESS:
    case GET_USER_PROFILE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAddPasswordFormVisible: false,
        ...action.payload.data.user,
        resources: action.payload.data.resources,
      });
    case ADD_PASSWORD_TO_USER_FROM_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        auth0InviteStatus: 'ACCEPTED',
      });
    case ENABLE_2FA_TO_USER_REQUEST:
    case DISABLE_2FA_TO_USER_REQUEST:
      return Object.assign({}, state, {
        auth0Updating: true,
      });
    case ENABLE_2FA_TO_USER_SUCCESS:
      return Object.assign({}, state, {
        auth0MfaEnabled: true,
        auth0Updating: false,
      });
    case DISABLE_2FA_TO_USER_SUCCESS:
      return Object.assign({}, state, {
        auth0MfaEnabled: false,
        auth0Updating: false,
      });
    case ADD_PASSWORD_TO_USER_SUCCESS:
      return Object.assign({}, state, {
        auth0InviteStatus: 'INVITED',
      });
    case DELETE_USER_FAILURE:
    case UPDATE_USER_PROFILE_SUCCESS:
    case UPDATE_USER_PROFILE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isUpdating: false,
        isDeleting: false,
        ...action.payload.data.user,
        resources: action.payload.data.resources,
      });
    case UNLOCK_USER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data.user,
      });
    case UPLOAD_PROFILE_PICTURE_SUCCESS:
      return Object.assign({}, state, {
        profilePicture:
          action.payload.user.id === state.id
            ? action.payload.preview
            : state.profilePicture,
      });
    case DELETE_USER_SUCCESS:
    case 'RESET_PROFILE':
      return initialState;
    default:
      return state;
  }
}
