import React from 'react'

function ContentToEdit() {
  return (
    <div className="post-card__content-to-edit">
        <div className="post-card__message-to-edit">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</div>
        <div className="post-card__attached-image-container-to-edit">
          <img
            className="post-card__attached-image-to-edit"
            src="https://img-16.ccm2.net/lbJgPlFe-hn89t0gME15b5ipxJ0=/850x/8fddb577bb794284aee05b9068cbdb12/ccm-faq/simon-matzinger-twukN12EN7c-unsplash.jpg"
            alt="Attached file"
          />
          {/*{postImagePreview ? (
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
          ) : null}*/}

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
            />

            {/* Buttons to submit and cancel the post */}
            <div className="new-post-form__buttons">
              <button id="annul-post" className="post-buttons" >
                Annuler
              </button>
              <button
                id="submit-post"
                className="post-buttons"
              >
                Modifier
              </button>
            </div>

          </div>

        </div>
      </div>
  )
}

export default ContentToEdit