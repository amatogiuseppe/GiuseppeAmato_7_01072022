import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserLoggedInContext } from "../utils/context/UserLoggedInContext";

function HomePage() {

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
  // A user who is logged in can access the homepage
  if (isLoggedIn === true) {
    return (
      <div>
        <b>Vous êtes connecté à la page d'accueil !</b>
      </div>
    );
  }
}

export default HomePage;
