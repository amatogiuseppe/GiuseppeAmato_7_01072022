import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserLoggedInContext } from "./utils/context/UserLoggedInContext";
import axios from "axios";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

function App() {

  // Login status and user
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  // Function that is called to check whether the user is logged in or not.
  useEffect(() => {
    axios({
      method: "POST",
      url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/auth/token`,
      data: {
        token: JSON.parse(localStorage.getItem("userToken")),
      },
    })
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setUser(null);
        console.log(err);
      });
  }, [user]);

  return (
    <UserLoggedInContext.Provider value={{ isLoggedIn, user }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </UserLoggedInContext.Provider>
  );
}

export default App;
