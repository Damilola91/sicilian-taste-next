"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducer/cartSlice";
import authReducer from "../reducer/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
