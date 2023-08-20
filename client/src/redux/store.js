import { configureStore } from '@reduxjs/toolkit';
import { adminReducer } from './reducers/adminReducer';
import { authReducer } from './reducers/authReducer';
import { otherReducer } from './reducers/otherReducer';
import { profileReducer } from './reducers/profileReducer';
import { sellerReducer } from './reducers/sellerReducer';

export const serverURI = 'http://localhost:5000/api/v1';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    admin: adminReducer,
    other: otherReducer,
    room: sellerReducer,
  },
});
