import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
// import ReactHtmlParser from "react-html-parser";
import { STORAGE_KEY } from "../../constants/storageKey";
import postApi from "../../api/postApi";
import authApi from "../../api/authApi";
import Button from "../../components/form/Button";
import ContentPost from "../../components/post/Content";
import BoxPopup from "../../components/utils/BoxPopup";
import Loading from "../../components/utils/Loading";

import "./scss/_addPost.scss";

function AddPost() {
  const userLogin = authApi.getCurrentUser();
  const history = useHistory();
  if (!userLogin) {
    history.push("/user/sign-in");
  }
  const draftPost = JSON.parse(localStorage.getItem(STORAGE_KEY.draftPost));
  const [postData, setPostData] = useState(() => {
    return {
      linkImgCap: draftPost && draftPost.linkImgCap ? draftPost.linkImgCap : "",
      title: draftPost && draftPost.title ? draftPost.title : "",
      tagId: [],
    };
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeClass, setActiveClass] = useState("edit");
  const [isPreview, setIsPreview] = useState(false);
  const [showDescription, setShowDescription] = useState("title");
  const [tagList, setTagList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  // const [message, setMessage] = useState(null);
  const apiUrlUploadImg = process.env.REACT_APP_API_URL + "/post/upload-file";
  const [popup, setPopup] = useState({
    isShow: false,
    title: "",
    className: "",
    message: "",
    type: "",
  });

  const editorRef = useRef(null);

  const handleEditorChange = () => {
    const content = editorRef.current.getContent();
    setShowDescription("body");
    setPostData({
      ...postData,
      content: content,
    });
  };

  useEffect(() => {
    const tags = localStorage.getItem(STORAGE_KEY.tags)
      ? JSON.parse(localStorage.getItem(STORAGE_KEY.tags))
      : [];
    const newTagList = tags.map((tag) => {
      return {
        value: tag._id,
        label: tag.name,
      };
    });
    setTagList(newTagList);
  }, []);

  const addActiveClass = (e) => {
    localStorage.setItem(STORAGE_KEY.draftPost, JSON.stringify(postData));
    const idElement = e.target.id;
    setActiveClass(idElement);
    if (idElement === "preview") {
      setIsPreview(true);
    } else {
      setIsPreview(false);
    }
  };

  const handleTitle = (e) => {
    const value = e.target.value;
    // setMessage(null);
    setPostData({
      ...postData,
      title: value,
    });
  };

  const removeCoverImg = () => {
    setPostData({
      ...postData,
      linkImgCap: "",
    });
  };

  const uploadCoverImg = async (e) => {
    setShowLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await postApi.uploadFile(formData);
      if (res.status && res.status === "success") {
        // console.log(res);
        setShowLoading(false);
        setPostData({
          ...postData,
          linkImgCap: res.location,
        });
      } else {
        console.log(res);
        let message = res.message ? res.message : "Server error....";
        setPopup({
          isShow: true,
          message: message,
          title: "Error!",
          className: "error",
          type: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelected = (value) => {
    setSelectedOption(value);
    // setMessage(null);
    const tagId = value.map((tag) => {
      return tag.value;
    });

    setPostData({
      ...postData,
      tagId,
    });
  };

  const handleCreatePost = async () => {
    const token = await authApi.getToken();
    const createPost = await postApi.createPost(postData, token);
    // console.log('createPost>>>', createPost);
    if (createPost.status === "success") {
      // setMessage({
      //   type: "success",
      //   msg: "Your post created successfully!",
      // });
      setPopup({
        isShow: true,
        message: "Your post created successfully!",
        title: "Message!",
        className: "success",
        type: "",
      });
      localStorage.removeItem(STORAGE_KEY.draftPost);
    } else {
      // setMessage({
      //   type: "error",
      //   msg: createPost.message ? "Error!!" + createPost.message : "Error!!",
      // });
      let message = createPost.message
        ? createPost.message
        : "Server error....";
      setPopup({
        isShow: true,
        message: message,
        title: "Error!",
        className: "error",
        type: "",
      });
      console.log(createPost);
    }
  };

  const saveDraft = () => {
    localStorage.setItem(STORAGE_KEY.draftPost, JSON.stringify(postData));
    setPopup({
      isShow: true,
      message: "Save draft post successfully!",
      title: "Message",
      className: "success",
      type: "",
    });
  };

  const hiddenPopup = () => {
    setPopup({
      ...popup,
      isShow: false,
    });
  };

  return (
    <>
      <div className="addPost">
        <div className="addPost__header">
          <header>
            <span>Create Post</span>
            <div>
              <button
                className={activeClass === "edit" ? "active" : ""}
                id="edit"
                onClick={addActiveClass}
              >
                Edit
              </button>
              <button
                className={activeClass === "preview" ? "active" : ""}
                id="preview"
                onClick={addActiveClass}
              >
                Preview
              </button>
            </div>
          </header>
        </div>
        <div className="addPost-container">
          {!isPreview ? (
            <>
              <div className="addPost-container__content">
                <div className="addPost__content">
                  <div className="cap-img">
                    {postData.linkImgCap && (
                      <img src={postData.linkImgCap} alt="" />
                    )}
                    {showLoading && (
                      <Loading
                        data={{
                          type: "spin",
                          color: "blue",
                          width: "32px",
                          height: "32px",
                        }}
                      />
                    )}
                    {!postData.linkImgCap && (
                      <label htmlFor="cap-img">Add a cover image</label>
                    )}
                    {postData.linkImgCap && (
                      <>
                        <label htmlFor="cap-img">Change</label>
                        <label className="remove" onClick={removeCoverImg}>
                          Remove
                        </label>
                      </>
                    )}
                    <input
                      type="file"
                      id="cap-img"
                      name="file"
                      onChange={uploadCoverImg}
                      hidden
                    />
                  </div>
                  <div
                    className="post-title"
                    onClick={() => setShowDescription("title")}
                  >
                    <input
                      type="text"
                      name="title"
                      placeholder="New post title here..."
                      onChange={handleTitle}
                      value={postData.title || ""}
                    />
                  </div>
                  <div
                    className="post-tag"
                    onClick={() => setShowDescription("tag")}
                  >
                    <Select
                      // defaultValue={selectedOption}
                      placeholder={"Add up tags..."}
                      border="none"
                      boxShadow="none"
                      outline="none"
                      value={selectedOption}
                      onChange={handleSelected}
                      options={tagList}
                      isMulti={true}
                    />
                  </div>
                  <div
                    className="addPost__content-text"
                    onClick={() => setShowDescription("body")}
                  >
                    <Editor
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={
                        draftPost && draftPost.content ? draftPost.content : ""
                      }
                      init={{
                        value: postData.content,
                        // placeholder: "Write your post content...",
                        height: "300",
                        plugins: [
                          "advlist autolink lists link image",
                          "charmap print preview anchor help",
                          "searchreplace visualblocks code",
                          "insertdatetime media table paste wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help",
                        images_upload_url: apiUrlUploadImg,
                      }}
                      onEditorChange={handleEditorChange}
                    />
                  </div>
                </div>
                {/* {message && message.msg && 
                <div className="message">
                  <p className={message.type} > {message.msg} </p>
                </div>
              } */}
              </div>
              <div className="addPost-container__description">
                {showDescription === "title" && (
                  <div className="description-title">
                    <h3>Writing a Great Post Title</h3>
                    <p>
                      Think of your post title as a super short (but
                      compelling!) description — like an overview of the actual
                      post in one short sentence. Use keywords where appropriate
                      to help ensure people can find your post by search.
                    </p>
                  </div>
                )}

                {showDescription === "tag" && (
                  <div className="description-tag">
                    <h3>Tagging Guidelines</h3>
                    <p>
                      Tags help people find your post. Think of tags as the
                      topics or categories that best describe your post. Add up
                      to four comma-separated tags per post. Combine tags to
                      reach the appropriate subcommunities. Use existing tags
                      whenever possible. Some tags, such as “help” or
                      “healthydebate”, have special posting guidelines.
                    </p>
                  </div>
                )}

                {showDescription === "body" && (
                  <div className="description-body">
                    <h3>Editor Basics</h3>
                    <p>
                      Use Markdown to write and format posts. Commonly used
                      syntax You can use Liquid tags to add rich content such as
                      Tweets, YouTube videos, etc. In addition to images for the
                      post's content, you can also drag and drop a cover image
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="preview">
              <ContentPost
                post={{
                  ...postData,
                  userId: userLogin,
                  updatedAt: new Date(),
                }}
              />
            </div>
          )}
        </div>
        <div className="addPost__footer">
          <Button
            className="btn btn-primary"
            onClick={handleCreatePost}
            type="button"
            label="Publish"
          />
          <Button
            className="btn btn-info"
            onClick={saveDraft}
            type="button"
            label="Save draft"
          />
        </div>
      </div>
      {popup.isShow && (
        <BoxPopup
          title={popup.title}
          message={popup.message}
          className={popup.className}
          hiddenPopup={hiddenPopup}
          handleOnClick={hiddenPopup}
          type={popup.type}
        />
      )}
    </>
  );
}

export default AddPost;
