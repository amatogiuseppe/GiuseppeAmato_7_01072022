import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserLoggedInContext } from "../utils/context/UserLoggedInContext";
import Navbar from "../components/Navbar";
import NewPostForm from "../components/Home/NewPostForm";

function HomePage() {

  // Login status
  const { isLoggedIn, userData } = useContext(UserLoggedInContext);

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
            <NewPostForm userData={userData}/>
          </section>

          <br /><br /><br /><br />

          {/* News feed */}
          <section>
            <b>Vous êtes connecté à la page d'accueil !</b>
          </section>

        </main>
      </div>
    );
  }
}

export default HomePage;
