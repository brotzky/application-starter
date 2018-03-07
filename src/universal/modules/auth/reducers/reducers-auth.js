import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
  AUTH_TOKEN_REQUEST,
  AUTH_TOKEN_SUCCESS,
  AUTH_TOKEN_FAILURE,
  AUTH_ONE_TIME_PASS_REQUEST,
  AUTH_ONE_TIME_PASS_SUCCESS,
  AUTH_ONE_TIME_PASS_FAILURE,
  AUTH_RESET_LOGIN_MESSAGE,
  AUTH_AUTH0_LOGIN_SUCCESS,
  AUTH0_SUCCESS,
  REQ_RESET_PASSWORD_SUCCESS,
} from 'grow-actions/auth/constants';

// Okay, okay, this is hacky. We need it to show meridian branding.
// const isMeridian = window.location.origin.includes('meridian');

const initialState = {
  accessToken: null,
  authChecked: false,
  errors: [],
  hasSentOneTimePass: false,
  isAuthenticated: false,
  isAuthenticating: false,
  hasSentResetPasswordInstructions: false,
  isFetchingOneTimePass: false,
  isFetchingToken: false,
  responsedForm: null,
  organization: '',
};

export default function authReducer(state = initialState, action) {
  /**
   * Removing permissions key off returned object
   * to avoid duplicate content within the state
   * permissions can be found in the permissions key
   */
  if (
    action.type === AUTH_SUCCESS ||
    action.type === AUTH_CHECK_SUCCESS ||
    action.type === AUTH0_SUCCESS
  ) {
    const { permissions, ...rest } = action.payload.data;

    switch (action.type) {
      case AUTH0_SUCCESS:
      case AUTH_SUCCESS:
      case AUTH_CHECK_SUCCESS:
        return Object.assign({}, state, {
          ...rest,
          errors: action.payload.errors,
          authChecked: true,
          isAuthenticated: true,
          isAuthenticating: false,
        });
      default:
        return state;
    }
  }

  switch (action.type) {
    case AUTH_REQUEST:
    case AUTH_CHECK_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
      });
    case AUTH_AUTH0_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        responsedForm: action.payload,
      });
    case AUTH_TOKEN_REQUEST:
      return Object.assign({}, state, {
        isFetchingToken: true,
      });
    case AUTH_TOKEN_SUCCESS:
    case AUTH_TOKEN_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isFetchingToken: false,
      });
    case AUTH_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isAuthenticated: false,
        isAuthenticating: false,
      });
    case AUTH_CHECK_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        isAuthenticated: false,
        isAuthenticating: false,
        authChecked: true,
      });
    case AUTH_ONE_TIME_PASS_REQUEST:
      return Object.assign({}, state, {
        isFetchingOneTimePass: true,
      });
    case AUTH_ONE_TIME_PASS_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isFetchingOneTimePass: false,
        hasSentOneTimePass: true,
      });
    case REQ_RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        hasSentResetPasswordInstructions: true,
      });
    case AUTH_ONE_TIME_PASS_FAILURE:
      return Object.assign({}, state, {
        ...action.payload.data,
        errors: action.payload.errors,
        isFetchingOneTimePass: false,
        hasSentOneTimePass: false,
      });
    case AUTH_RESET_LOGIN_MESSAGE:
      return Object.assign({}, state, {
        hasSentOneTimePass: false,
      });
    default:
      return state;
  }
}
