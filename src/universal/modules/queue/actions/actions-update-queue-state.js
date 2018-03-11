export const QUEUE_GO_TO_PAGE = 'QUEUE_GO_TO_PAGE';
export const QUEUE_UPDATE_QUERY_PARAMS = 'QUEUE_UPDATE_QUERY_PARAMS';
export const QUEUE_UPDATE_ITEMS_PER_PAGE = 'QUEUE_UPDATE_ITEMS_PER_PAGE';
export const TOGGLE_ACTION_MENU = 'TOGGLE_ACTION_MENU';
export const QUEUE_IS_STALE = 'QUEUE_IS_STALE';
export const QUEUE_IS_NOT_STALE = 'QUEUE_IS_NOT_STALE';
export function updateQueueState(type, payload = {}) {
  return { type, payload };
}
