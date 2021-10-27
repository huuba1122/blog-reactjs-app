import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import authApi from "../../api/authApi";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import validation from "../../utils/validations";
import BoxPopup from "../../components/utils/BoxPopup";
import "./scss/_login.scss";

function Register() {
  const history = useHistory();
  const [userRegister, setUserRegister] = useState({});
  const [popup, setPopup] = useState({
      isShow: false,
      title: '',
      className: '',
      message: '',
      type: ''
  });
  const [inputError, setInputError] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");
  const handleOnChange = (e) => {
    setInputError({});
    const { name, value } = e.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
  };

  const handleOnClick = async () => {
    setFormError("");
    const isValidEmail = validation("email", userRegister.email);
    const isValidName = validation("name", userRegister.name);
    const isValidPassword = validation("password", userRegister.password);
    const isValidConfirmPassword =
      userRegister.password === userRegister.confirmPassword;
    if (
      isValidEmail === true &&
      isValidName === true &&
      isValidPassword === true &&
      isValidConfirmPassword
    ) {
      const response = await authApi.register(userRegister);
      if (response.status === "success") {
        history.push("/user/sign-in");
      } else {
        setPopup({
            isShow: true,
            message: response.message,
            title: 'Error!',
            className: "error"
        });
      }
    } else {
      const emailError = isValidEmail.message ? isValidEmail.message : "";
      const nameError = isValidName.message ? isValidName.message : "";
      const passwordError = isValidPassword.message
        ? isValidPassword.message
        : "";
      const confirmPasswordError = isValidConfirmPassword
        ? ""
        : "The password confirmation does not match!";
      const newError = {
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      };
      setInputError(newError);
    }
  };

  const hiddenPopup = () => {
    setPopup({
          ...popup,
          isShow: false
      })
  };

  return (
    <>
      <div className="login-form">
        <div className="login-form__header">
          <h2>Welcome to DEV Community</h2>
          <span>
            <Link to="/">DEV Community </Link>
            is a community of 716,735 amazing developers
          </span>
        </div>
        <form>
          <Input
            label="Name"
            name="name"
            onChange={handleOnChange}
            type="text"
            value={userRegister.name}
            error={inputError}
          />
          <Input
            label="Email"
            name="email"
            onChange={handleOnChange}
            type="text"
            value={userRegister.email}
            error={inputError}
          />
          <Input
            label="Password"
            name="password"
            onChange={handleOnChange}
            type="password"
            value={userRegister.password}
            error={inputError}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleOnChange}
            type="password"
            value={userRegister.confirmPassword}
            error={inputError}
          />
          <Button
            label="Continue"
            className="btn btn-primary btn-lg"
            onClick={handleOnClick}
            type="button"
          />
        </form>
        {formError && (
          <div className="form-error">
            <span className="error-message">{formError}</span>
          </div>
        )}

        <div className="login-redirect">
          <span>
            Already have an account?
            <Link to="/user/sign-in"> Log in</Link>.
          </span>
        </div>
      </div>
      {popup.isShow && 
        <BoxPopup  
            title={popup.title}
            message={popup.message}
            className={popup.className}
            hiddenPopup={hiddenPopup}
            handleOnClick = {hiddenPopup}
            type={popup.type}
        />
        }
    </>
  );
}

export default Register;
