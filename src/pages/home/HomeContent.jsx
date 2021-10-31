import React, { useState, useEffect, useReducer } from "react";
import Article from "./Article";
import ArticleLoading from "./ArticleLoading";
import "./scss/_content.scss";
import postApi from "../../api/postApi";
import PostReducer from "../../reducers/PostReducer";
import { postAction } from "../../constants/actionType";

function HomeContent() {
  // const [articles, setArticles] = useState(null);
  const [articles, dispatch ] = useReducer(PostReducer, {});
  const [elementActive, setElementActive] = useState("latest");
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    sort: "createdAt",
    s_type: "desc",
  });

  useEffect(() => {
    const getPostList = async () => {
      // console.log('params>>>>', params);
      try {
        const res = await postApi.get(params);
        if (res.status === "success") {
          // console.log('getPostList>>>>', res);
          // setArticles(res.data.posts);
          dispatch({
            type: postAction.SAVE_LIST_POST,
            payload: {
              posts: res.data.posts,
              total: res.data.total
            }
          });
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPostList();
  }, [params]);

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
        // console.log("windowBottom>>.", windowBottom);
        // console.log("limit>>.", params.limit);
        setParams({
          ...params,
          limit: params.limit + 10,
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [params]);

  return (
    <main className="home-content">
      <header className="home-content__header">
        <span
          id="latest"
          className={elementActive === "latest" ? "active" : ""}
          onClick={sortArticle}
        >
          Latest
        </span>
        <span
          id="feed"
          className={elementActive === "feed" ? "active" : ""}
          onClick={sortArticle}
        >
          Feed
        </span>
        <span
          id="top"
          className={elementActive === "top" ? "active" : ""}
          onClick={sortArticle}
        >
          Top
        </span>
      </header>
      <div className="home-content__articles">
        {(articles.lists && articles.lists.length > 0) &&
          articles.lists.map((article) => {
            return <Article key={article._id} data={article} />;
          })}

        {(!articles.lists || articles.lists.length < 1) &&
          [1, 2, 3, 4, 5].map((tag, idx) => {
            return <ArticleLoading key={idx} />;
          })}
      </div>
    </main>
  );
}

export default HomeContent;
