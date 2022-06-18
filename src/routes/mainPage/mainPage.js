import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useAlert } from "react-alert";
import { fetchMovieList } from "../../features/movies/moviesActions";
import { addMovieToWatchlist } from "../../features/watchlists/watchlistsActions";
const MainPage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const moviesList = useSelector((state) => state.movies.data);

  const HandleAddButton = async (movieId) => {
    if (!username) {
      alert.show("Login Required");
    } else {
      const action = await dispatch(addMovieToWatchlist(movieId));
      alert.show(action.payload.message);
    }
  };

  useEffect(() => {
    dispatch(fetchMovieList());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {moviesList.map((movie) => {
          return (
            <Col key={movie.id}>
              <Card style={{ width: "18rem", marginTop: "16px" }}>
                <Card.Img
                  variant="top"
                  src={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => HandleAddButton(movie.id)}
                  >
                    Add to watchlists
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default MainPage;
