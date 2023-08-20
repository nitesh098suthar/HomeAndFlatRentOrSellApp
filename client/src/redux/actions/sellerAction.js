import axios from "axios";
import { serverURI } from "../store";

const authInstance = axios.create({
  baseURL: `${serverURI}/seller`,
  withCredentials: true,
});
//get all room action
export const getAllRoom = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllRoomReq" });
    const { data } = await authInstance.get("/room");
    dispatch({ type: "getAllRoomRes", payload: data });
  } catch (error) {
    dispatch({ type: "getAllRoomRej", payload: error.response.data.message });
  }
};
// list all sellers
export const listSellers = () => async (dispatch) => {
  try {
    dispatch({ type: "listSellerReq" });
    const { data } = await authInstance.get("/sellers", {
      withCredentials: false,
    });
    dispatch({ type: "listSellerRes", payload: data });
  } catch (error) {
    console.log(error)
    dispatch({ type: "listSellerRej", payload: error.response.data.message });
  }
};
//get my room action
export const getMyRoom = () => async (dispatch) => {
  try {
    dispatch({ type: "getMyRoomReq" });
    const { data } = await authInstance.get("/myroom");
    dispatch({ type: "getMyRoomRes", payload: data });
  } catch (error) {
    dispatch({ type: "getMyRoomRej", payload: error.response.data.message });
  }
};
// //get single room action
// export const singleRoom = (roomId) => async (dispatch) => {
//   try {
//     dispatch({ type: "getSingleRoomReq" });
//     const { data } = await authInstance.get(`/room/${roomId}`);
//     dispatch({ type: "getSingleRoomRes", payload: data });
//   } catch (error) {
//     dispatch({ type: "getSingleRoomRej", payload: error.response.data.message });
//   }
// };
//create room action
export const createRoom = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: "createRoomReq" });
    const { data } = await authInstance.post("/room", roomData, {
      header: { "Content-Type": "multipart/form-data" },
    });
    dispatch({ type: "createRoomRes", payload: data });
  } catch (error) {
    dispatch({ type: "createRoomRej", payload: error.response.data.message });
  }
};
//edit room action
export const editRoom = (roomId, roomData) => async (dispatch) => {
  try {
    dispatch({ type: "editRoomReq" });
    const { data } = await authInstance.put(`/room/${roomId}`, roomData, {
      header: { "Content-Type": "application/json" },
    });
    dispatch({ type: "editRoomRes", payload: data });
  } catch (error) {
    dispatch({ type: "editRoomRej", payload: error.response.data.message });
  }
};
//delete room action
export const deleteRoom = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteRoomReq" });
    const { data } = await authInstance.delete(`/room/${roomId}`);
    dispatch({ type: "deleteRoomRes", payload: data });
  } catch (error) {
    dispatch({ type: "deleteRoomRej", payload: error.response.data.message });
  }
};
