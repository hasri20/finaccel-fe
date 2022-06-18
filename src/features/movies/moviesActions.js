import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api";

export const fetchMovieList = createAsyncThunk(
  "movies/fetchMovieList",
  async () => {
    const response = await axios.get(
      "https://finaccel-be.herokuapp.com/movies"
    );
    return response.data;
  }
);
