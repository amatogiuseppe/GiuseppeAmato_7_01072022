import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';


function Login() {

  const [loginModal, setLoginModal] = useState(true)
  const [signUpModal, setSignUpModal] = useState(false)

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
    <section className='login-container'>

        {/* Login Form */}
        { loginModal && <LoginForm handleModals={handleModals} /> }

        {/* Signup Form */}
        { signUpModal && <SignupForm handleModals={handleModals} /> }

    </section>
  );
};

export default Login;