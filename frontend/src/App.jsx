import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext } from "./utils/context/AppContext";
import axios from "axios";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

function App() {

  // Login status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Posts fetched from the API
  const [posts, setPosts] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(true);

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
        if (res.data) {
          setIsLoggedIn(true);
          setUserData(res.data);
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  // Function to request posts from API
  useEffect(()=>{
    if (isLoggedIn && shouldRefresh) {
      axios({
        method: "GET",
        url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/posts`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("userToken")
          )}`,
        },
      })
        .then((res) => {
          setPosts(res.data);
          setShouldRefresh(false);
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn, shouldRefresh]);

  return (
    <AppContext.Provider value={{ isLoggedIn, userData, posts, setShouldRefresh }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
