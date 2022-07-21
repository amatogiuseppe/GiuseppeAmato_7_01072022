import React, { useContext } from "react";
import { UserLoggedInContext } from "../../../utils/context/UserLoggedInContext";
import defaultProfile from "../../../assets/default-profile.png";

function PostPreview({
  setDateFormat,
  message,
  postImagePreview,
  removeAttachedImage,
  imageSizeErrorMessage,
  imageFormatErrorMessage,
}) {

  // User Data
  const { userData } = useContext(UserLoggedInContext);

  return (
    <div className="new-post-form__post-preview">

      {/* Post Preview - Top Side */}
      <div className="post-preview__top-side">
        <div className="post-preview__user-info">
          <img
            className="user-photo"
            src={
              userData.imageUrl === "../images/"
                ? defaultProfile
                : userData.imageUrl
            }
            alt="Profile"
          />
          <span className="post-preview__user-name">
            {userData.name} {userData.surname}
          </span>
        </div>

        <div className="post-preview__timestamp">
          {setDateFormat(Date.now())}
        </div>
      </div>

      {/* Post Preview - Bottom Side*/}
      <div className="post-preview__bottom-side">
        <div className="post-preview__content">{message}</div>
        <div className="post-preview__attached-image-container">
          {postImagePreview ? (
            <>
              <img
                className="post-preview__attached-image"
                src={postImagePreview}
                alt="Attached file"
              />
              <div id="remove-attached-image" onClick={removeAttachedImage}>
                <i className="fa fa-times"></i>
              </div>
            </>
          ) : null}

          {/* Possible error message due to invalid size */}
          {imageSizeErrorMessage && (
            <div className="password-editing__error-message">
              <i class="fas fa-exclamation-circle"></i>
              <span className="profile-editing__error-message__text">
                La photo dépasse le seuil autorisé. <br />
                La photo ne doit pas dépasser 5 Mo.
              </span>
            </div>
          )}

          {/* Possible error message due to invalid format */}
          {imageFormatErrorMessage && (
            <div className="password-editing__error-message">
              <i class="fas fa-exclamation-circle"></i>
              <span className="profile-editing__error-message__text">
                Le format de l'image n'est pas valide. <br /> Les formats
                acceptés sont les suivants : JPG, JPEG, PNG
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
