import axios from "axios";

import config from "../../config.json";
import { USER_REGISTRATION_SUCCESS } from "./actionTypes";

export const userRegistration = (user) => {
  return async (dispatch) => {
    let url = `${config.serverUrl}/auth/user/`;
    const res = await axios.post(url, user);
    dispatch(userRegistrationSuccess(res.data.accessToken));
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
