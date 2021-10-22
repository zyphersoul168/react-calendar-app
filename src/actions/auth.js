import Swal from "sweetalert2";
import { types } from "../actionTypes/types";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const response = await fetchWithoutToken(
      "auth/login",
      { email, password },
      "POST"
    );
    const body = await response.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startSignup = (name, email, password) => {
  return async (dispatch) => {
    const response = await fetchWithoutToken(
      "auth/signup",
      { name, email, password },
      "POST",
    );

    const body = await response.json();

    if(body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  }
};

export const startChecking = () => {
  return async (dispatch) => {
    const response = await fetchWithToken("auth/resignup");

    const body = await response.json();

    if(body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      dispatch(setCheckingFinish());
    }
  }
}

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(eventLogout());
    dispatch(logout());
  };
};

// sync actions
export const setCheckingFinish = () => ({
  type: types.authCheckingFinish,
});

export const login = (user) => ({
  type: types.authLogin,
  payload: user,
}); 

export const logout = () => ({
  type: types.authLogout,
});