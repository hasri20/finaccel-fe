import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../api";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useAlert } from "react-alert";
import { setUsername } from "../../features/auth/authSlice";
import Cookies from "js-cookie";

const LoginPage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const data = {
      username: usernameValue,
      password: passwordValue,
    };

    try {
      const response = await axios.post(
        "https://finaccel-be.herokuapp.com/authentications",
        data
      );

      Cookies.set("accessToken", response.data.data.accessToken);
      Cookies.set("refreshToken", response.data.data.refreshToken);
      dispatch(setUsername(usernameValue));
      navigate("/");
    } catch (error) {
      alert.show(error.response.data.message);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <div className="mt-2">
        Need Account? <Link to="/register">Register</Link>
      </div>
    </Form>
  );
};

export default LoginPage;
