import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import authApi from "../../api/authApi";
import { STORAGE_KEY } from "../../constants/storageKey";
import { authAction } from '../../constants/actionType';
import validation from "../../utils/validations";
import { AuthContext } from '../../contexts/AuthContext';

import "./scss/_login.scss";

function Login() {
  const history = useHistory();
  // load context auth
  const { dispatch } = useContext(AuthContext);
  // For this components only
  const [user, setUser] = useState({
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

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleOnClick = async () => {
    setFormError("");
    const isValidEmail = validation("email", user.email);
    const isValidPassword = validation("password", user.password);
    if (isValidEmail === true && isValidPassword === true) {
      setInputError({ email: "", password: "" });
      const response = await authApi.login(user);
      if (response.status === "success") {
        const expiredTime = Date.now() + (+response.expiredTime) * 1000;
        const expiredRefreshTime = Date.now() + (+response.expiredRefreshTime) * 1000;
        // console.log('login success>>>>', response);
        window.localStorage.setItem(STORAGE_KEY.token, response.accessToken);
        window.localStorage.setItem(STORAGE_KEY.refreshToken, response.refreshToken);
        window.localStorage.setItem(STORAGE_KEY.expiredTime, expiredTime);
        window.localStorage.setItem(STORAGE_KEY.expiredRefreshTime, expiredRefreshTime);
        // window.localStorage.setItem(STORAGE_KEY.user, JSON.stringify(response.user));
        dispatch({
          type: authAction.SAVE_USER_LOGIN,
          payload: {
            user: response.user
          }
        })
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
          value={user.email}
          error={inputError}
        />
        <Input
          label="Password"
          name="password"
          onChange={handleOnChange}
          type="password"
          value={user.password}
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
