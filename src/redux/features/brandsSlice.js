import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { brandService } from "../api/brandApi";

// Async actions
export const fetchAllBrands = createAsyncThunk(
  "brands/fetchAll",
  async () => await brandService.getAllBrands()
);

export const fetchTopBrands = createAsyncThunk(
  "brands/fetchTop",
  async () => await brandService.getTopBrands()
);

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    allBrands: [],
    topBrands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.allBrands = action.payload;
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchTopBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.topBrands = action.payload;
      })
      .addCase(fetchTopBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;
