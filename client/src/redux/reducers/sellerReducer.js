import { createReducer } from "@reduxjs/toolkit";

export const sellerReducer = createReducer(
  {},
  {
    //list sellers
    listSellerReq: (state) => {
      state.loading = true;
    },
    listSellerRes: (state, action) => {
      state.loading = false;
      state.sellers = action.payload.sellers;
    },
    listSellerRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // get single specific room
    getSingleRoomReq: (state) => {
      state.loading = true;
    },
    getSingleRoomRes: (state, action) => {
      state.loading = false;
      state.singleRoom = action.payload.msg;
    },
    getSingleRoomRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // get seller specific room
    getMyRoomReq: (state) => {
      state.loading = true;
    },
    getMyRoomRes: (state, action) => {
      state.loading = false;
      state.myRooms = action.payload.msg;
    },
    getMyRoomRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // get all room
    getAllRoomReq: (state) => {
      state.loading = true;
    },
    getAllRoomRes: (state, action) => {
      state.loading = false;
      state.rooms = action.payload.msg;
    },
    getAllRoomRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // create room
    createRoomReq: (state) => {
      state.loading = true;
    },
    createRoomRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    createRoomRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //edit room
    editRoomReq: (state) => {
      state.loading = true;
    },
    editRoomRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    editRoomRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //delete room
    deleteRoomReq: (state) => {
      state.loading = true;
    },
    deleteRoomRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    deleteRoomRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearMsg: (state) => {
      state.msg = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);
