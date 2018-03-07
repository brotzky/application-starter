export function paginationReducer(reducer, {
    GO_TO_PAGE = 'GO_TO_PAGE',
    UPDATE_ITEMS_PER_PAGE = 'UPDATE_ITEMS_PER_PAGE',
    UPDATE_QUERY_PARAMS = 'UPDATE_QUERY_PARAMS',
  } = {}) {
  const initialState = {
    itemsPerPage: 10,
    page: 1,
    queryParams: {
      start: 0,
      end: 10,
    },
    ...reducer(undefined, {}),
  };

  return function pagination(state = initialState, action) {
    switch (action.type) {
      case GO_TO_PAGE:
        return Object.assign({}, state, {
          page: action.payload,
        });
      case UPDATE_ITEMS_PER_PAGE:
        return Object.assign({}, state, {
          itemsPerPage: action.payload,
        });
      case UPDATE_QUERY_PARAMS:
        return Object.assign({}, state, {
          queryParams: Object.assign({}, state.queryParams, action.payload),
        });
      default:
        return reducer(state, action);
    }
  };
}
