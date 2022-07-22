import React, { useState, useContext } from "react";
import { AppContext } from "../../../utils/context/AppContext";
import axios from "axios";

function ContentToEdit({ post, setEditingForm, setDateFormat }) {

  const { setShouldRefresh } = useContext(AppContext);

  const [messageToEdit, setMessageToEdit] = useState(post.postContent);
  const [newFile, setNewFile] = useState(false);

  const [showImageContainer, setShowImageContainer] = useState(true);
  const [showNewImage, setShowNewImage] = useState(null);

  const [newImageSizeErrorMessage, setNewImageSizeErrorMessage] = useState(false);
  const [newImageFormatErrorMessage, setNewImageFormatErrorMessage] = useState(false);

  // Function to handle the post message to edit
  function handlePostMessageToEdit(e) {
    // The height of the textarea changes dynamically based on the content
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // By storing the message content in the variable "message"
    setMessageToEdit(e.target.value);
  }

  // Function called when the user clicks on the camera icon to attach a new image
  function handleAttachedImageToEdit(e) {
    setNewFile(e.target.files[0]);
    setShowNewImage(URL.createObjectURL(e.target.files[0]));
    setShowImageContainer(true);
    if (e.target.files[0].size > 5000000) {
      setNewImageSizeErrorMessage(true);
    } else {
      setNewImageSizeErrorMessage(false);
    }
    if (
      e.target.files[0].type !== "image/jpg" &&
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpeg"
    ) {
      setNewImageFormatErrorMessage(true);
    } else {
      setNewImageFormatErrorMessage(false);
    }
  }

  // Function to remove the image attached to the post
  function removeAttachedImageToEdit() {
    document.querySelector("#attached-image-to-edit").value = null;
    setShowImageContainer(false);
    setNewFile(false);
    setShowNewImage(null);
    setNewImageSizeErrorMessage(false);
    setNewImageFormatErrorMessage(false);
  }

  // Function to cancel post editing mode
  function resetPostToEdit(e) {
    e.preventDefault();
    removeAttachedImageToEdit();
    setEditingForm(false);
  }

  // Main function to submit the post to edit
  function handleSubmitToEdit(e) {
    e.preventDefault();
    // If the user wishes to attach a new image
    const formData = new FormData();
    formData.append(
      "postContent",
      messageToEdit ? messageToEdit : post.postContent
    );
    formData.append("file", newFile);
    // if the user does not wish to send a new image
    let dataToEdit = {
      postContent: messageToEdit,
      imageUrl: !showImageContainer ? "../images/" : null,
    };
    axios({
      method: "PUT",
      url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/posts/${post._id}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
      data: newFile ? formData : dataToEdit,
    })
      .then(() => {
        setShouldRefresh(true);
        resetPostToEdit(e);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="post-card__content-to-edit">

      {/* Area where the text of the post can be edited */}
      <div className="post-card__message-to-edit">
        <textarea
          id="post-input-to-edit"
          name="post-input-to-edit"
          maxLength="800"
          placeholder="Écrivez quelque chose..."
          onChange={handlePostMessageToEdit}
          value={messageToEdit}
        ></textarea>
      </div>

      {/* Area where the post image can be edited */}
      <div className="post-card__attached-image-container-to-edit">
        {!newFile && post.imageUrl === "../images/" ? null : (
          <>
            {showImageContainer ? (
              <img
                className="post-card__attached-image-to-edit"
                src={newFile ? showNewImage : post.imageUrl}
                alt="Attached file"
              />
            ) : null}
            <div
              id="remove-attached-image-to-edit"
              onClick={removeAttachedImageToEdit}
            >
              <i className="fa fa-times"></i>
            </div>
          </>
        )}

        {/* Possible error message due to invalid size */}
        {newImageSizeErrorMessage && (
          <div className="error-message-container">
            <i className="fas fa-exclamation-circle"></i>
            <span>
              La photo dépasse le seuil autorisé. <br />
              La photo ne doit pas dépasser 5 Mo.
            </span>
          </div>
        )}

        {/* Possible error message due to invalid format */}
        {newImageFormatErrorMessage && (
          <div className="error-message-container">
            <i className="fas fa-exclamation-circle"></i>
            <span>
              Le format de l'image n'est pas valide. <br /> Les formats acceptés
              sont les suivants : JPG, JPEG, PNG
            </span>
          </div>
        )}

        {/* Bottom Side */}
        <div className="post-card__bottom-side-to-edit">
          {/* Attached Image Button */}
          <label
            id="post-camera-container-to-edit"
            htmlFor="attached-image-to-edit"
          >
            <i id="post-camera-to-edit" className="fa fa-camera"></i>
          </label>
          <input
            id="attached-image-to-edit"
            name="attached-image-to-edit"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleAttachedImageToEdit}
          />

          {/* Buttons to submit and cancel the post */}
          <div className="post-card__buttons-to-edit">
            <button
              id="annul-post-to-edit"
              className="post-buttons"
              onClick={resetPostToEdit}
            >
              Annuler
            </button>
            {messageToEdit &&
            !newImageSizeErrorMessage &&
            !newImageFormatErrorMessage ? (
              <button
                id="submit-post-to-edit"
                className="post-buttons"
                onClick={handleSubmitToEdit}
              >
                Modifier
              </button>
            ) : (
              <button
                id="submit-post-to-edit-disabled"
                className="post-buttons"
              >
                Modifier
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentToEdit;
