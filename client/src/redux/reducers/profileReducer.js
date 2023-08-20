import { createReducer } from '@reduxjs/toolkit';

export const profileReducer = createReducer(
  {},
  {
    // edit profile
    editProfileReq: state => {
      state.loading = true;
    },
    editProfileRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    editProfileRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //change role client to seller
    clientToSellerReq: state => {
      state.loading = true;
    },
    clientToSellerRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    clientToSellerRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearMsg: state => {
      state.msg = null;
    },
    clearError: state => {
      state.error = null;
    },
  }
);
