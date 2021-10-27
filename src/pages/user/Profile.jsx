import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SummaryPost from "../../components/post/SummaryPost";
import BoxPopup from "../../components/utils/BoxPopup";
import GoTop from "../../components/utils/GoTop";
import postApi from "../../api/postApi";
import authApi from "../../api/authApi";
import userApi from "../../api/userApi";
import {
  FaExternalLinkAlt,
  FaBirthdayCake,
  FaRegComment,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";

import "./scss/_profile.scss";

function Profile() {
  const { userId } = useParams();
  const userLogin = authApi.getCurrentUser();
  const [userPosts, setUserPosts] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [totalPost, setTotalPost] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    sort: "createdAt",
    s_type: "desc",
    field: "userId",
    f_value: userId,
  });
  const [popup, setPopup] = useState({
    isShow: false,
    title: "",
    className: "",
    message: "",
    postId: "",
    type: ""
  });

  useEffect(() => {
    const getUserPost = async (params) => {
      try {
        const posts = await postApi.get(params);
        // console.log("user post>>>>>>>>>", posts);
        if (posts.status === "success") {
          setUserPosts(posts.data.posts);
          setTotalPost(posts.data.total);
        } else {
          console.log("error>>>", posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserPost(params);
  }, [params]);

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
    setPopup({
      isShow: true,
      title: "Delete",
      message: "Do you want to delete this post!",
      className: "error",
      postId: postId,
      type: "confirm"
    });
  };

  const confirmDelete = async () => {
    const postId = popup.postId;
    if (!postId) return false;
    setPopup({
      ...popup,
      isShow: false,
    });
    try {
      const token = await authApi.getToken();
      const res = await postApi.deletePost(postId, token);
      // console.log('call delete post>>>>>>', res);
      if (res.status === "success") {
        const newPostList = userPosts.filter((post) => {
          return post._id !== postId;
        });
        setUserPosts(newPostList);
        setTotalPost(totalPost -1);
        setPopup({
          isShow: true,
          postId: "",
          message: "Delete successfully!!",
          title: "Message",
          className: "success",
          type: ''
        });
      } else {
        console.log(res);
        let message = "Server error....";
        if (res.message) {
          message = res.message;
        }

        setPopup({
          isShow: true,
          postId: "",
          message: message,
          title: "Error",
          className: "error",
          type:''
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const html = document.documentElement;
      const body = document.body;
      const windowHeight = window.innerHeight || html.offsetHeight;

      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      const windowBottom = windowHeight + window.pageYOffset;

      if (windowBottom >= docHeight - 200) {
        if (params.limit < totalPost) {
          // console.log("windowBottom>>.", windowBottom);
          console.log("limit>>.", params.limit);
          setParams({
            ...params,
            limit: params.limit + 10,
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [params, totalPost]);

  const hiddenPopup = () => {
    setPopup({
      ...popup,
      isShow: false,
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
                  <small>{totalPost} posts</small>
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
              {userPosts.length > 0 &&
                userPosts.map((post) => {
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
                      userLoginId={userLogin ? userLogin._id : ""}
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
