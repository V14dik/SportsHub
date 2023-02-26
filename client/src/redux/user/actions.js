import axios from "axios";

import config from "../../config.json";
import {
  LOG_OUT,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  USER_REGISTRATION_ERROR,
  USER_REGISTRATION_SUCCESS,
} from "./actionTypes";

export const userRegistration = (user) => {
  return async (dispatch) => {
    try {
      let url = `${config.serverUrl}/auth/registration/`;
      const res = await axios.post(url, user);
      dispatch(userRegistrationSuccess(res.data.accessToken));
    } catch (err) {
      dispatch(userRegistrationError(err.response.data.message));
    }
  };
};

export const userRegistrationSuccess = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
  return {
    type: USER_REGISTRATION_SUCCESS,
    payload: {
      accessToken,
    },
  };
};

export const userRegistrationError = (errorMessage) => {
  return {
    type: USER_REGISTRATION_ERROR,
    payload: {
      message: errorMessage,
    },
  };
};

export const logOut = () => {
  localStorage.removeItem("accessToken");
  return {
    type: LOG_OUT,
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const url = `${config.serverUrl}/auth/user`;
      const res = await axios.post(url, data);
      dispatch(signInSuccess(res.data.accessToken));
    } catch (err) {
      dispatch(signInError(err.response.data.message));
      switch (err.response.status) {
        case 400: {
          console.log(err.response.data.message);
          break;
        }
        case 500: {
          console.log(err.response.data.message);
          break;
        }
        default: {
          console.log(err);
        }
      }
    }
  };
};

const signInSuccess = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      accessToken,
    },
  };
};

const signInError = (errorMessage) => {
  return {
    type: SIGN_IN_ERROR,
    payload: {
      message: errorMessage,
    },
  };
};
