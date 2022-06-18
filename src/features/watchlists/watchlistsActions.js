import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api";

export const fetchWatchlist = createAsyncThunk(
  "watchlists/fetchWatchlist",
  async () => {
    const response = await axios.get(
      "https://finaccel-be.herokuapp.com/watchlists"
    );
    return response.data;
  }
);

export const addMovieToWatchlist = createAsyncThunk(
  "watchlists/addMovieToWatchlist",
  async (movieId) => {
    try {
      const response = await axios.post(
        "https://finaccel-be.herokuapp.com/watchlists",
        {
          movieId,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
