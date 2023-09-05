import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apislice";
import cartReducer from "./slices/cartslice";
import authReducer from "./slices/authslice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
