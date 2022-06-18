import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "./components/Navigation";
import MainPage from "./routes/mainPage";
import LoginPage from "./routes/loginPage";
import RegisterPage from "./routes/registerPage";
import WatchListPage from "./routes/watchlistPage";
import Cookies from "js-cookie";

const RequireAuth = ({ children }) => {
  let location = useLocation();

  if (!Cookies.get("accessToken")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/watchlists"
            element={
              <RequireAuth>
                <WatchListPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
