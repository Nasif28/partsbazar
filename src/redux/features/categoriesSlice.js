import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock API calls
const fetchCategories = async () => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = require("@/data/categories.json");
      resolve(data.categories);
    }, 500);
  });
};

export const fetchTopCategories = createAsyncThunk(
  "categories/fetchTopCategories",
  async () => {
    const categories = await fetchCategories();
    return categories.filter((category) => category.isTop);
  }
);

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async () => {
    return await fetchCategories();
  }
);

const initialState = {
  topCategories: [],
  allCategories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.topCategories = action.payload;
      })
      .addCase(fetchTopCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
