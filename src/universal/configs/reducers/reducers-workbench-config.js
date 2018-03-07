import { GET_WORKBENCH_CONFIG_SUCCESS } from '../constants';

const initialState = {
  config: {},
  isLoaded: false,
};

function workbenchConfigReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORKBENCH_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        isLoaded: true,
        config: action.payload,
      });
    default:
      return state;
  }
}

export default workbenchConfigReducer;
