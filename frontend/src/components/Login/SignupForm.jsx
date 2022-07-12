import React, { useState } from "react";
import axios from "axios";

function SignupForm({
  handleModals,
  setFormSubmit,
  setSignUpModal,
  setLoginModal,
}) {

  // Name, surname, email and password typed in by the user
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Incorrect credentials display error messages
  const [nameErrorMessage, setNameErrorMessage] = useState(false);
  const [surnameErrorMessage, setSurnameErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [uniqueEmailErrorMessage, setUniqueEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);

  // Function to remove error messages
  function removeErrorMessages() {
    setNameErrorMessage(false);
    setSurnameErrorMessage(false);
    setEmailErrorMessage(false);
    setUniqueEmailErrorMessage(false);
    setPasswordErrorMessage(false);
  }

  // Function that is called when the user tries to register with the new credentials
  function handleSignup(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/auth/signup`,
      data: {
        name: name,
        surname: surname,
        email: email,
        password: password,
      },
    })
      .then(() => {
        removeErrorMessages();
        setFormSubmit(true);
        setSignUpModal(false);
        setLoginModal(true);
      })
      .catch((err) => {
        console.log(err);
        removeErrorMessages();
        switch (err.response.data.error) {
          case "Invalid name. Please respect this format: Jon":
            setNameErrorMessage(true);
            break;
          case "Invalid surname. Please respect this format: Snow":
            setSurnameErrorMessage(true);
            break;
          case "Invalid email. Please respect this format: abc@def.gh":
            setEmailErrorMessage(true);
            break;
          case "The password must be between 8 and 20 characters long, with at least one uppercase letter, one lowercase letter, one digit, and no spaces or special characters":
            setPasswordErrorMessage(true);
            break;
          case "This email is already in use":
            setUniqueEmailErrorMessage(true);
            break;
          default:
            console.log(err);
        }
      });
  }

  // Function to assist the user in entering a valid password
  function checkPassword(password) {
    document
      .querySelector(".login-form__password-assist")
      .removeAttribute("hidden");
    if (password.length >= 8) {
      document
        .getElementById("password-assist__pass-length")
        .classList.add("active-list-item");
    } else {
      document
        .getElementById("password-assist__pass-length")
        .classList.remove("active-list-item");
    }
    if (password.match(/[A-Z]/)) {
      document
        .getElementById("password-assist__pass-majuscule")
        .classList.add("active-list-item");
    } else {
      document
        .getElementById("password-assist__pass-majuscule")
        .classList.remove("active-list-item");
    }
    if (password.match(/[a-z]/)) {
      document
        .getElementById("password-assist__pass-minuscule")
        .classList.add("active-list-item");
    } else {
      document
        .getElementById("password-assist__pass-minuscule")
        .classList.remove("active-list-item");
    }
    if (password.match(/[0-9]/)) {
      document
        .getElementById("password-assist__pass-chiffre")
        .classList.add("active-list-item");
    } else {
      document
        .getElementById("password-assist__pass-chiffre")
        .classList.remove("active-list-item");
    }
  }

  // Function showing the password the user is typing in
  function showPassword() {
    const type =
      document.querySelector("#id_password").getAttribute("type") === "password"
        ? "text"
        : "password";
    document.querySelector("#id_password").setAttribute("type", type);
    document.querySelector("#togglePassword").classList.toggle("fa-eye-slash");
  }

  return (
    <form className="login-form" onSubmit={handleSignup}>

      {/* Name input */}
      <input
        type="text"
        placeholder="Prénom"
        name="prenom"
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Possible error message due to invalid name */}
      {nameErrorMessage && (
        <div className="login-form__error-message">
          <i class="fas fa-exclamation-circle"></i>
          <span className="login-form__error-message__text">
            Nom non valide. <br /> Veuillez respecter ce format : Jon
          </span>
        </div>
      )}

      {/* Surname input */}
      <input
        type="text"
        placeholder="Nom de famille"
        name="nom-de-famille"
        onChange={(e) => setSurname(e.target.value)}
        required
      />

      {/* Possible error message due to invalid surname */}
      {surnameErrorMessage && (
        <div className="login-form__error-message">
          <i class="fas fa-exclamation-circle"></i>
          <span className="login-form__error-message__text">
            Nom de famille invalide. <br /> Veuillez respecter ce format : Snow
          </span>
        </div>
      )}

      {/* Email input */}
      <input
        type="email"
        placeholder="Adress e-mail"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Possible error message due to invalid email format */}
      {emailErrorMessage && (
        <div className="login-form__error-message">
          <i class="fas fa-exclamation-circle"></i>
          <span className="login-form__error-message__text">
            E-mail non valide. <br /> Veuillez respecter ce format : abc@def.gh
          </span>
        </div>
      )}

      {/* Possible error message due to invalid email because already used */}
      {uniqueEmailErrorMessage && (
        <div className="login-form__error-message">
          <i class="fas fa-exclamation-circle"></i>
          <span className="login-form__error-message__text">
            E-mail non valide. <br /> Cet e-mail est déjà utilisé.
          </span>
        </div>
      )}

      {/* Password input */}
      <div id="password-box">
        <input
          id="id_password"
          type="password"
          placeholder="Mot de passe"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
            checkPassword(e.target.value);
          }}
          required
        />
        <i
          className="far fa-eye"
          id="togglePassword"
          onClick={showPassword}
        ></i>
      </div>

      {/* Assistant for entering a valid password */}
      <div className="login-form__password-assist" hidden>
        Votre mot de passe doit contenir :
        <ul>
          <li id="password-assist__pass-length">Au moins 8 caractères</li>
          <li id="password-assist__pass-majuscule">
            Au moins une lettre majuscule (A-Z)
          </li>
          <li id="password-assist__pass-minuscule">
            Au moins une lettre minuscule (a-z)
          </li>
          <li id="password-assist__pass-chiffre">Au moins une chiffre (0-9)</li>
        </ul>
      </div>

      {/* Possible error message due to invalid password */}
      {passwordErrorMessage && (
        <div className="login-form__error-message">
          <i class="fas fa-exclamation-circle"></i>
          <span className="login-form__error-message__text">
            Votre mot de passe doit contenir :
            <ul>
              <li>Au moins 8 caractères</li>
              <li>Au moins une lettre majuscule (A-Z)</li>
              <li>Au moins une lettre minuscule (a-z)</li>
              <li>Au moins une chiffre (0-9)</li>
            </ul>
            Aucun espace ou caractère spécial n'est accepté.
          </span>
        </div>
      )}

      {/* Signup button */}
      <button className="login-form__btn" type="submit">
        S'inscrire
      </button>

      {/* Link to log-in */}
      <p className="login-form__question">
        Vous avez déjà un compte ?
        <span className="login-form__connexion" onClick={handleModals}>
          Connexion
        </span>
      </p>
    </form>
  );
}

export default SignupForm;
