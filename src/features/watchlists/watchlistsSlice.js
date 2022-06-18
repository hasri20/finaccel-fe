import { createSlice } from "@reduxjs/toolkit";
import { fetchWatchlist } from "./watchlistsActions";

const initialState = {
  data: [],
};

export const watchlistsSlice = createSlice({
  name: "watchlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWatchlist.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export default watchlistsSlice.reducer;
