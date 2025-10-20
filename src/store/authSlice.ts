import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('userEmail'),
  userEmail: localStorage.getItem('userEmail'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.userEmail = action.payload;
      localStorage.setItem('userEmail', action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userEmail = null;
      localStorage.removeItem('userEmail');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
