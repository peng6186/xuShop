import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "authWei",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    clearCredentials: (state) => {
      localStorage.clear();
      // localStorage.removeItem("userInfo");
      // localStorage.removeItem("expirationTime");
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, clearCredentials } = authSlice.actions;
