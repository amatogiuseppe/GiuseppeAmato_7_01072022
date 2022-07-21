import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../utils/context/AppContext";
import axios from "axios";
import defaultProfile from "../../../assets/default-profile.png";
import ContentToEdit from "./ContentToEdit";
import CommentsArea from "./CommentsArea";

function PostCard({ post, setDateFormat }) {

  // User Data
  const { userData } = useContext(AppContext);

  // Post User Data
  const [postUserData, setPostUserData] = useState(null);

  // Post loading status
  const [isLoading, setIsLoading] = useState(true);

  // User interface status
  const [postMenu, setPostMenu] = useState(false);
  const [editingForm, setEditingForm] = useState(false);
  const [commentsArea, setCommentsArea] = useState(false);

  // Features to have a better user experience
  function showPostMenu() {
    postMenu ? setPostMenu(false) : setPostMenu(true);
  }
  function showContentToEdit() {
    setPostMenu(false);
    setEditingForm(true);
  }
  function showComments() {
    commentsArea ? setCommentsArea(false) : setCommentsArea(true);
  }

  // Function to fetch the data of the user who wrote the post
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/users/${post.postUserId}`,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    })
      .then((res) => {
        setPostUserData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [post.postUserId]);

  return (
    <>
      {isLoading ? (
        <div className="post-card__loading">
          <i className="fa fa-spinner"></i>
        </div>
      ) : (
        <div className="post-card">
          {/* Post Creator Info */}
          <div className="post-card__post-creator-info">
            <div className="post-card__creator">
              <img
                className="user-photo"
                src={
                  postUserData.imageUrl === "../images/"
                    ? defaultProfile
                    : postUserData.imageUrl
                }
                alt="Profile"
              />
              <div>
                <span className="post-card__user-name">
                  {postUserData.name} {postUserData.surname}
                </span>
                <div className="post-card__timestamp">
                  {setDateFormat(post.createdAt)}
                </div>
              </div>
            </div>

            {userData._id === postUserData._id ? (
              <div className="ellipsis-button" onClick={showPostMenu}>
                <i className="fa fa-ellipsis-h"></i>
              </div>
            ) : null}

            {/* Drop-down menu */}
            {postMenu ? (
              <div className="post-card__menu">
                <button
                  className="post-card__menu-button"
                  onClick={showContentToEdit}
                >
                  <i className="fa fa-pencil post-card__menu-icon"></i>
                  <b>Modifier</b>
                </button>
                <button className="post-card__menu-button">
                  <i className="fa fa-trash post-card__menu-icon"></i>
                  <b>Supprimer</b>
                </button>
              </div>
            ) : null}
          </div>

          {/* Content to edit*/}
          {editingForm ? <ContentToEdit /> : null}

          {/* Content*/}
          {editingForm ? null : (
            <div className="post-card__content">
              <div className="post-card__message">{post.postContent}</div>
              <div className="post-card__attached-image-container">
                {post.imageUrl === "../images/" ? null : (
                  <img
                    className="post-preview__attached-image"
                    src={post.imageUrl}
                    alt="Attached file"
                  />
                )}
              </div>
            </div>
          )}

          {/* Counter */}
          <div className="post-card__counter-container">
            <div className="post-card__counter">
              <div id="like-container" className="post-card__icon-container">
                <i className="fa fa-thumbs-up"></i>
              </div>
              <span className="post-card__counter-value">{post.likes}</span>
            </div>
            <div className="post-card__counter">
              <div id="comment-container" className="post-card__icon-container">
                <i className="far fa-comment comment-icon-size"></i>
              </div>
              <span className="post-card__counter-value">
                {post.comments.length}
              </span>
            </div>
          </div>

          {/* Buttons Area */}
          <div className="post-card__buttons-area">
            <button
              id="post-like"
              className="post-card__buttons active-post-like"
            >
              <i id="like-icon" className="far fa-thumbs-up"></i>
              <span className="post-card__button-name">J'aime</span>
            </button>

            <button
              id="post-comments"
              className="post-card__buttons"
              onClick={showComments}
            >
              <i className="far fa-comment"></i>
              <span className="post-card__button-name">Commentaires</span>
            </button>
          </div>

          {/* Comments Area */}
          {commentsArea ? <CommentsArea setDateFormat={setDateFormat} /> : null}
        </div>
      )}
    </>
  );
}

export default PostCard;
