import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { videoApi } from "../api/videoApi";

const initialState = {
  videos: [],
  featuredVideos: [],
  trendingVideos: [],
  loading: false,
  error: null,
  currentVideo: null,
};

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async (_, { rejectWithValue }) => {
    try {
      return await videoApi.getVideos();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVideoById = createAsyncThunk(
  "videos/fetchVideoById",
  async (id, { rejectWithValue }) => {
    try {
      return await videoApi.getVideoById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
        state.featuredVideos = action.payload.filter(
          (video) => video.isFeatured
        );
        state.trendingVideos = action.payload.filter(
          (video) => video.isTrending
        );
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchVideoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVideo = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentVideo } = videoSlice.actions;
export default videoSlice.reducer;
