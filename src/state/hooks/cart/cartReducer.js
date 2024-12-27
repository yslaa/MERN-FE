import { createSlice } from "@reduxjs/toolkit";
import { TAGS } from "@constants";

const cartSlice = createSlice({
  name: TAGS.CART,
  initialState: {
    products: [],
    count: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.count = state.products.reduce(
        (total, product) => total + product.quantity,
        0,
      );
    },
    removeFromCart: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload._id,
      );

      if (productIndex !== -1) {
        const product = state.products[productIndex];
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.products.splice(productIndex, 1);
        }

        state.count = state.products.reduce(
          (total, product) => total + product.quantity,
          0,
        );
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.count = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cart = cartSlice.reducer;
