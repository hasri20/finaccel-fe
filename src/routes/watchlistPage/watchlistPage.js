import React, { useEffect } from "react";
import { fetchWatchlist } from "../../features/watchlists/watchlistsActions";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "../../components/ListItem";
import { Container, Row, ListGroup } from "react-bootstrap";

const WatchListPage = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlists.data);

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <ListGroup as="ol" numbered>
          {watchlist.map((movie) => {
            return <ListItem movieId={movie.movie_id} key={movie.id} />;
          })}
        </ListGroup>
      </Row>
    </Container>
  );
};

export default WatchListPage;
