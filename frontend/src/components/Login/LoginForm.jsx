import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({handleModals}) {

  // Email and password typed in by the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Incorrect credentials display error messages
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);

  // Function that is called when the user tries to log in with the credentials
  function handleLogin(e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/auth/login`,
      data: {
        email: email,
        password: password
      }
    })
      .then( res => {
        console.log(res.data);
        if (emailErrorMessage || passwordErrorMessage) {
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
        }
        localStorage.setItem('userToken', JSON.stringify(res.data.token));
        window.location = "/";
      })
      .catch( err => {
        console.log(err);
        if (err.response.data.error === 'User not found') {
          setEmailErrorMessage(true);
        }
        if (err.response.data.error === 'Invalid password!') {
          setPasswordErrorMessage(true);
        }
      });
  }

  return (
    <form className='login-form' onSubmit={handleLogin}>

      {/* Email input */}
      <input
        type="email"
        placeholder="Adress e-mail"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Possible error message due to invalid email */}
      { emailErrorMessage &&
      <div className='email-error-message'>
        <i class="fas fa-exclamation-circle"></i>
        <span className='email-error-message__text'>E-mail incorrect!</span>
      </div> }

      {/* Password input */}
      <input
        type="password"
        placeholder="Mot de passe"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Possible error message due to invalid password */}
      { passwordErrorMessage &&
      <div className='password-error-message'>
        <i class="fas fa-exclamation-circle"></i>
        <span className='password-error-message__text'>Mot de passe incorrect!</span>
      </div> }

      <p className='login-form__edit-pass'>Mot de passe oublié ?</p>

      {/* Login button */}
      <button className="login-form__btn" type="submit">Se connecter</button>

      {/* Link to sign-up */}
      <p className="login-form__question">
        Vous n'avez pas de compte ?
        <span className="login-form__inscription" onClick={handleModals}>
          Inscription
        </span>
      </p>

    </form>
  );
};

export default LoginForm;