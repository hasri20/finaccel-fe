import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    removeUsername(state) {
      state.username = null;
    },
  },
});

export const { setUsername, removeUsername } = authSlice.actions;

export default authSlice.reducer;
