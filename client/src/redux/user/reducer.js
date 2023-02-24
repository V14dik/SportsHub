import { LOG_OUT, USER_REGISTRATION_SUCCESS } from "./actionTypes";

const initialState = {
  accessToken: "",
  isLogIn: localStorage.getItem("accessToken") ? true : false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        isLogIn: true,
        accessToken: action.payload.accessToken,
      };
    case LOG_OUT:
      return {
        ...state,
        isLogIn: false,
        accessToken: "",
      };
    default:
      return state;
  }
}
