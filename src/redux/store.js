import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import authReducer from "./features/authSlice";
import preferencesReducer from "./features/preferencesSlice";
import brandReducer from "./features/brandsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    preferences: preferencesReducer,
    brands: brandReducer,
  },
});
