import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login() {

  // The user can switch between login and signup forms
  const [loginModal, setLoginModal] = useState(true);
  const [signUpModal, setSignUpModal] = useState(false);

  // The status of successful signup by the user is stored in formSubmit
  const [formSubmit, setFormSubmit] = useState(false);

  // Function to switch between login and signup form
  function handleModals(e) {
    if (e.target.className === "login-form__inscription") {
      setLoginModal(false);
      setSignUpModal(true);
    }
    if (e.target.className === "login-form__connexion") {
      setLoginModal(true);
      setSignUpModal(false);
    }
  }

  return (
    <section className="login-container">
      {/* Login Form */}
      {loginModal && (
        <LoginForm handleModals={handleModals} formSubmit={formSubmit} />
      )}

      {/* Signup Form */}
      {signUpModal && (
        <SignupForm
          handleModals={handleModals}
          setFormSubmit={setFormSubmit}
          setSignUpModal={setSignUpModal}
          setLoginModal={setLoginModal}
        />
      )}
    </section>
  );
}

export default Login;
