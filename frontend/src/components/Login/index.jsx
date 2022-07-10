import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';


function Login() {

  const [loginModal, setLoginModal] = useState(true);
  const [signUpModal, setSignUpModal] = useState(false);

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

  // A function that switches to the login form once the user has created an account
  function showLogin() {
    setSignUpModal(false);
    setLoginModal(true);
  }

  return (
    <section className='login-container'>

        {/* Login Form */}
        { loginModal && <LoginForm handleModals={handleModals} formSubmit={formSubmit} /> }

        {/* Signup Form */}
        { signUpModal && <SignupForm handleModals={handleModals} setFormSubmit={setFormSubmit} showLogin={showLogin} /> }

    </section>
  );
};

export default Login;