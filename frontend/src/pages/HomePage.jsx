import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../utils/context/AppContext";
import Navbar from "../components/Navbar";
import NewPostForm from "../components/Home/NewPostForm";
import PostCard from "../components/Home/PostCard";

function HomePage() {

  // Login status
  const { isLoggedIn, posts } = useContext(AppContext);

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
            <NewPostForm setDateFormat={setDateFormat}/>
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
