import React, { useState } from "react";
import axios from "axios";

function ChangePassword({ userData }) {

  const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState(false);
  const [identicalPasswordsErrorMessage, setIdenticalPasswordsErrorMessage] = useState(false);

  const [passwordChangeSubmit, setPasswordChangeSubmit] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Function that shows the password entered when the user clicks on the eye icon
  function showPassword(whichPassword) {
    const type =
      document
        .querySelector(`#${whichPassword}-password-input`)
        .getAttribute("type") === "password"
        ? "text"
        : "password";
    document
      .querySelector(`#${whichPassword}-password-input`)
      .setAttribute("type", type);
    document
      .querySelector(`#toggle-${whichPassword}-password`)
      .classList.toggle("fa-eye-slash");
  }

  // Function to remove error messages
  function removeErrorMessages() {
    setOldPasswordErrorMessage(false);
    setNewPasswordErrorMessage(false);
    setIdenticalPasswordsErrorMessage(false);
  }

  // Function to change the password
  function handleChangePassword(e) {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/users/${userData._id}/auth`,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
      data: {
        oldPassword: oldPassword,
        password: newPassword,
      },
    })
      .then((res) => {
        removeErrorMessages();
        setPasswordChangeSubmit(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        removeErrorMessages();
        switch (err.response.data.error) {
          case "Invalid password!":
            setOldPasswordErrorMessage(true);
            break;
          case "The password must be between 8 and 20 characters long, with at least one uppercase letter, one lowercase letter, one digit, and no spaces or special characters":
            setNewPasswordErrorMessage(true);
            break;
          case "The new password must be different from the old one!":
            setIdenticalPasswordsErrorMessage(true);
            break;
          default:
            console.log(err);
        }
      });
  }

  return (
    <div className="profile-editing__password-change">
      <h2 className="profile-editing__title">Modifier le mot de passe</h2>
      <form
        id="password-change-form"
        className="profile-page__form"
        onSubmit={handleChangePassword}
      >
        {/* Old password */}
        <div className="change-password-input-box">
          <input
            id="old-password-input"
            type="password"
            name="old-password"
            placeholder="Ancien mot de passe"
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <i
            className="far fa-eye"
            id="toggle-old-password"
            onClick={() => showPassword("old")}
          ></i>
        </div>
        {/* Possible error message: the password entered does not match the old one */}
        {oldPasswordErrorMessage && (
          <div className="error-message-container">
            <i className="fas fa-exclamation-circle"></i>
            <span>
              L'ancien mot de passe est incorrect !
            </span>
          </div>
        )}
        {/* New password */}
        <div className="change-password-input-box">
          <input
            id="new-password-input"
            className="password-input"
            type="password"
            name="new-password"
            placeholder="Nouveau mot de passe"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <i
            className="far fa-eye"
            id="toggle-new-password"
            onClick={() => showPassword("new")}
          ></i>
        </div>
        {/* This error message may appear because the old and new passwords are the same */}
        {identicalPasswordsErrorMessage && (
          <div className="error-message-container">
            <i className="fas fa-exclamation-circle"></i>
            <span>
              Le nouveau mot de passe doit être différent de l'ancien !
            </span>
          </div>
        )}
        {/* Possible error message due to invalid password */}
        {newPasswordErrorMessage && (
          <div className="error-message-container">
            <i className="fas fa-exclamation-circle"></i>
            <span>
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
        {passwordChangeSubmit ? (
          <div id="password-changed">
            Votre mot de passe a été changé avec succès !
          </div>
        ) : null}
        {/* Button */}
        <button
          id="password-change-btn"
          className="profile-page__btn profile-page__btn--active"
          type="submit"
        >
          Modifier
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
