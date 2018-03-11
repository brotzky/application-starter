// import {
//   GET_USERS_REQUEST,
//   GET_USERS_SUCCESS,
//   GET_USERS_FAILURE,
// } from 'grow-actions/user/constants';

const initialState = {
  language: "en",
  country: "",
};

export default function localizationReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
