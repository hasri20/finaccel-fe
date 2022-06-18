import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieList } from "./moviesActions";

const initialState = {
  data: [],
  page: 1,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieList.fulfilled, (state, action) => {
      state.data = action.payload.data.results;
      state.page = action.payload.data.page;
    });
  },
});

export default moviesSlice.reducer;
