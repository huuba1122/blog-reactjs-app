import React, { useState } from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import ReactHtmlParser from "react-html-parser";
import { FaRegComment } from "react-icons/fa";
// import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./scss/_comment.scss";

Comment.propTypes = {
  comment: PropTypes.object,
  commentHandle: PropTypes.func,
};

Comment.defaultProps = {
  comment: null,
  commentHandle: null,
};

function Comment(props) {
  const { comment, replyHandle } = props;
  // console.log('comment>>>>', comment);
  const apiUrlUploadImg = process.env.REACT_APP_API_URL + "/post/upload-file";
  const [relyContent, setReplyContent] = useState("");
  const [showFormReply, setShowFormReply] = useState(false);

  const handleEditorChange = (content) => {
    setReplyContent(content);
  };

  const handleShowFormReply = () => {
    setShowFormReply(!showFormReply);
  };

  const handleReplyComment = () => {
    const content = relyContent;
    setReplyContent('');
    replyHandle(content, comment._id);
    setShowFormReply(false);
  };

  return (
    <>
      {comment && (
        <div className="commentWrapper">
          <div className="commentWrapper__main">
            <div className="comment-avatar">
              <img
                src={comment.user.avatarViewLink || "/images/default.jpeg"}
                alt=""
              />
            </div>
            <div className="comment-body">
              <header>
                <span>{comment.user.name}</span>
                <small>
                  {new Date(comment.createdAt).toLocaleDateString("default", {
                    month: "long",
                    day: "numeric",
                  })}
                </small>
              </header>

              <div className="content-text">
                {ReactHtmlParser(comment.content)}
              </div>
              <div className="comment-footer">
                <span className="btn-reply" onClick={handleShowFormReply}>
                  <i>
                    <FaRegComment />
                  </i>
                  <small>Reply</small>
                </span>
                {/* <span className="btn-edit">
                <i>
                  <AiOutlineEdit />
                </i>
                <small>Edit</small>
              </span>
              <span className="btn-delete">
                <i>
                  <AiOutlineDelete />
                </i>
                <small>Delete</small>
              </span> */}
              </div>
            </div>
          </div>
          <div className="commentWrapper__reply">
            {comment.replies &&
              comment.replies.length > 0 &&
              comment.replies.map((reply) => {
                return (
                  <div className="commentWrapper__reply-main" key={reply._id}>
                    <div className="comment-avatar">
                      <img src={reply.user.avatarViewLink || "/images/default.jpeg"} alt="" />
                    </div>
                    <div className="comment-body">
                      <header>
                        <span>{reply.user.name}</span>
                        <small>
                          {new Date(reply.createdAt).toLocaleDateString("default", {
                            month: "long",
                            day: "numeric",
                          })}
                        </small>
                      </header>

                      <div className="content-text">
                        {ReactHtmlParser(reply.content)}
                      </div>
                      <div className="comment-footer">
                        <span
                          className="btn-reply"
                          onClick={handleShowFormReply}
                        >
                          <i>
                            <FaRegComment />
                          </i>
                          <small>Reply</small>
                        </span>
                        {/* <span className="btn-edit">
                  <i>
                    <AiOutlineEdit />
                  </i>
                  <small>Edit</small>
                </span>
                <span className="btn-delete">
                  <i>
                    <AiOutlineDelete />
                  </i>
                  <small>Delete</small>
                </span> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            {showFormReply && (
              <div className="comment-editor">
                <Editor
                  init={{
                    value: relyContent,
                    placeholder: "Write your comment...",
                    height: "250",
                    plugins: [
                      "advlist autolink lists link image",
                      // "charmap print preview anchor help",
                      "searchreplace visualblocks code",
                      "insertdatetime media table paste wordcount",
                    ],
                    toolbar:
                      "formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent",
                    images_upload_url: apiUrlUploadImg,
                  }}
                  onEditorChange={handleEditorChange}
                />

                <div className="comment-editor__footer">
                  <button disabled={!relyContent} onClick={handleReplyComment}>
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
