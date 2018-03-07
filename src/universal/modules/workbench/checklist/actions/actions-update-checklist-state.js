export const SHOW_CHECKLIST_ITEM_DETAILS = 'SHOW_CHECKLIST_ITEM_DETAILS';
export const HIDE_CHECKLIST_ITEM_DETAILS = 'HIDE_CHECKLIST_ITEM_DETAILS';

export const UPDATE_CHECKLIST_FILTER = 'UPDATE_CHECKLIST_FILTER';

export const SHOW_CHECKLIST_MODAL_BACKGROUND =
  'SHOW_CHECKLIST_MODAL_BACKGROUND';

export function updateChecklistState(type, payload) {
  return {
    type,
    payload,
  };
}

export function showChecklistBackground(payload) {
  return {
    type: SHOW_CHECKLIST_MODAL_BACKGROUND,
    payload,
  };
}
