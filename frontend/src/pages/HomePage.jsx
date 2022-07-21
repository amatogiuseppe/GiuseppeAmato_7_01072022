import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserLoggedInContext } from "../utils/context/UserLoggedInContext";
import axios from 'axios';
import Navbar from "../components/Navbar";
import NewPostForm from "../components/Home/NewPostForm";
import PostCard from "../components/Home/PostCard";

function HomePage() {

  // Login status
  const { isLoggedIn, userData } = useContext(UserLoggedInContext);

  // Posts fetched from the API
  const [posts, setPosts] = useState([]);

  // Function to request posts from API
  useEffect(()=>{
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
      })
      .catch(err => console.log(err));
  }, []);

  // Function to set the format of the entry date
  function setDateFormat(date) {
    let dateSetting = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    let timeSetting = {
      hour: "2-digit",
      minute: "2-digit",
    };
    let localDate = new Date(date).toLocaleDateString("fr-FR", dateSetting);
    let localTime = new Date(date).toLocaleTimeString("fr-FR", timeSetting);
    let datePost = `${localDate} - ${localTime}`;
    return datePost;
  }

  // A blank page is shown waiting to find out the user's login status
  if (isLoggedIn == null) {
    return null;
  }
  // Users who are not logged in are reindexed and invited to log in
  if (isLoggedIn === false) {
    return <Navigate to="/login" />;
  }
  // A user who is logged in can access the homepage
  if (isLoggedIn === true) {
    return (
      <div className="home-page">

        {/* Header */}
        <header className="home-page__header">

          {/* Navbar */}
          <nav className="navbar-container">
            <Navbar />
          </nav>

        </header>

        {/* Main */}
        <main className="home-page__main" >

          {/* New Post Form */}
          <section className="new-post-form">
            <NewPostForm userData={userData} setDateFormat={setDateFormat}/>
          </section>

          {/* News feed */}
          <section className="post-card-container">
            { posts.slice(0).reverse().map((post) => {
              return <PostCard key={post._id} post={post} setDateFormat={setDateFormat} />
            })}
          </section>

        </main>
      </div>
    );
  }
}

export default HomePage;
