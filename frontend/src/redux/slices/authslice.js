import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(ocalStorage.getItem("userInfo"))
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
  },
});

export default authSlice.reducer;
export const { setCredentials } = authSlice.actions;
