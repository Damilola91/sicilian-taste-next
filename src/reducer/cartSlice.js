import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.quantity * Number(item.price),
        0
      );
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) item.quantity++;
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.quantity * Number(item.price),
        0
      );
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.quantity * Number(item.price),
        0
      );
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.quantity * Number(item.price),
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
