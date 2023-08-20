import axios from "axios";
import { serverURI } from "../store";

const authInstance = axios.create({
  baseURL: serverURI,
  withCredentials: true,
});

//edit User details
export const editProfile = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: "editProfileReq" });
    const { data } = await authInstance.put("/user/me", { name, email });
    dispatch({ type: "editProfileRes", payload: data });
  } catch (error) {
    dispatch({ type: "editProfileRej", payload: error.response.data.message });
  }
};
// change role to seller
export const changeRoleToSeller = (role) => async (dispatch) => {
  try {
    dispatch({ type: "clientToSellerReq" });
    const { data } = await authInstance.put("/user/me", { role });
    dispatch({ type: "clientToSellerRes", payload: data });
  } catch (error) {
    dispatch({
      type: "clientToSellerRej",
      payload: error.response.data.message,
    });
  }
};
