import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    //list user
    listUserReq: state => {
      state.loading = true;
    },
    listUserRes: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    },
    listUserRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //list clients
    listClientReq: state => {
      state.loading = true;
    },
    listClientRes: (state, action) => {
      state.loading = false;
      state.clients = action.payload.clients;
    },
    listClientRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // change role
    changeRoleReq: state => {
      state.loading = true;
    },
    changeRoleRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    changeRoleRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //get single user
    singleUserReq: state => {
      state.loading = true;
    },
    singleUserRes: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    singleUserRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete any user
    deleteAnyUserReq: state => {
      state.loading = true;
    },
    deleteAnyUserRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    deleteAnyUserRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete any room
    deleteAnyRoomReq: state => {
      state.loading = true;
    },
    deleteAnyRoomRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    deleteAnyRoomRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //get dashboard info
    //update dashboard info
    clearMsg: state => {
      state.msg = null;
    },
    clearError: state => {
      state.error = null;
    },
  }
);
