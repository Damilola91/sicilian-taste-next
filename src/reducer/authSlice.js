import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.role = action.payload.role;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectRole = (state) => state.auth.role;

export default authSlice.reducer;
