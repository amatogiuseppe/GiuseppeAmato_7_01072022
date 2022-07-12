import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserLoggedInContext } from "../utils/context/UserLoggedInContext";
import Navbar from "../components/Navbar";

function ProfilePage() {

  // Login status
  const { isLoggedIn } = useContext(UserLoggedInContext);

  // A blank page is shown waiting to find out the user's login status
  if (isLoggedIn == null) {
    return null;
  }
  // Users who are not logged in are reindexed and invited to log in
  if (isLoggedIn === false) {
    return <Navigate to="/login" />;
  }
  // A user who is logged in can access the profile page
  if (isLoggedIn === true) {
    return (
      <div className="home-page">
        {/* Header */}
        <header className="home-page__header">
          <Navbar />
        </header>
        {/* Main */}
        <main className="home-page__main" >
          <br />
          <br />
          <br />
          <b>Vous êtes connecté sur la page de profil !</b>
        </main>
      </div>
    );
  }
}

export default ProfilePage;
