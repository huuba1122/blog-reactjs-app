import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./scss/_userCard.scss";

UserCard.propTypes = {
  user: PropTypes.object,
};

function UserCard(props) {
  const { user } = props;
  return (
    <div className="userCard">
      <header>
        <img src={user.avatarViewLink || "/images/default.jpeg"} alt="" />
        <span>
          <Link to={`/user/profile/${user._id}`}>
            {user.name}
          </Link>
          </span>
      </header>
      <div className="follow">
        <button>Follow</button>
      </div>
      <div className="userCard__content">
        <ul>
          <li>
            <span>Email</span>
            <small>{user.email}</small>
          </li>
          <li>
            <span>Website</span>
            <small>{user.website}</small>
          </li>
          {user.Work && (
            <li>
              <span>Work</span>
              <small>{user.Work}</small>
            </li>
          )}

          {user.location && (
            <li>
              <span>Location</span>
              <small>{user.location}</small>
            </li>
          )}

          {user.skills && (
            <li>
              <span>Skills/Languages</span>
              <small>{user.skills}</small>
            </li>
          )}

          <li>
            <span>Joined</span>
            <small>
              {new Date(user.createdAt).toLocaleDateString("default", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </small>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserCard;
