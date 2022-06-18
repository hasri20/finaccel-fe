import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "../api";
import { removeUsername, setUsername } from "../features/auth/authSlice";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const username = useSelector((state) => state.auth.username);

  const navigateWatchlists = () => {
    if (Cookies.get("accessToken")) {
      navigate("watchlists");
    } else {
      alert.show("Login Required");
    }
  };

  const handleLogOut = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");

      await axios.delete("https://finaccel-be.herokuapp.com/authentications", {
        data: { refreshToken },
      });
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(removeUsername());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://finaccel-be.herokuapp.com/users"
        );
        dispatch(setUsername(response.data.data.user.username));
      } catch (error) {
        console.log(error);
      }
    };

    if (!username && Cookies.get("accessToken")) {
      fetchUser();
    }
  }, [username, dispatch]);

  return (
    <Navbar bg="dark" variant="dark" className="mb-2">
      <Container>
        <Navbar.Brand>Movie App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
        </Nav>
        <Nav>
          <Navbar.Collapse className="justify-content-end">
            {username ? (
              <NavDropdown title={"Signed in as: " + username}>
                <NavDropdown.Item onClick={navigateWatchlists}>
                  Watchlists
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button onClick={() => navigate("login")}>Login </Button>
            )}
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
