import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./scss/_header.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

Header.propTypes = {
  title: PropTypes.string,
  linkImgCap: PropTypes.string,
  tagId: PropTypes.array,
  userId: PropTypes.object,
  updatedAt: PropTypes.string
};

function Header(props) {
  const {
    title,
    linkImgCap,
    tagId,
    userId,
    updatedAt
  } = props.data;

  return (
    <div className="Header">
      {linkImgCap && 
        <Link
        to="/"
        className="Header__image"
        style={{ backgroundImage: `url(${linkImgCap})` }}
        >
          &nbsp;
        </Link>
      } 

      <div className="Header__details">
        <div className="Header__details-user">
          <div className="u-avatar">
            <img src={userId.avatarViewLink ? userId.avatarViewLink : '/images/default.jpeg'} alt="avatar" />
          </div>
          <div className="u-info">
            <Link to={`/user/profile/${userId._id}`}  className="u-name">
              <span>{userId.name}</span>
            </Link>
              <span className="time">
                {new Date(updatedAt).toLocaleDateString("default", {
                  day: "numeric",
                  month: "long",
                })}
                &nbsp;({dayjs(updatedAt).fromNow()})
              </span>
          </div>
        </div>
        <div className="a-details">
            <h2>{title}</h2>

          <div className="a-tag">
            {tagId.map((tag) => {
              return (
                <span to="/post" key={tag._id}>
                  {tag.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
