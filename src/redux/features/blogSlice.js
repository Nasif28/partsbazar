import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogService } from "../api/blogApi";

// Async actions
export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async () => await blogService.getAllBlogs()
);

export const fetchPopularBlogs = createAsyncThunk(
  "blogs/fetchPopular",
  async () => await blogService.getPopularBlogs()
);

export const fetchBlogBySlug = createAsyncThunk(
  "blogs/fetchBySlug",
  async (slug) => await blogService.getBlogBySlug(slug)
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    allBlogs: [],
    popularBlogs: [],
    currentBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all blogs
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.allBlogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch popular blogs
      .addCase(fetchPopularBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.popularBlogs = action.payload;
      })
      .addCase(fetchPopularBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch blog by slug
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentBlog = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
