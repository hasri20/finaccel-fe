import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../features/movies/moviesSlice";
import authSlice from "../features/auth/authSlice";
import watchlistsSlice from "../features/watchlists/watchlistsSlice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    auth: authSlice,
    watchlists: watchlistsSlice,
  },
});
