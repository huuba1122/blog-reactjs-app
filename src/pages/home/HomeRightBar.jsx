import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import postApi from "../../api/postApi";
import { TagContext } from '../../contexts/TagContext';
// import { STORAGE_KEY } from "../../constants/storageKey";

import "./scss/_rightBar.scss";

function HomeRightBar() {
  //load context tag
  const { tags } = useContext(TagContext);

  // For this components only
  const [newsPosts, setNewsPosts] = useState([]);
  const [helpPosts, setHelpPosts] = useState([]);

  useEffect(() => {
    // const tagList = JSON.parse(localStorage.getItem(STORAGE_KEY.tags));
    const getPostNews = async () => {
      try {
        const newsTag = tags.filter((tag) => {
          return tag.name === "#news";
        });
        // console.log('tags>>>>>', newsTag);
        if (newsTag[0]) {
          const getNewsPostList = await postApi.get({
            page: 1,
            limit: 5,
            field: "tagId",
            f_value: newsTag[0]._id,
          });
          // console.log('news post>>>>>>', getNewsPostList);
          if (getNewsPostList.status === "success") {
            setNewsPosts(getNewsPostList.data.posts);
          } else {
            console.log(getNewsPostList);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPostNews();
  }, [tags]);

  useEffect(() => {
    // const tagList = JSON.parse(localStorage.getItem(STORAGE_KEY.tags));
    const getHelpPost = async () => {
      try {
        const helpTag = tags.filter((tag) => {
          return tag.name === "#help";
        });
        if (helpTag[0]) {
          const getHelpPostList = await postApi.get({
            page: 1,
            limit: 5,
            field: "tagId",
            f_value: helpTag[0]._id,
          });
          // console.log('helps post>>>>>>', getHelpPostList);
          if (getHelpPostList.status === "success") {
            setHelpPosts(getHelpPostList.data.posts);
          } else {
            console.log(getHelpPostList);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHelpPost();
  }, [tags]);

  return (
    <div className="rightBar">
      <Card tag="news" articles={newsPosts} />
      <Card tag="help" articles={helpPosts} />
    </div>
  );
}

export default HomeRightBar;
