import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { TagContext } from "../../contexts/TagContext";
import { FaHandshake } from "react-icons/fa";
import { IoLogoTwitter, IoLogoFacebook, IoLogoGithub } from "react-icons/io";
import { RiInstagramFill, RiTwitchLine } from "react-icons/ri";
import { FiHexagon } from "react-icons/fi";
import {
  FcHome,
  FcAbout,
  FcReading,
  FcBriefcase,
  FcDisclaimer,
  FcBusinessContact,
} from "react-icons/fc";

import "./scss/_leftBar.scss";

function HomeLeftBar() {

  const { tags } = useContext(TagContext);
  return (
    <>
      <aside className="leftBar">
        <nav className="leftBar__menu">
          <ul>
            <li>
              <Link to="/home">
                <i>
                  <FcHome />
                </i>
                <span>Home</span>
              </Link>
            </li>
            <li className="show-mobile">
              <Link to="/user/sign-in" className="login-icon">
                <i>
                  <FaHandshake />
                </i>
                Sign In/Up
              </Link>
            </li>
            <li>
              <Link to="/reading">
                <i>
                  <FcReading />
                </i>
                Reading List
              </Link>
            </li>
            <li>
              <Link to="/about">
                <i>
                  <FcAbout />
                </i>
                About
              </Link>
            </li>
            <li>
              <Link to="/privacy">
                <i>
                  <FcBriefcase />
                </i>
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="/terms">
                <i>
                  <FcDisclaimer />
                </i>
                Terms of use
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <i>
                  <FcBusinessContact />
                </i>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="leftBar__social">
          <a href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <IoLogoTwitter />
            </i>
          </a>
          <a href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <IoLogoFacebook />
            </i>
          </a>
          <a href="https://github.com/huuba1122/Blog-NodeJs-Reactjs"
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <IoLogoGithub />
            </i>
          </a>
          <a href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <RiInstagramFill />
            </i>
          </a>
          <a href="https://www.twitch.tv/"
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <RiTwitchLine />
            </i>
          </a>
        </div>
        <nav className="leftBar__tags">
          <header>
            <h4>My Tags</h4>
            <i>
              <FiHexagon />
            </i>
          </header>
          <ul>
            {tags.map((tag) => {
              return (
                <li key={tag._id}>
                  <Link to="/search">{tag.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default HomeLeftBar;
