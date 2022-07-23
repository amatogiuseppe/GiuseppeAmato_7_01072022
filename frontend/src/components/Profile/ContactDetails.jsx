import React, { useState } from "react";
import axios from "axios";
import defaultProfile from "../../assets/default-profile.png";

function ContactDetails({ userData }) {

  const [nameErrorMessage, setNameErrorMessage] = useState(false);
  const [surnameErrorMessage, setSurnameErrorMessage] = useState(false);

  const [imageSizeErrorMessage, setImageSizeErrorMessage] = useState(false);
  const [imageFormatErrorMessage, setImageFormatErrorMessage] = useState(false);

  let file;

  // Function called when the user clicks on the "Changer" button:
  // the function is used to manage the preview of the image uploaded by the user
  function handleProfileImage(e) {
    file = e.target.files[0];
    document.querySelector("#image-preview").src = URL.createObjectURL(e.target.files[0]);
    if (file.size > 5000000) {
      setImageSizeErrorMessage(true);
    } else {
      setImageSizeErrorMessage(false);
    }
    if (
      file.type !== "image/jpg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpeg"
    ) {
      setImageFormatErrorMessage(true);
    } else {
      setImageFormatErrorMessage(false);
    }
  }

  // Function called when the user clicks on the "Annuler" button:
  // the function is used to manage the preview of the image uploaded by the user
  function clearFileInput(e) {
    e.preventDefault();
    document.querySelector("#file-input").value = null;
    file = null;
    document.querySelector("#image-preview").src =
      userData.imageUrl === "../images/" ? defaultProfile : userData.imageUrl;
    setImageSizeErrorMessage(false);
    setImageFormatErrorMessage(false);
  }

  // Function to remove error messages regarding name and surname
  function removeErrorMessages() {
    setNameErrorMessage(false);
    setSurnameErrorMessage(false);
  }

  // Main function to submit the form
  function handleSubmit(e) {
    e.preventDefault();

    let name = document.querySelector("#prenom").value;
    let surname = document.querySelector("#nom").value;
    let biography = document.querySelector("#biographie").value;

    const formData = new FormData();
    formData.append("name", name ? name : userData.name);
    formData.append("surname", surname ? surname : userData.surname);
    formData.append("biography", biography ? biography : userData.biography);
    formData.append("file", file);

    axios({
      method: "PUT",
      url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/users/${userData._id}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
      data: formData,
    })
      .then(() => {
        removeErrorMessages();
        document.location.reload();
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
          default:
            console.log(err);
        }
      });
  }

  return (
    <div className="profile-editing__contact-details">

      <h2 className="profile-editing__title">Paramètres généraux</h2>
      <form className="profile-page__form">
        <div className="profile-editing__photo-config__img-container">

          {/* Image preview */}
          <img
            id="image-preview"
            className="profile-editing__photo-config__img"
            src={
              userData.imageUrl === "../images/"
                ? defaultProfile
                : userData.imageUrl
            }
            alt="Profile"
          />

          {/* Buttons to handle the image preview */}
          <div className="profile-editing__photo-config__buttons">
            <label
              id="change-photo"
              htmlFor="file-input"
              className="profile-page__btn"
            >
              <i className="fa fa-camera"></i> Changer
            </label>
            <input
              id="file-input"
              name="file-input"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleProfileImage}
            />
            <button
              id="delete-photo"
              className="profile-page__btn"
              onClick={clearFileInput}
            >
              <i className="fa fa-rotate-left"></i> Annuler
            </button>
          </div>
        </div>

        {/* Possible error message due to invalid size */}
        {imageSizeErrorMessage && (
          <div className="error-message-container">
            <i className="fas fa-exclamation-circle"></i>
            <span>
              La photo dépasse le seuil autorisé. <br /> La photo ne doit pas
              dépasser 5 Mo
            </span>
          </div>
        )}

        {/* Possible error message due to invalid format */}
        {imageFormatErrorMessage && (
          <div className="error-message-container">
            <i className="fas fa-exclamation-circle"></i>
            <span>
              Format invalide. <br /> Les formats acceptés sont les suivants :
              JPG, JPEG, PNG
            </span>
          </div>
        )}

        {/* Description to have a valid image */}
        <ul id="valid-image-description">
          Ajoutez votre photo et enregistrez pour conserver vos modifications.
          <br />
          <br />
          Attention:
          <li>la photo ne doit pas dépasser 5 Mo</li>
          <li>les formats acceptés sont les suivants : JPG, JPEG, PNG</li>
        </ul>

        {/* Name Input */}
        <label>
          {" "}
          Prénom
          <input
            id="prenom"
            type="text"
            name="prenom"
            placeholder={userData.name}
          />
        </label>

        {/* Possible error message due to invalid name */}
        {nameErrorMessage && (
          <div className="error-message-container">
            <i className="fas fa-exclamation-circle"></i>
            <span>
              Nom non valide. <br /> Veuillez respecter ce format : Jon
            </span>
          </div>
        )}

        {/* Surname Input */}
        <label>
          {" "}
          Nom de famille
          <input
            id="nom"
            type="text"
            name="nom"
            placeholder={userData.surname}
          />
        </label>

        {/* Possible error message due to invalid surname */}
        {surnameErrorMessage && (
          <div className="error-message-container">
            <i className="fas fa-exclamation-circle"></i>
            <span>
              Nom de famille invalide. <br /> Veuillez respecter ce format :
              Snow
            </span>
          </div>
        )}

        {/* Email Input */}
        <label>
          {" "}
          Adress e-mail*
          <div id="email-input-container">
            <i className="fa fa-lock"></i>
            <input
              type="email"
              name="email"
              placeholder="Ce champ n'est pas modifiable"
              disabled
            />
          </div>
        </label>

        {/* Biographie Area */}
        <label>
          {" "}
          Biographie
          <textarea
            id="biographie"
            name="biographie"
            maxLength="800"
            placeholder={userData.biography}
          ></textarea>
        </label>

        {/* Submit button */}
        <button
          className="profile-page__btn profile-page__btn--active"
          type="submit"
          onClick={handleSubmit}
        >
          Enregistrer
        </button>

      </form>

    </div>
  );
}

export default ContactDetails;
