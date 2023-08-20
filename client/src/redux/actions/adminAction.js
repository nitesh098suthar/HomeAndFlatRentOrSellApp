import axios from "axios";
import { serverURI } from "../store";

const adminInstance = axios.create({
  baseURL: `${serverURI}/admin`,
  withCredentials: true,
});

// list all users
export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "listUserReq" });
    const { data } = await adminInstance.get("/users");
    dispatch({ type: "listUserRes", payload: data });
  } catch (error) {
    dispatch({ type: "listUserRej", payload: error.response.data.message });
  }
};
// list all client
export const listClients = () => async (dispatch) => {
  try {
    dispatch({ type: "listClientReq" });
    const { data } = await adminInstance.get("/clients");
    dispatch({ type: "listClientRes", payload: data });
  } catch (error) {
    dispatch({ type: "listClientRej", payload: error.response.data.message });
  }
};

// list single user
export const singleUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "singleUserReq" });
    const { data } = await adminInstance.get(`/action/${userId}`);
    dispatch({ type: "singleUserRes", payload: data });
  } catch (error) {
    dispatch({ type: "signleUserRej", payload: error.response.data.message });
  }
};

// change user role
export const changeUserRole = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "changeRoleReq" });
    const { data } = await adminInstance.put(`/action/${userId}`);
    dispatch({ type: "changeRoleRes", payload: data });
  } catch (error) {
    dispatch({ type: "changeRoleRej", payload: error.response.data.message });
  }
};

// delete user
export const deleteAnyUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteAnyUserReq" });
    const { data } = await adminInstance.delete(`/action/${userId}`);

    dispatch({ type: "deleteAnyUserRes", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteAnyUserRej",
      payload: error.response.data.message,
    });
  }
};
//delete room action
export const deleteAnyRoom = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteAnyRoomReq" });
    const { data } = await adminInstance.delete(`/room/${roomId}`);
    dispatch({ type: "deleteAnyRoomRes", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteAnyRoomRej",
      payload: error.response.data.message,
    });
  }
};
