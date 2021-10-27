import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./scss/_card.scss";

Card.propTypes = {
  tag: PropTypes.string,
  articles: PropTypes.array,
};

Card.defaultProps = {
  tag: "",
  articles: [],
};

function Card(props) {
  const { tag, articles } = props;
  return (
    <div className="card">
      <header className="card__header">
        <Link to="/news">#{tag}</Link>
      </header>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article._id}>
              <>
                <Link to={`/post/${article.slug}`}>{article.title}</Link>
                {article.quantityComment ? (
                  <small>{article.quantityComment} comments</small>
                ) : (
                  <span>New</span>
                )}
              </>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Card;
