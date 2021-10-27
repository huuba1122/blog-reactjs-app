import React from "react";
import PropTypes from "prop-types";
import "./scss/_button.scss";

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
};

Button.defaultProps = {
  type: '',
  className: '',
  label: '',
  onClick: null
}

function Button(props) {
  const { type, label, className, onClick } = props;
  return (
    <button className={className} type={type} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
