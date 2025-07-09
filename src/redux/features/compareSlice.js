import { createSlice } from "@reduxjs/toolkit";

const MAX_COMPARE_ITEMS = 4;

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    items: [],
  },
  reducers: {
    addToCompare: (state, action) => {
      if (state.items.length >= MAX_COMPARE_ITEMS) {
        // Remove the first item if we've reached the max
        state.items.shift();
      }

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCompare: (state) => {
      state.items = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
