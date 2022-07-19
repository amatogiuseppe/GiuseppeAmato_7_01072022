import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserLoggedInContext } from "../../utils/context/UserLoggedInContext";
import logo from "../../assets/logo2.png";
import defaultProfile from "../../assets/default-profile.png";

function Navbar() {

  // User data
  const { userData } = useContext(UserLoggedInContext);

  // The home icon is activated when the user is on the homepage
  useEffect(() => {
    if (window.location.pathname === "/") {
      let homeButton = document.querySelector(".navbar__links__home");
      homeButton.classList.add("activate-btn");
    }
  }, []);

  // Function to show the drop-down menu
  function showMenu() {
    const menu = document.querySelector(".navbar__menu__full-menu");
    let result = menu.hasAttribute("hidden");
    if (result === true) {
      menu.removeAttribute("hidden");
    } else {
      menu.setAttribute("hidden", "");
    }
  }

  // Function that allows the user to log out
  function logout() {
    localStorage.clear();
    window.location = "/login";
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <Link to="/">
          <img
            className="navbar__logo__img"
            src={logo}
            alt="Groupomania logo"
          />
        </Link>
      </div>

      {/* Link to Homepage */}
      <div className="navbar__links">
        <Link to="/" className="navbar__links__home">
          <i className="fa fa-home"></i>
        </Link>
      </div>

      {/* Menu */}
      <div className="navbar__menu">

        {/* When the user clicks on the thumbnail, a drop-down menu appears */}
        <div className="navbar__menu__photo" onClick={showMenu}>
          <img
            className="navbar__menu__photo-img"
            src={userData.imageUrl === "../images/" ? defaultProfile : userData.imageUrl}
            alt="Profile"
          />
        </div>

        {/* Drop-down menu */}
        <div className="navbar__menu__full-menu" hidden>

          {/* User's first and last name */}
          <div className="menu-account-owner">
            <img
              className="navbar__menu__photo-img"
              src={userData.imageUrl === "../images/" ? defaultProfile : userData.imageUrl}
              alt="Profile"
            />
            <span className="menu-account-owner__name">{userData.name} {userData.surname}</span>
          </div>

          {/* Links to profile page and to log off */}
          <ul className="menu-list">
            <li>
              <Link to="/profile" className="menu-list__list-item">
                <div className="menu-list__list-item-content">
                  <div className="menu-list__icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <span className="menu-list__item">Paramètres du profil</span>
                </div>
                <div className="menu-list__angle-right-icon">
                  <i className="fa fa-angle-right"></i>
                </div>
              </Link>
            </li>
            <li>
              <div onClick={logout} className="menu-list__list-item">
                <div className="menu-list__list-item-content">
                  <div className="menu-list__icon">
                    <i className="fa fa-sign-out"></i>
                  </div>
                  <span className="menu-list__item">Se déconnecter</span>
                </div>
                <div className="menu-list__angle-right-icon">
                  <i className="fa fa-angle-right"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
