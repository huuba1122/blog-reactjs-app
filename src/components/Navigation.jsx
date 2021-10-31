import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import authApi from "../api/authApi";
import userApi from "../api/userApi";
import { FaDev } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
// import { RiNotificationLine } from "react-icons/ri";
// import { BiMessageRoundedCheck } from "react-icons/bi";
import { AuthContext } from '../contexts/AuthContext';
import { authAction } from '../constants/actionType';

Navigation.propTypes = {
  openHumburger: PropTypes.func
};

Navigation.defaultProps = {
  openHumburger: null
};

function Navigation(props) {
  const history = useHistory();
 // Load context auth
 const { userLogin, dispatch } = useContext(AuthContext);
 
  // For this components only
  const [searchText, setSearchText] = useState("");
  const showHamburger = () => {
    props.openHumburger();
  };

  const logout = async () => {
    const response = await authApi.logout();
    if (response.status && response.status === "success") {
      userApi.clearStorage();
      history.push("/");
      dispatch({
        type: authAction.USER_LOGOUT,
        payload: null
      })
    } else {
      console.log(response);
    }
  };

  const handleSubmitFormSearch = (e) => {
    e.preventDefault();
    const q = e.target.q.value;
    setSearchText(q);
    const url = `/search?q=${searchText}`;
    history.push(url);
  };

  const handleInputSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const showFormSearchMobile = () => {
    setSearchText('');
    const url = `/search?q=`;
    history.push(url);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <button
            className="header-container__humburger-menu header-icon show-mobile"
            onClick={showHamburger}
          >
            <AiOutlineMenu />
          </button>
          <Link to="/" className="header-container__logo">
            <FaDev />
          </Link>
          <div className="header-container__search">
            <form onSubmit={handleSubmitFormSearch}>
              <div className="header-container__search--content">
                <input
                  type="text"
                  className="header-container__search--input"
                  name="q"
                  placeholder="Search..."
                  onChange={handleInputSearch}
                />
                <button type="submit" className="search-icon">
                  <FiSearch />
                </button>
              </div>
            </form>
          </div>

          <div className="header-container__right">
            <button className="header-icon search-icon show-mobile" onClick={showFormSearchMobile}>
              <FiSearch />
            </button>
            {(userLogin && userLogin.user) ? (
              <>
                <Link to="/post/create" className="header-link hidden-mobile">
                  Create post
                </Link>
                {/* <button className="header-icon">
                  <BiMessageRoundedCheck />
                </button>
                <button className="header-icon">
                  <RiNotificationLine />
                </button> */}
                <span>
                  <img
                    src={userLogin.user.avatarViewLink || "/images/default.jpeg"}
                    alt="profile avatar"
                  />
                  <ul className="dropdown-profile">
                    <li>
                      <Link to={"/user/profile/" + userLogin.user._id}>
                        <div className="u-name">{userLogin.user.name}</div>
                        <small className="u-name-id">
                          @{userLogin.user.name}
                        </small>
                      </Link>
                    </li>
                    {/* <li>
                    <Link to="/user">Dashboard</Link>
                  </li> */}
                    <li>
                      <Link to="/post/create">Create post</Link>
                    </li>
                    <li>
                      <Link to="/user/setting">Setting</Link>
                    </li>
                    <li>
                      <span onClick={logout}>Sign out</span>
                    </li>
                  </ul>
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/user/sign-in"
                  className="header-btn__login header-link hidden-mobile"
                >
                  Login
                </Link>
                <Link to="/user/sign-up" className="header-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Navigation;
