export const QUERY_RESET = 'QUERY_RESET';
export const SEARCH_GO_TO_PAGE = 'SEARCH_GO_TO_PAGE';
export const SEARCH_UPDATE_QUERY_PARAMS = 'SEARCH_UPDATE_QUERY_PARAMS';

export function updateSearchState(type, payload) {
  return { type, payload };
}
