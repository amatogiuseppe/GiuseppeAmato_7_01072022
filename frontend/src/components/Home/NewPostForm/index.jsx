import React, { useState } from "react";
import axios from "axios";
import defaultProfile from "../../../assets/default-profile.png";
import PostPreview from "./PostPreview";

function NewPostForm({ userData, setDateFormat }) {

  const [message, setMessage] = useState("");
  const [postImagePreview, setPostImagePreview] = useState(null);

  const [imageSizeErrorMessage, setImageSizeErrorMessage] = useState(false);
  const [imageFormatErrorMessage, setImageFormatErrorMessage] = useState(false);

  const [file, setFile] = useState(null);

  // Function to handle the post message
  function handlePostMessage(e) {
    // The height of the textarea changes dynamically based on the content
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // By storing the message content in the variable "message"
    setMessage(e.target.value);
  }

  // Function called when the user clicks on the camera icon to attach an image
  function handleAttachedImage(e) {
    setFile(e.target.files[0]);
    setPostImagePreview(URL.createObjectURL(e.target.files[0]));
    if (e.target.files[0].size > 5000000) {
      setImageSizeErrorMessage(true);
    } else {
      setImageSizeErrorMessage(false);
    }
    if (
      e.target.files[0].type !== "image/jpg" &&
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpeg"
    ) {
      setImageFormatErrorMessage(true);
    } else {
      setImageFormatErrorMessage(false);
    }
  }

  // Function to remove the image attached to the post
  function removeAttachedImage() {
    document.querySelector("#attached-image").value = null;
    setFile(null);
    setPostImagePreview(null);
    setImageSizeErrorMessage(false);
    setImageFormatErrorMessage(false);
  }

  // Function to clear the post and reset it
  function resetPost(e) {
    e.preventDefault();
    removeAttachedImage();
    setMessage("");
    document.querySelector("#post-input").style.height = "inherit";
  }

  // Main function to submit the post
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("postContent", message ? message : null);
    formData.append("file", file);

    axios({
      method: "POST",
      url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/posts`,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
      data: formData,
    })
      .then(() => {
        document.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {/* Top Side */}
      <div className="new-post-form__top-side">
        <img
          className="user-photo"
          src={
            userData.imageUrl === "../images/"
              ? defaultProfile
              : userData.imageUrl
          }
          alt="Profile"
        />
        <textarea
          id="post-input"
          name="post-input"
          maxLength="800"
          placeholder="Écrivez quelque chose..."
          onChange={handlePostMessage}
          value={message}
        ></textarea>
      </div>

      {/* Post Preview */}
      {(message || postImagePreview) && (
        <PostPreview
          setDateFormat={setDateFormat}
          message={message}
          postImagePreview={postImagePreview}
          removeAttachedImage={removeAttachedImage}
          imageSizeErrorMessage={imageSizeErrorMessage}
          imageFormatErrorMessage={imageFormatErrorMessage}
        />
      )}

      {/* Bottom Side */}
      <div className="new-post-form__bottom-side">
        {/* Attached Image Button */}
        <label id="post-camera-container" htmlFor="attached-image">
          <i id="post-camera" className="fa fa-camera"></i>
        </label>
        <input
          id="attached-image"
          name="attached-image"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleAttachedImage}
        />

        {/* Buttons to submit and cancel the post */}
        <div className="new-post-form__buttons">
          <button id="annul-post" className="post-buttons" onClick={resetPost}>
            Annuler
          </button>
          <button
            id="submit-post"
            className="post-buttons"
            onClick={handleSubmit}
          >
            Envoyer
          </button>
        </div>
      </div>
    </>
  );
}

export default NewPostForm;
