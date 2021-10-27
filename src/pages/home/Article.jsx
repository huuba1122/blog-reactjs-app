import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { RiHeart2Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import "./scss/_article.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

Article.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  linkImgCap: PropTypes.string,
  tagId: PropTypes.array,
  slug: PropTypes.string,
  updatedAt: PropTypes.string,
  userId: PropTypes.object,
  quantityComment: PropTypes.number,
  reaction: PropTypes.object
};

function Article(props) {
  const {
    _id,
    title,
    linkImgCap,
    tagId,
    updatedAt,
    quantityComment,
    reaction,
    userId,
    slug,
  } = props.data;

  return (
    <article className="article">
      <Link
        to={`/post/${slug}/${_id}`}
        className="article__image"
        style={{ backgroundImage: `url(${linkImgCap})` }}
      >
        &nbsp;
      </Link>

      <div className="article__details">
        <div className="article__details--user">
          <div className="u-avatar">
            <img src={userId.avatarViewLink || '/images/default.jpeg'} alt="avatar" />
          </div>
          <div className="u-info">
            <Link to={`/user/profile/${userId._id}`} className="u-name">
              <span>{userId.name}</span>
            </Link>
            <Link to={`/post/${slug}/${_id}`}>
              <span className="time">
                {new Date(updatedAt).toLocaleDateString("default", {
                  day: "numeric",
                  month: "long",
                })}
                &nbsp;({dayjs(updatedAt).fromNow()})
              </span>
            </Link>
          </div>
        </div>
        <div className="a-details">
          <Link to={`/post/${slug}/${_id}`}>
            <h2>{title}</h2>
          </Link>

          <div className="a-tag">
            {tagId.map((tag) => {
              return (
                <Link to="/search" key={tag._id}>
                  {tag.name}
                </Link>
              );
            })}
          </div>

          <div className="additional-details">
            <div className="reactions">
              <Link to={`/post/${slug}/${_id}`}>
                <i>
                  <RiHeart2Line />
                </i>
                &nbsp;
                {reaction.quantity}
                &nbsp;
                <span className="hidden-mobile">reactions</span>
              </Link>
              <Link to={`/post/${slug}/${_id}`}>
                <FaRegComment />
                &nbsp;
                {quantityComment > 0 ? (
                  <span>
                    {quantityComment}
                    &nbsp;
                    <span className="hidden-mobile">comments</span>
                  </span>
                ) : null}
                {quantityComment === 0 ? (
                  <span>
                    <span>{quantityComment}</span>
                    &nbsp;
                    <span className="hidden-mobile">Add comment</span>
                  </span>
                ) : null}
              </Link>
            </div>

            <div className="save">
              {/* <small>1 min read</small> */}
              {/* <button>Save</button> */}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Article;
