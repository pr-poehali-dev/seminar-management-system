import { configureStore } from '@reduxjs/toolkit';
import seminarReducer from './seminarSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    seminars: seminarReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;