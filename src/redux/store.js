import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import preferencesReducer from "./features/preferencesSlice";
import brandReducer from "./features/brandsSlice";
import blogReducer from "./features/blogSlice";
import wishlistReducer from "./features/wishlistSlice";
import compareReducer from "./features/compareSlice";
import productReducer from "./features/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    preferences: preferencesReducer,
    brands: brandReducer,
    blogs: blogReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    products: productReducer,
  },
});
