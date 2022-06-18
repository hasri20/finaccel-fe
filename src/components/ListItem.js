import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "../api";
import { fetchWatchlist } from "../features/watchlists/watchlistsActions";
import { ListGroup, Button } from "react-bootstrap";

const ListItem = ({ movieId }) => {
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState({
    title: null,
    releaseDate: null,
    voteAverage: null,
  });

  const fetchMovieDetail = async () => {
    try {
      const response = await axios.get(
        "https://finaccel-be.herokuapp.com/movies/" + movieId
      );
      const data = response.data.data;
      setMovieData({
        title: data.title,
        releaseDate: data.release_date,
        voteAverage: data.vote_average,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWatchlist = async () => {
    await axios.delete("https://finaccel-be.herokuapp.com/watchlists", {
      data: { movieId },
    });
  };

  const removeButtonHandler = async () => {
    await removeFromWatchlist();
    dispatch(fetchWatchlist());
  };

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{movieData.title}</div>
        Release Date: {movieData.releaseDate}
      </div>

      <Button onClick={removeButtonHandler}>Remove</Button>
    </ListGroup.Item>
  );
};

export default ListItem;
