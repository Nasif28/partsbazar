import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productData from "@/data/Products.json";

// Async thunks for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // In real app, you would fetch from API
    // const response = await fetch('/api/products');
    // return response.json();
    return productData;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    // Find product in JSON data
    const product = productData.find((p) => p.id === productId);
    if (!product) throw new Error("Product not found");
    return product;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    featuredProducts: [],
    productDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
        state.featuredProducts = action.payload.filter((p) => p.featured);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productDetails = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
