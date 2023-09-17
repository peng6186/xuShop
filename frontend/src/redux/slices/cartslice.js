import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: "", payment: "paypal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // The item added to the cart
      const item = action.payload;

      // Check if the item is already in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // if exists, update the existing item
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // if not exists, add the new item to cartItems
        state.cartItems.push(item);
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const delete_id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== delete_id);
      return updateCart(state);
    },
    savingShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      // Save the cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savingPaymentMethod: (state, action) => {
      state.payment = action.payload;
      // Save the cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      // Update the corresponding Shipping fee, tax fee, etc.
      updateCart(state);
    },
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  savingShippingAddress,
  savingPaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
