import { USER_REGISTRATION_SUCCESS } from "./actionTypes";

const initialState = {
  accessToken: "",
  isLogIn: localStorage.getItem("accessToken") ? true : false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
}
