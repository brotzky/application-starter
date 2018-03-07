import {
  NOTIFICATION_PUSH,
  NOTIFICATION_EDIT,
  NOTIFICATION_DISMISS,
  NOTIFICATION_CLEAR,
} from '../actions/';

const initialState = [];

export function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_PUSH:
      return [action.payload, ...state.filter(({ id }) => id !== action.payload.id)];
    case NOTIFICATION_EDIT:
      return state.map(notif => {
        if (notif.id === action.payload.id) { return Object.assign({}, notif, action.payload); }
        return notif;
      });
    case NOTIFICATION_DISMISS:
      return state.filter(notif => notif.id !== action.payload);
    case NOTIFICATION_CLEAR:
      return [];
    default:
      return state;
  }
}
