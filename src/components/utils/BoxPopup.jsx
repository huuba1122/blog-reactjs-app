import React from "react";
import PropTypes from "prop-types";
import "./scss/_popup.scss";

import { GrFormClose } from "react-icons/gr";

BoxPopup.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string
};

function BoxPopup(props) {
    const {title, message, className } = props;
    console.log(props);
    const handleOnClick = () => {
      if(props.type === 'confirm'){
        props.handleOnClick();
      } else {
        props.hiddenPopup();
      }
    }

  return (
    <>
        <div className="popup-box">
          <div className="popup-box__content">
            <div className="popup-box__content-header">
              <span className={className}>{title}</span>
              <button onClick={() => props.hiddenPopup()}>
                <GrFormClose />
              </button>
            </div>
            <div className="popup-box__content-message">
              <span>{message}</span>
            </div>
            <div className="popup-box__content-footer">
              <button onClick={handleOnClick}>Ok</button>
            </div>
          </div>
          <div className="popup-box__overlay" onClick={() => props.hiddenPopup()}></div>
        </div>
    </>
  );
}

export default BoxPopup;
