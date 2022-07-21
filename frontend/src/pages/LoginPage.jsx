import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../utils/context/AppContext";
import Login from "../components/Login";
import logo from "../assets/logo.png";

function LoginPage() {

  // Login status
  const { isLoggedIn } = useContext(AppContext);

  // A blank page is shown waiting to find out the user's login status
  if (isLoggedIn == null) {
    return null;
  }
  // A user who is logged in is redirected to the homepage
  if (isLoggedIn === true) {
    return <Navigate to="/" />;
  }
  // A user who has not yet logged in will be invited to do so
  if (isLoggedIn === false) {

    return (
      <div className="login-page">
        {/* Header */}
        <header className="login-page__header">
          <img
            className="login-page__header__logo"
            src={logo}
            alt="Groupomania logo"
          />
          <h1 className="login-page__header__title">
            Connectez-vous pour partager et rester en contact avec vos collègues
            de Groupomania.
          </h1>
        </header>
        {/* Main */}
        <main className="login-page__main">
          <Login />
        </main>
      </div>
    );
  }
}

export default LoginPage;
