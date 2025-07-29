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

// Add new thunk for related products
export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelatedProducts",
  async ({ category, excludeId }) => {
    // Filter products by category, excluding current product
    return productData
      .filter((p) => p.category === category && p.id !== excludeId)
      .slice(0, 5);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    featuredProducts: [],
    productDetails: {}, // Changed to object
    relatedProducts: [],
    loading: false,
    detailsLoading: false, // Separate loading state
    relatedLoading: false,
    error: null,
  },
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = {};
      state.relatedProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
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

      // Fetch Product By ID
      .addCase(fetchProductById.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.error.message;
      })

      // Fetch Related Products
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.relatedLoading = true;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedLoading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state) => {
        state.relatedLoading = false;
      });
  },
});

export const { clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
