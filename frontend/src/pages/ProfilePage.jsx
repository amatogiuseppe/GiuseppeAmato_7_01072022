import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserLoggedInContext } from "../utils/context/UserLoggedInContext";
import Navbar from "../components/Navbar";
import ContactDetails from "../components/Profile/ContactDetails";
import ChangePassword from "../components/Profile/ChangePassword";
import EntryDate from "../components/Profile/EntryDate";

function ProfilePage() {

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
  // A user who is logged in can access the profile page
  if (isLoggedIn === true) {
    return (
      <div className="profile-page">
        {/* Header */}
        <header className="profile-page__header">
          {/* Navbar */}
          <nav className="navbar-container">
            <Navbar />
          </nav>
          {/* Title */}
          <div className="profile-page__title">
            <h1>Mon Profil</h1>
            <p>Gérez les paramètres de votre profil</p>
          </div>
        </header>

        {/* Main */}
        <main className="profile-page__main">
          <section className="profile-editing">

            {/* Contact details configuration */}
            <ContactDetails userData={userData} />

            {/* Changing the password */}
            <ChangePassword userData={userData} />

            {/* Entry Date */}
            <EntryDate userData={userData}/>

          </section>
        </main>
      </div>
    );
  }
}

export default ProfilePage;
