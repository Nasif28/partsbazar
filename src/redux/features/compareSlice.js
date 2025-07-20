import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    products: [],
  },
  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload;

      // Check if product is already in compare
      const existingIndex = state.products.findIndex(
        (p) => p.id === product.id
      );
      if (existingIndex !== -1) {
        return;
      }

      // Limit to 4 products
      if (state.products.length >= 4) {
        return;
      }

      state.products.push(product);
    },
    removeFromCompare: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((p) => p.id !== productId);
    },
    clearCompare: (state) => {
      state.products = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
