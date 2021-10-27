import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import authApi from "../../api/authApi";
import { STORAGE_KEY } from "../../constants/storageKey";
import validation from "../../utils/validations";

import "./scss/_login.scss";

Login.prototype = {
    isLogged: PropTypes.func,
};

Login.defaultProps = {
    isLogged: null,
};

function Login(props) {
  const history = useHistory();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [inputError, setInputError] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleOnClick = async () => {
    setFormError("");
    const isValidEmail = validation("email", userLogin.email);
    const isValidPassword = validation("password", userLogin.password);
    if (isValidEmail === true && isValidPassword === true) {
      setInputError({ email: "", password: "" });
      const response = await authApi.login(userLogin);
      if (response.status === "success") {
        const expiredTime = Date.now() + (+response.expiredTime) * 1000;
        const expiredRefreshTime = Date.now() + (+response.expiredRefreshTime) * 1000;
        console.log(new Date(expiredTime));
        window.localStorage.setItem(STORAGE_KEY.token, response.accessToken);
        window.localStorage.setItem(STORAGE_KEY.refreshToken, response.refreshToken);
        window.localStorage.setItem(STORAGE_KEY.expiredTime, expiredTime);
        window.localStorage.setItem(STORAGE_KEY.expiredRefreshTime, expiredRefreshTime);
        window.localStorage.setItem(STORAGE_KEY.user, JSON.stringify(response.user));
        props.isLogged();
        history.push("/");
      } else {
        setFormError(response.message);
      }
    } else {
      const emailError = isValidEmail.message ? isValidEmail.message : "";
      const passwordError = isValidPassword.message
        ? isValidPassword.message
        : "";
      const newError = {
        email: emailError,
        password: passwordError,
      };
      setInputError(newError);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__header">
        <h2>Welcome to DEV Community</h2>
        <span>
          <Link to="/">DEV Community </Link>
          is a community of 716,735 amazing developers
        </span>
      </div>
      <div className="login-form__hr">
        <span>Have a password? Continue with your email address</span>
      </div>
      <form>
        <Input
          label="Email"
          name="email"
          onChange={handleOnChange}
          type="text"
          value={userLogin.email}
          error={inputError}
        />
        <Input
          label="Password"
          name="password"
          onChange={handleOnChange}
          type="password"
          value={userLogin.password}
          error={inputError}
        />
        <Button
          label="Continue"
          className="btn btn-primary btn-lg"
          onClick={handleOnClick}
          type="button"
        />
        <div className="form-error">
          {formError && <span className="error-message">{formError}</span>}
        </div>

        <div className="forgot-password">
          <span>I forgot my password</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
