import { createReducer } from '@reduxjs/toolkit';

export const otherReducer = createReducer(
  {},
  {
    contactReq: state => {
      state.loading = true;
    },
    contactRes: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    },
    contactRej: (state, action) => {
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
