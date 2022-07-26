import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../utils/context/AppContext";
import axios from "axios";
import defaultProfile from "../../../assets/default-profile.png";
import ContentToEdit from "./ContentToEdit";

function PostCard({ post, setDateFormat }) {

  const { userData, setShouldRefresh } = useContext(AppContext);

  // Post User Data
  const [postUserData, setPostUserData] = useState(null);

  // Post loading status
  const [isLoading, setIsLoading] = useState(true);

  // User interface status
  const [postMenu, setPostMenu] = useState(false);
  const [editingForm, setEditingForm] = useState(false);

  // Features to have a better user experience
  function showPostMenu() {
    postMenu ? setPostMenu(false) : setPostMenu(true);
  }
  function showContentToEdit() {
    setPostMenu(false);
    setEditingForm(true);
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

  // Function to handle likes
  function handleLike(e) {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/posts/${post._id}/like`,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
      data: post.likers.includes(userData._id) ? { like: 0 } : { like: 1 },
    })
      .then(() => {
        setShouldRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Function to remove the post
  function deletePostCard(e) {
    e.preventDefault();
    let isSure = window.confirm("Voulez-vous supprimer le message ?");
    if (isSure) {
      axios({
        method: "DELETE",
        url: `http://localhost:${process.env.REACT_APP_API_PORT}/api/posts/${post._id}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("userToken")
          )}`,
        }
      })
        .then(() => {
          setShouldRefresh(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

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

            { userData._id === postUserData._id || userData.isAdmin ? (
              <div className="ellipsis-button" onClick={showPostMenu}>
                <i className="fa fa-ellipsis-h"></i>
              </div>
            ) : null }

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
                <button
                  className="post-card__menu-button"
                  onClick={deletePostCard}
                >
                  <i className="fa fa-trash post-card__menu-icon"></i>
                  <b>Supprimer</b>
                </button>
              </div>
            ) : null}
          </div>

          {/* Content to edit*/}
          {editingForm ? <ContentToEdit post={post} setDateFormat={setDateFormat} setEditingForm={setEditingForm}/> : null}

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
          </div>

          {/* Buttons Area */}
          <div className="post-card__buttons-area">
            <button
              id="post-like"
              className={
                post.likers.includes(userData._id)
                  ? "post-card__buttons active-post-like"
                  : "post-card__buttons"
              }
              onClick={handleLike}
            >
              <i
                id="like-icon"
                className={
                  post.likers.includes(userData._id)
                    ? "fa fa-thumbs-up"
                    : "far fa-thumbs-up"
                }
              ></i>
              <span className="post-card__button-name">J'aime</span>
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default PostCard;
