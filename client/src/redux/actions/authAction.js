import axios from "axios";
import { serverURI } from "../store";

const authInstance = axios.create({
  baseURL: `${serverURI}`,
  withCredentials: true,
});

//login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginReq" });
    const { data } = await authInstance.post(
      "user/login",
      {
        email,
        password,
      },
      { header: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "loginRes", payload: data });
  } catch (error) {
    dispatch({ type: "loginRej", payload: error.response.data.message });
  }
};
//logout action
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutReq" });
    const { data } = await authInstance.get("/user/logout");
    dispatch({ type: "logoutRes", payload: data });
  } catch (error) {
    dispatch({ type: "logoutRej", payload: error.response.data.message });
  }
};
// register
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "registerReq" });
    const { data } = await authInstance.post("/user/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({ type: "registerRes", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "registerRej", payload: error.response.data.message });
  }
};

//loadUser
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserReq" });
    const { data } = await authInstance.get("/user/me");
    dispatch({ type: "loadUserRes", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserRej", payload: error.response.data.message });
  }
};
//swap role
export const swapRole = (role) => async (dispatch) => {
  try {
    dispatch({ type: "editRoleReq" });
    const { data } = await authInstance.put("/user/me", {role});
    dispatch({ type: "editRoleRes", payload: data });
  } catch (error) {
    dispatch({ type: "editRoleRej", payload: error.response.data.message });
  }
};

//change User password
export const changePassword =
  (currentPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "changePasswordReq" });
      const { data } = await authInstance.put("/user/changepassword", {
        currentPassword,
        newPassword,
      });
      dispatch({ type: "changePasswordRes", payload: data.msg });
    } catch (error) {
      dispatch({
        type: "changePasswordRej",
        payload: error.response.data.message,
      });
    }
  };
// send reset token mail
export const sendResetToken = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgetPasswordReq" });
    const { data } = await axios.post(
      `${serverURI}/user/forgetpassword`,
      { email }
    );
    dispatch({ type: "forgetPasswordRes", payload: data.msg });
  } catch (error) {
    dispatch({
      type: "forgetPasswordRej",
      payload: error.response.data.message,
    });
  }
};
//change User password
export const resetPassword = (token, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordReq" });
    const { data } = await axios.put(
      `${serverURI}/user/resetpassword/${token}`,
      { newPassword }
    );

    dispatch({ type: "resetPasswordRes", payload: data.msg });
  } catch (error) {
    dispatch({
      type: "resetPasswordRej",
      payload: error.response.data.message,
    });
  }
};
