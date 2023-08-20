import { createReducer } from '@reduxjs/toolkit';

export const authReducer = createReducer(
  {},
  {
    //  login
    loginReq: state => {
      state.loading = true;
    },
    loginRes: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.msg = action.payload.msg;
    },
    loginRej: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    // logout
    logoutReq: state => {
      state.loading = true;
    },
    logoutRes: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.msg = action.payload.msg;
    },
    logoutRej: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.error = action.payload;
    },
    // register
    registerReq: state => {
      state.loading = true;
    },
    registerRes: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.msg = action.payload.msg;
    },
    registerRej: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    //  loaduser
    loadUserReq: state => {
      state.loading = true;
    },
    loadUserRes: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loadUserRej: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    //  changepassword
    changePasswordReq: state => {
      state.loading = true;
    },
    changePasswordRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    changePasswordRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //  changepassword
    editRoleReq: state => {
      state.loading = true;
    },
    editRoleRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    editRoleRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //  forget password
    forgetPasswordReq: state => {
      state.loading = true;
    },
    forgetPasswordRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    forgetPasswordRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //  resetPassword
    resetPasswordReq: state => {
      state.loading = true;
    },
    resetPasswordRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    resetPasswordRej: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMsg: state => {
      state.msg = null;
    },
  }
);
