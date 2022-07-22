import React, { useContext } from "react";
import { AppContext } from "../../../utils/context/AppContext";
import defaultProfile from "../../../assets/default-profile.png";

function CommentsArea({ setDateFormat }) {
  // User Data
  const { userData } = useContext(AppContext);

  return (
    <div className="post-card__comments-area">

      {/* Comments Container */}
      <div className="comments-container">
        <div className="comment-card">
          {/* Left Side */}
          <div>
            <img
              className="user-miniature"
              src={
                userData.imageUrl === "../images/"
                  ? defaultProfile
                  : userData.imageUrl
              }
              alt="Profile"
            />
          </div>

          {/* Right Side */}
          <div className="comment-card__right-side">
            {/* Name + Date + Settings */}
            <div className="comment-card__top-right-side">
              <div className="comment-card__name-date">
                <span className="comment-card__user-name">
                  {userData.name} {userData.surname}
                </span>
                <div className="comment-card__timestamp">
                  {setDateFormat(Date.now())}
                </div>
              </div>
              <div className="comment-card__ellipsis">
                <i className="fa fa-ellipsis-h"></i>
              </div>
            </div>

            {/* Message */}
            <div>
              <textarea
                className="comment-message"
                name="comment-message"
                maxLength="400"
                disabled
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </textarea>
            </div>
          </div>
        </div>
        <div className="comment-card">

          {/* Left Side */}
          <div>
            <img
              className="user-miniature"
              src={
                userData.imageUrl === "../images/"
                  ? defaultProfile
                  : userData.imageUrl
              }
              alt="Profile"
            />
          </div>

          {/* Right Side */}
          <div className="comment-card__right-side">
            {/* Name + Date + Settings */}
            <div className="comment-card__top-right-side">
              <div className="comment-card__name-date">
                <span className="comment-card__user-name">
                  {userData.name} {userData.surname}
                </span>
                <div className="comment-card__timestamp">
                  {setDateFormat(Date.now())}
                </div>
              </div>
              <div className="comment-card__ellipsis">
                <i className="fa fa-ellipsis-h"></i>
              </div>
            </div>

            {/* Message */}
            <div>
              <textarea
                className="comment-message"
                name="comment-message"
                maxLength="400"
                disabled
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </textarea>
            </div>

          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="comment-input-container">
        <div className="comment-input-container__user-image">
          <img
            className="user-miniature"
            src={
              userData.imageUrl === "../images/"
                ? defaultProfile
                : userData.imageUrl
            }
            alt="Profile"
          />
        </div>

        <div className="comment-input-container__textarea">
          <textarea
            className="comment-message comment-input-container__input"
            name="comment-message"
            maxLength="400"
            placeholder="Écrivez un commentaire..."
          ></textarea>
        </div>

        <div>
          <button className="comment-input-container__button">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentsArea;
