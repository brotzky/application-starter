import { GET_APP_CONFIG_SUCCESS } from '../constants';

const initialState = {
  config: {},
  isLoaded: false,
  mounted: false,
};

function appConfigReducer(state = initialState, action) {
  switch (action.type) {
    case 'CLIENT_MOUNTED':
      return Object.assign({}, state, {
        mounted: true,
      });
    case GET_APP_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        isLoaded: true,
        config: action.payload,
      });
    default:
      return state;
  }
}

export default appConfigReducer;
