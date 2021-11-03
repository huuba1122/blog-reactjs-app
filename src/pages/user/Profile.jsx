import React, { useState, useEffect, useContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import SummaryPost from "../../components/post/SummaryPost";
import BoxPopup from "../../components/utils/BoxPopup";
import GoTop from "../../components/utils/GoTop";
import postApi from "../../api/postApi";
import authApi from "../../api/authApi";
import userApi from "../../api/userApi";
import { AuthContext } from "../../contexts/AuthContext";
import postReducer from "../../reducers/PostReducer";
import popupReducer from "../../reducers/PopUpReducer";
import { postAction, popupAction } from "../../constants/actionType";
import {
  FaExternalLinkAlt,
  FaBirthdayCake,
  FaRegComment,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import "./scss/_profile.scss";
import usePagination from '../../hooks/usePagination';

function Profile() {
  const { userId } = useParams();
  //load context auth
  const { userLogin } = useContext(AuthContext);

  // load post reducer
  const [articles, dispatch] = useReducer(postReducer, {});
  const [popup, dispatchPopup] = useReducer(popupReducer, {});
  //for this components only
  const [userProfile, setUserProfile] = useState({});

  // load customize Hook pagination
  const limit = usePagination(articles.total || 0);

  useEffect(() => {
    const params = {
      page: 1,
      sort: "createdAt",
      s_type: "desc",
      field: "userId",
      f_value: userId,
    };
    const getUserPost = async (params) => {
      try {
        const res = await postApi.get(params);
        // console.log("user post>>>>>>>>>", posts);
        if (res.status === "success") {
          dispatch({
            type: postAction.SAVE_LIST_POST,
            payload: {
              posts: res.data.posts,
              total: res.data.total,
            },
          });
        } else {
          console.log("error>>>", res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserPost({...params, limit});
  }, [userId, limit]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userApi.getById(userId);
        // console.log("user post>>>>>>>>>", res);
        if (res.status === "success") {
          setUserProfile(res.data.user);
        } else {
          console.log("error>>>", res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  const showConfirmDelete = async (postId) => {
    dispatchPopup({
      type: popupAction.CONFIRM,
      payload: {
        message: "Do you want to delete this post!",
        postId: postId,
        title: "Delete",
      },
    });
  };

  const confirmDelete = async () => {
    const postId = popup.postId;
    if (!postId) return false;
    dispatchPopup({
      type: popupAction.HIDDEN,
      payload: null,
    });
    try {
      const token = await authApi.getToken();
      const res = await postApi.deletePost(postId, token);
      // console.log('call delete post>>>>>>', res);
      if (res.status === "success") {
        dispatch({
          type: postAction.DELETE_POST,
          payload: {
            postId,
          },
        });
        dispatchPopup({
          type: popupAction.SUCCESS,
          payload: {
            message: "Delete successfully!!",
            title: "Message",
          },
        });
      } else {
        console.log(res);
        let message = "Server error....";
        if (res.message) {
          message = res.message;
        }
        dispatchPopup({
          type: popupAction.ERROR,
          payload: {
            message,
            title: "Error",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hiddenPopup = () => {
    dispatchPopup({
      type: popupAction.HIDDEN,
      payload: null,
    });
  };

  return (
    <>
      <div className="profile">
        <div className="profileContainer">
          <div className="profileContainer__header">
            {/* <div className="profileContainer__header-top"> */}
            <div className="profileContainer__header-avatar">
              <img
                src={userProfile.avatarViewLink || "/images/default.jpeg"}
                alt=""
              />
            </div>
            <div className="profileContainer__header-detail">
              <h2>{userProfile.name}</h2>
              <div className="user-info">
                <span>
                  <i style={{ fontSize: "1.5rem" }}>
                    <HiLocationMarker />
                  </i>
                  <small>{userProfile.location}</small>
                </span>
                <span>
                  <i>
                    <FaBirthdayCake />
                  </i>{" "}
                  <small>
                    Joined on{" "}
                    {new Date(userProfile.createdAt).toLocaleDateString(
                      "default",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </small>
                </span>

                <span>
                  <a
                    href={userProfile.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i>
                      <FaExternalLinkAlt />
                    </i>
                    <small title={`Link to website: ${userProfile.website}`}>
                      {userProfile.website}
                    </small>
                  </a>
                </span>
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="profileContainer__body">
            <div className="profileContainer__body-left">
              <div className="field-card">
                <span>Email</span>
                <small>{userProfile.email}</small>
              </div>
              <div className="field-card">
                <span>Work</span>
                <small>{userProfile.work}</small>
              </div>
              <div className="field-card">
                <span>Skills/Languages</span>
                <small>{userProfile.skills}</small>
              </div>
              <ul>
                <li>
                  <i>
                    <IoDocumentTextOutline />
                  </i>
                  <small>{articles.total || "0 "} posts</small>
                </li>
                <li>
                  <i>
                    <FaRegComment />
                  </i>
                  <small>{userProfile.totalComment || "0 "} comments</small>
                </li>
              </ul>
            </div>
            <div className="profileContainer__body-right">
              {articles.lists &&
                articles.lists.length > 0 &&
                articles.lists.map((post) => {
                  return (
                    <SummaryPost
                      key={post._id}
                      data={{
                        _id: post._id,
                        title: post.title,
                        linkImgCap: "",
                        tagId: post.tagId,
                        userId: post.userId,
                        updatedAt: post.updatedAt,
                        quantityComment: post.quantityComment,
                        reaction: post.reaction,
                        slug: post.slug,
                      }}
                      userLoginId={userLogin.user ? userLogin.user._id : ""}
                      deletePost={showConfirmDelete}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <GoTop />
      </div>
      {popup.isShow && (
        <BoxPopup
          title={popup.title}
          message={popup.message}
          className={popup.className}
          hiddenPopup={hiddenPopup}
          handleOnClick={confirmDelete}
          type={popup.type}
        />
      )}
    </>
  );
}

export default Profile;
