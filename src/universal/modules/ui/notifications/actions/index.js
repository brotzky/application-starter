export const NOTIFICATION_PUSH = 'NOTIFICATION_PUSH';
export const NOTIFICATION_EDIT = 'NOTIFICATION_EDIT';
export const NOTIFICATION_DISMISS = 'NOTIFICATION_DISMISS';
export const NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR';

export function notificationPush(notification) {
  const payload = Object.assign({}, notification);
  if (!payload.id) {
    payload.id = new Date().getTime();
  }

  return dispatch => {
    dispatch({ type: NOTIFICATION_PUSH, payload });

    if (payload.dismissAfter) {
      setTimeout(() => {
        dispatch({
          type: NOTIFICATION_DISMISS,
          payload: payload.id,
        });
      }, payload.dismissAfter);
    }
  };
}

export function notificationEdit(payload) {
  return dispatch => {
    dispatch({ type: NOTIFICATION_EDIT, payload });

    if (payload.dismissAfter) {
      setTimeout(() => {
        dispatch({
          type: NOTIFICATION_DISMISS,
          payload: payload.id,
        });
      }, payload.dismissAfter);
    }
  };
}

export function notificationDismiss(id) {
  return { type: NOTIFICATION_DISMISS, payload: id };
}

export function notificationClear() {
  return { type: NOTIFICATION_CLEAR };
}
