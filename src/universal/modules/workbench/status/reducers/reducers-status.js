import {
  GET_STATUS_OVERRIDE_NOTE_REQUEST,
  GET_STATUS_OVERRIDE_NOTE_SUCCESS,
  GET_STATUS_OVERRIDE_NOTE_FAILURE,
  UPDATE_STATUS_OVERRIDE_NOTE_REQUEST,
  UPDATE_STATUS_OVERRIDE_NOTE_SUCCESS,
  UPDATE_STATUS_OVERRIDE_NOTE_FAILURE,
  RESET_WORKBENCH,
} from 'grow-actions/status/constants';

const initialState = {
  isFetching: true,
  isSubmittingApproval: false,
  isSubmittingDecline: false,
  isSubmittingOnHold: false,
  errors: [],
};

export function statusReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STATUS_OVERRIDE_NOTE_REQUEST:
    case UPDATE_STATUS_OVERRIDE_NOTE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_STATUS_OVERRIDE_NOTE_SUCCESS:
    case UPDATE_STATUS_OVERRIDE_NOTE_SUCCESS:
      return Object.assign({}, state, {
        note: action.payload.data.note,
        isFetching: false,
      });
    case UPDATE_STATUS_OVERRIDE_NOTE_FAILURE:
    case GET_STATUS_OVERRIDE_NOTE_FAILURE:
      return Object.assign({}, state, {
        errors: action.payload.errors,
        isFetching: false,
      });
    case RESET_WORKBENCH:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export default statusReducer;
