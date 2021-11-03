import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import postApi from "../../api/postApi";
import authApi from "../../api/authApi";
import commentApi from "../../api/commentApi";
import PostContent from "../../components/post/Content";
import UserCard from "../../components/user/UserCard";
import Comment from "../../components/comment/Comment";
import { Editor } from "@tinymce/tinymce-react";
// import ReactHtmlParser from "react-html-parser";
import { RiHeart2Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import "./scss/_detail.scss";

function Detail() {
  const { postId } = useParams();
  const history = useHistory();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const userLogin = authApi.getCurrentUser();
  const apiUrlUploadImg = process.env.REACT_APP_API_URL + "/post/upload-file";
  const [commentContent, setCommentContent] = useState("");
  const [isShowForm, setIsShowForm] = useState(false);
  const [commentParams, setCommentParams] = useState({
    page: 1,
    limit: 10,
    post_id: postId,
  });

  useEffect(() => {
    const getPost = async (id) => {
      const res = await postApi.getById(id);
      if (res.status === "success") {
        const post = res.data.post;
        setPost(post);
      } else {
        console.log(res);
      }
    };
    getPost(postId);
  }, [postId]);

  useEffect(() => {
    const getPostComments = async () => {
      const res = await commentApi.get(commentParams);
      // console.log('getcomment>>>>.',res);
      if (res.status === "success") {
        const postComments = res.data.comments;
        setComments(postComments);
      } else {
        console.log(res);
      }
    };
    getPostComments();
  }, [commentParams]);

  const changeReact = async () => {
    if (userLogin) {
      let action = "";
      const listUserReactions = [...post.reaction.users];
      if (listUserReactions.includes(userLogin._id)) {
        action = "remove";
      } else {
        action = "add";
      }
      console.log('acction>>>>>', action);
      const token = await authApi.getToken();
      const userReaction = await postApi.addReaction(
        postId,
        {
          action,
          userId: userLogin._id,
        },
        token
      );
      console.log('update reaction>>>>>',userReaction);
      if (userReaction.status === "success") {
        const updatePost = userReaction.data.post;
        setPost({
          ...post,
          reaction: updatePost.reaction,
        });
      } else {
        console.log(userReaction);
      }
    } else {
      if (window.confirm("You must be sign in!")) {
        history.push("/user/sign-in");
      }
    }
  };

  const handleEditorChange = (content) => {
    setCommentContent(content);
    console.log(comments);
  };

  const handleAddComment = async () => {
    // console.log("comment-content>>>>", commentContent);
    if (userLogin) {
      const token = await authApi.getToken();
      const data = {
        content: commentContent,
        post: postId,
      };
      const addComment = await commentApi.addComment(data, token);
      console.log("add-comment>>>>", addComment);
      if (addComment.status === "success") {
        setComments([addComment.data.comment, ...comments]);
        setCommentContent("");
        setIsShowForm(false);
      }
    } else {
      if (window.confirm("You must be sign in!")) {
        history.push("/user/sign-in");
      }
    }
  };

  const replyHandle = async (content, commentId) => {
    console.log("reply>>>>>>>>>", {
      content,
      commentId,
    });

    if (userLogin) {
      const token = await authApi.getToken();
      const params = {
        id: commentId,
        type: "reply",
        action: "add",
      };
      const replyComment = await commentApi.updateComment(
        { content },
        params,
        token
      );
      // console.log('add-comment>>>>', replyComment);
      if (replyComment.status === "success") {
        const newComment = replyComment.data.comment;
        const newListComment = [...comments].map((comment) => {
          if (comment._id === newComment._id) return newComment;
          return comment;
        });
        setComments(newListComment);
      } else {
        console.log("error>>>>>", replyComment);
      }
    } else {
      if (window.confirm("You must be sign in!")) {
        history.push("/user/sign-in");
      }
    }
  };

  // const handleShowMoreComment = () => {
  //   setCommentParams({
  //     ...commentParams,
  //     limit: commentParams.limit + 10
  //   })
  // }

  const showFormComment = () => {
    setIsShowForm(true);
  };

  return (
    <>
      {post && (
        <div className="postDetail">
          <div className="postDetail__left">
            <ul>
              <li
                className={
                  userLogin && post.reaction.users.includes(userLogin._id)
                    ? "active"
                    : ""
                }
              >
                <span onClick={changeReact}>
                  <RiHeart2Line />
                </span>
                <small>{post.reaction.quantity}</small>
              </li>
              <li>
                <span className="react-icon-comment">
                  <FaRegComment />
                </span>
                <small>{post.quantityComment}</small>
              </li>
            </ul>
          </div>
          <div className="postDetail__content">
            <PostContent post={post} />
            <div className="detail__comment">
              <div className="detail__comment-header">
                <h2>Discussion {comments ? `(${comments.length})` : "(0)"}</h2>

                <div className="detail__comment-editor">
                  {isShowForm ? (
                    <>
                      <Editor
                        init={{
                          value: commentContent,
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
                      <div className="detail__comment-editor__footer">
                        <button
                          disabled={!commentContent}
                          onClick={handleAddComment}
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="detail__comment-editor__btn">
                      <button onClick={showFormComment}>Add comment</button>
                    </div>
                  )}
                </div>
              </div>
              {comments && (
                <div>
                  {comments.map((comment) => {
                    return (
                      <Comment
                        replyHandle={replyHandle}
                        comment={comment}
                        key={comment._id}
                      />
                    );
                  })}
                </div>
              )}
              {/* <div className="detail__comment-footer">
                <button onClick={handleShowMoreComment}>See more</button>
              </div> */}
            </div>
          </div>
          <div className="postDetail__right">
            <div className="postDetail__right-fixed">
              <UserCard user={post.userId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
