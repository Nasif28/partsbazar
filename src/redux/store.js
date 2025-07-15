import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import preferencesReducer from "./features/preferencesSlice";
import brandReducer from "./features/brandsSlice";
import blogReducer from "./features/blogSlice";
import videoReducer from "./features/videoSlice";
import wishlistReducer from "./features/wishlistSlice";
import compareReducer from "./features/compareSlice";
import productReducer from "./features/productSlice";
import faqReducer from "./features/faqSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    preferences: preferencesReducer,
    brands: brandReducer,
    blogs: blogReducer,
    videos: videoReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    products: productReducer,
    faqs: faqReducer,
  },
});
