import React, { useState } from "react";
import axios from "../../api";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useAlert } from "react-alert";

const RegisterPage = () => {
  const alert = useAlert();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [fullnameValue, setFullnameValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const submitRegistration = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity()) {
      const data = {
        username: usernameValue,
        password: passwordValue,
        fullname: fullnameValue,
      };

      try {
        await axios.post("https://finaccel-be.herokuapp.com/users", data);
        navigate("/login");
      } catch (error) {
        alert.show(error.response.data.message);
      }
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={submitRegistration}>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          required
          placeholder="Enter full name"
          value={fullnameValue}
          onChange={(e) => setFullnameValue(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          required
          placeholder="Enter username"
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          placeholder="Password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterPage;
