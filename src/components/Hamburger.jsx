import React from "react";
import PropTypes from "prop-types";
import { GrFormClose } from "react-icons/gr";
import { FaHandshake } from "react-icons/fa";
import { IoLogoTwitter, IoLogoFacebook, IoLogoGithub } from "react-icons/io";
import { RiInstagramFill, RiTwitchLine } from "react-icons/ri";
import {
  FcHome,
  FcAbout,
  FcReading,
  FcBriefcase,
  FcDisclaimer,
  FcBusinessContact,
} from "react-icons/fc";

Hamburger.propTypes = {
  closeHumburger: PropTypes.func,
};

function Hamburger(props) {
  const hiddenHumburger = () => {
    props.closeHumburger(false);
  };

  return (
    <div className="hamburger">
      <div className="hamburger-content">
        <div className="hamburger-content__header">
          <h3>DEV community</h3>
          <button onClick={hiddenHumburger}>
            <GrFormClose />
          </button>
        </div>
        <div className="hamburger-content__items">
          <div className="leftBar__menu">
            <ul>
              <li>
                <a href="/home">
                  <i>
                    <FcHome />
                  </i>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/login" className="login-icon">
                  <i>
                    <FaHandshake />
                  </i>
                  Sign In/Up
                </a>
              </li>
              <li>
                <a href="/reading">
                  <i>
                    <FcReading />
                  </i>
                  Reading List
                </a>
              </li>
              <li>
                <a href="/about">
                  <i>
                    <FcAbout />
                  </i>
                  About
                </a>
              </li>
              <li>
                <a href="/privacy">
                  <i>
                    <FcBriefcase />
                  </i>
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="/terms">
                  <i>
                    <FcDisclaimer />
                  </i>
                  Terms of use
                </a>
              </li>
              <li>
                <a href="/contact">
                  <i>
                    <FcBusinessContact />
                  </i>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="leftBar__socials">
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <i>
                <IoLogoTwitter />
              </i>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i>
                <IoLogoFacebook />
              </i>
            </a>
            <a
              href="https://github.com/huuba1122/Blog-NodeJs-Reactjs"
              target="_blank"
              rel="noreferrer"
            >
              <i>
                <IoLogoGithub />
              </i>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i>
                <RiInstagramFill />
              </i>
            </a>
            <a href="https://www.twitch.tv/" target="_blank" rel="noreferrer">
              <i>
                <RiTwitchLine />
              </i>
            </a>
          </div>
        </div>
      </div>
      <div className="overlay" onClick={hiddenHumburger}></div>
    </div>
  );
}

export default Hamburger;
