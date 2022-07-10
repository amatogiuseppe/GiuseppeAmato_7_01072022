import React, { useState } from 'react';
import axios from 'axios';

function SignupForm({handleModals}) {

  // Name, surname, email and password typed in by the user
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Incorrect credentials display error messages
  const [nameErrorMessage, setNameErrorMessage] = useState(false);
  const [surnameErrorMessage, setSurnameErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);

  // Function that is called when the user tries to register with the new credentials
  function handleSignup(e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/auth/signup`,
      data: {
        name: name,
        surname: surname,
        email: email,
        password: password
      }
    })
      .then( res => {
        console.log(res.data);
        if ( nameErrorMessage || surnameErrorMessage || emailErrorMessage || passwordErrorMessage ) {
          setNameErrorMessage(false);
          setSurnameErrorMessage(false);
          setEmailErrorMessage(false);
          setPasswordErrorMessage(false);
        }
        window.location = "/login";
      })
      .catch( err => {
        console.log(err);
        switch (err.response.data.error) {
          case 'Invalid name. Please respect this format: Jon':
            setNameErrorMessage(true);
          break;
          case 'Invalid surname. Please respect this format: Snow':
            setSurnameErrorMessage(true);
          break;
          case 'Invalid email. Please respect this format: abc@def.gh':
            setEmailErrorMessage(true);
          break;
          case 'The password must be between 8 and 20 characters long, with at least one uppercase letter, one lowercase letter, one digit, and no spaces or special characters':
            setPasswordErrorMessage(true);
          break;
          default:
            console.log(err);
        }
      });
  }

  return (
    <form className='login-form' onSubmit={handleSignup}>

      {/* Name input */}
      <input
        type="text"
        placeholder="Prénom"
        name="prenom"
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Possible error message due to invalid name */}
      {nameErrorMessage &&
      <div className='name-error-message'>
        <i class="fas fa-exclamation-circle"></i>
        <span className='name-error-message__text'>Nom non valide. <br/> Veuillez respecter ce format : Jon</span>
      </div> }

      {/* Surname input */}
      <input
        type="text"
        placeholder="Nom de famille"
        name="nom-de-famille"
        onChange={(e) => setSurname(e.target.value)}
        required
      />

      {/* Possible error message due to invalid surname */}
      {surnameErrorMessage &&
      <div className='surname-error-message'>
        <i class="fas fa-exclamation-circle"></i>
        <span className='surname-error-message__text'>Nom de famille invalide. <br/> Veuillez respecter ce format : Snow</span>
      </div> }

      {/* Email input */}
      <input
        type="email"
        placeholder="Adress e-mail"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Possible error message due to invalid email */}
      {emailErrorMessage &&
      <div className='email-error-message'>
        <i class="fas fa-exclamation-circle"></i>
        <span className='email-error-message__text'>E-mail non valide. <br/> Veuillez respecter ce format : abc@def.gh</span>
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
        <span className='password-error-message__text'>Le mot de passe doit comporter entre 8 et 20 caractères, avec au moins une lettre majuscule, une lettre minuscule, un chiffre et aucun espace ou caractère spécial.</span>
      </div> }

      {/* Signup button */}
      <button className="login-form__btn" type="submit">S'inscrire</button>

      {/* Link to log-in */}
      <p className="login-form__question">
        Vous avez déjà un compte ?
        <span className="login-form__connexion" onClick={handleModals}>
          Connexion
        </span>
      </p>

    </form>

  );
};

export default SignupForm;