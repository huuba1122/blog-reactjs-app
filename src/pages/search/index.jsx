import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SummaryPost from "../../components/post/SummaryPost";
import GoTop from "../../components/utils/GoTop";
import postApi from "../../api/postApi";
import { FiSearch } from "react-icons/fi";
import { STORAGE_KEY } from "../../constants/storageKey";

import "./scss/_search.scss";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const history = useHistory();
  const queryParams = useQuery();
  const searchParamString = queryParams.get("q");
  const [userPosts, setUserPosts] = useState([]);
  const [totalPost, setTotalPost] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    sort: "createdAt",
    s_type: "desc",
  });
  const [elementActive, setElementActive] = useState("latest");
  const [tagActive, setTagActive] = useState("");
  const tags = JSON.parse(localStorage.getItem(STORAGE_KEY.tags));
  useEffect(() => {
    const getUserPost = async (params) => {
      // console.log(params);
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
    getUserPost({
      ...params,
      q: searchParamString,
    });
  }, [params, searchParamString]);

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

  const sortArticle = (e) => {
    const idLinkActive = e.target.id;
    setElementActive(idLinkActive);

    if (idLinkActive === "feed") {
      setParams({
        ...params,
        sort: "quantityComment",
      });
    }

    if (idLinkActive === "latest") {
      setParams({
        ...params,
        sort: "createdAt",
      });
    }

    if (idLinkActive === "top") {
      setParams({
        ...params,
        sort: "reaction.quantity",
      });
    }
  };

  const searchPostTag = (e) => {
    const idTagActive = e.target.id;
    if (tagActive === idTagActive) {
      setTagActive("");
      setParams({
        ...params,
        field: "",
        f_value: "",
      });
    } else {
      setTagActive(idTagActive);
      const tagId = tags.filter((tag) => tag.name === idTagActive);
      if (tagId.length > 0) {
        setParams({
          ...params,
          field: "tagId",
          f_value: tagId[0]._id,
        });
      }
    }
  };

  const handleSubmitFormSearch = (e) => {
    e.preventDefault();
    const q = e.target.q.value;
    const url = `/search?q=${q}`;
    history.push(url);
  };

  return (
    <div className="searchContainer">
      {/* <div className="searchContainer"> */}

      <div className="searchContainer__header">
        <div className="searchFormMobile show-mobile">
          <form onSubmit={handleSubmitFormSearch}>
            <div className="searchFormMobile__content">
              <input type="text" name="q" placeholder="Search..." />
              <button type="submit">
                <FiSearch />
              </button>
            </div>
          </form>
        </div>
        <h2>Search result for: {searchParamString}</h2>
      </div>
      <div className="searchContainer__body">
        <div className="searchContainer__body-left">
          <ul>
            <li>
              <span
                id="latest"
                className={elementActive === "latest" ? "active" : ""}
                onClick={sortArticle}
              >
                Latest
              </span>
            </li>
            <li>
              <span
                id="feed"
                className={elementActive === "feed" ? "active" : ""}
                onClick={sortArticle}
              >
                Feed
              </span>
            </li>
            <li>
              <span
                id="top"
                className={elementActive === "top" ? "active" : ""}
                onClick={sortArticle}
              >
                Top
              </span>
            </li>
          </ul>
          <ul className="search-tagList">
            {tags.length > 0 &&
              tags.map((tag) => {
                return (
                  <li
                    key={tag._id}
                    className={tagActive === tag.name ? "active" : ""}
                    id={tag.name}
                    onClick={searchPostTag}
                  >
                    {tag.name}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="searchContainer__body-right">
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
                />
              );
            })}

          {userPosts.length <= 0 && (
            <div className="empty-result">
              <h2>Oop...No post founded!!</h2>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
      <GoTop />
    </div>
  );
}

export default SearchPage;
