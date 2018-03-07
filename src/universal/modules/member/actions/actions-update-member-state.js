export const EDIT_NOTE = 'EDIT_NOTE';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const NOTES_GO_TO_PAGE = 'NOTES_GO_TO_PAGE';
export const NOTES_UPDATE_QUERY_PARAMS = 'NOTES_UPDATE_QUERY_PARAMS';
export const TOGGLE_NOTE_COMPOSER = 'TOGGLE_NOTE_COMPOSER';

export function updateMemberState(type, payload) {
  return { type, payload };
}
