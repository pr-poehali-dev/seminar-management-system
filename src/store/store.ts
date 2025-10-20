import { configureStore } from '@reduxjs/toolkit';
import seminarReducer from './seminarSlice';

export const store = configureStore({
  reducer: {
    seminars: seminarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
