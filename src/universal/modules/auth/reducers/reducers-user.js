import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_SETTINGS_REQUEST,
  GET_USER_SETTINGS_SUCCESS,
  GET_USER_SETTINGS_FAILURE,
  UPDATE_USER_SETTINGS_REQUEST,
  UPDATE_USER_SETTINGS_SUCCESS,
  UPDATE_USER_SETTINGS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  ADD_PASSWORD_TO_USER_FROM_PROFILE_REQUEST,
  ADD_PASSWORD_TO_USER_FROM_PROFILE_SUCCESS,
  ADD_PASSWORD_TO_USER_FROM_PROFILE_FAILURE,
  ADD_PASSWORD_TO_USER_REQUEST,
  ADD_PASSWORD_TO_USER_SUCCESS,
  ADD_PASSWORD_TO_USER_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
} from 'grow-actions/user/constants';

import { UPLOAD_PROFILE_PICTURE_FILE_SUCCESS } from 'grow-actions/upload-file/constants';

const initialState = {
  firstName: '',
  lastName: '',
  profilePicture: '',
  email: '',
  role: [],
  errors: [],
  isFetching: false,
  resources: [],
  permissions: [],
  isUpdatingPassword: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true,
      });
    case GET_USER_SUCCESS:
    case GET_USER_FAILURE:
    case UPDATE_USER_SUCCESS:
    case UPDATE_USER_FAILURE:
      const { resources, user } = action.payload.data;
      return Object.assign({}, state, {
        ...user,
        errors: action.payload.errors,
        isFetching: false,
        isUpdating: false,
        resources,
      });
    case UPLOAD_PROFILE_PICTURE_FILE_SUCCESS:
      return Object.assign({}, state, {
        profilePicture: action.payload.preview,
      });
    case GET_USER_SETTINGS_REQUEST:
      return Object.assign({}, state, {
        settings: Object.assign({}, state.settings, {
          isFetching: true,
        }),
      });
    case UPDATE_USER_SETTINGS_REQUEST:
      return Object.assign({}, state, {
        settings: Object.assign({}, state.settings, {
          isUpdating: true,
        }),
      });
    case ADD_PASSWORD_TO_USER_FROM_PROFILE_REQUEST:
    case ADD_PASSWORD_TO_USER_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isUpdatingPassword: true,
      });
    case ADD_PASSWORD_TO_USER_FROM_PROFILE_SUCCESS:
    case ADD_PASSWORD_TO_USER_SUCCESS:
    case ADD_PASSWORD_TO_USER_FROM_PROFILE_FAILURE:
    case ADD_PASSWORD_TO_USER_FAILURE:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isUpdatingPassword: false,
      });
    case GET_USER_SETTINGS_SUCCESS:
    case GET_USER_SETTINGS_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        settings: Object.assign({}, state.settings, {
          isFetching: false,
          ...action.payload.data.user,
          resources: action.payload.data.resources,
        }),
      });
    case UPDATE_USER_SETTINGS_SUCCESS:
    case UPDATE_USER_SETTINGS_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        settings: Object.assign({}, state.settings, {
          isFetching: false,
          isUpdating: false,
          ...action.payload.data.user,
          resources: action.payload.data.resources,
        }),
      });
    default:
      return state;
  }
}
