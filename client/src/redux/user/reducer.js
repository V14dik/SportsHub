import {
  LOG_OUT,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  USER_REGISTRATION_ERROR,
  USER_REGISTRATION_SUCCESS,
} from "./actionTypes";

const initialState = {
  accessToken: "",
  isLogIn: localStorage.getItem("accessToken") ? true : false,
  isRegisterError: false,
  registerError: "",
  isSignInError: false,
  signInError: "",
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        isLogIn: true,
        accessToken: action.payload.accessToken,
        isRegisterError: false,
      };
    case USER_REGISTRATION_ERROR:
      return {
        ...state,
        isRegisterError: true,
        registerError: action.payload.message,
      };
    case LOG_OUT:
      return {
        ...state,
        isLogIn: false,
        accessToken: "",
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLogIn: true,
        accessToken: action.payload.accessToken,
        isSignInError: false,
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        isSignInError: true,
        signInError: action.payload.message,
      };
    default:
      return state;
  }
}
