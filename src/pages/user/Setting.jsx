import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./scss/_setting.scss";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import BoxPopup from "../../components/utils/BoxPopup";
import Loading from "../../components/utils/Loading";
import authApi from "../../api/authApi";
import userApi from "../../api/userApi";
import validation from "../../utils/validations";
import { AiFillProfile } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { STORAGE_KEY } from "../../constants/storageKey";

function Setting() {
  const history = useHistory();
  const userLogin = authApi.getCurrentUser();

  if (!userLogin) {
    history.push("/");
  }
  const [inputError, setInputError] = useState({
    name: "",
    email: "",
    password: "",
    work: "",
    skills: "",
    website: "",
    location: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [userInfo, setUserInfo] = useState(() => {
    if (userLogin)
      return {
        name: userLogin.name,
        email: userLogin.email,
        website: userLogin.website,
        work: userLogin.work,
        location: userLogin.location,
        skills: userLogin.skills,
        avatarViewLink: userLogin.avatarViewLink,
      };
    return {
      name: "",
      email: "",
      website: "",
      work: "",
      location: "",
      skills: "",
      avatarViewLink: "",
    };
  });
  const [newPassword, setNewPassword] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const [popup, setPopup] = useState({
    isShow: false,
    title: "",
    className: "",
    message: "",
    type: "",
  });
  const [fieldActive, setFieldActive] = useState("profile");
  const [formError, setFormError] = useState("");

  const handleOnChange = (e) => {
    const nameField = e.target.name;
    setUserInfo({
      ...userInfo,
      [nameField]: e.target.value,
    });

    setInputError({
      ...inputError,
      name: "",
      email: "",
    });
  };

  const handleUpdate = async () => {
    const isValidEmail = validation("email", userLogin.email);
    if (isValidEmail === true) {
      try {
        const token = await authApi.getToken();
        const userUpdate = await userApi.updateInfo(
          userLogin._id,
          userInfo,
          token
        );
        console.log("update user>>>>>>", userUpdate);
        if (userUpdate.status === "success") {
          setPopup({
            isShow: true,
            message: "Update your info successfully!",
            title: "Message",
            className: "success",
            type: "",
          });

          localStorage.removeItem(STORAGE_KEY.user);
          localStorage.setItem(STORAGE_KEY.user, JSON.stringify(userUpdate.data.user));
          history.go(0);
        } else {
          if (userUpdate.message) {
            console.log(userUpdate);
            let message = "Server error....";
            if (userUpdate.message) {
              message = userUpdate.message;
            }

            setPopup({
              isShow: true,
              message: message,
              title: "Error",
              className: "error",
              type: "",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const emailError = isValidEmail.message ? isValidEmail.message : "";
      setInputError({
        ...inputError,
        email: emailError,
      });
    }
  };

  const handleSetPassword = (e) => {
    const nameField = e.target.name;
    setNewPassword({
      ...newPassword,
      [nameField]: e.target.value,
    });
    setInputError({
      ...inputError,
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    setFormError({
      ...formError,
      changePassword: "",
    });
  };

  const updateAvatar = async (e) => {
    setShowLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await userApi.uploadAvatar(userLogin._id, formData);
    if (res.status && res.status === "success") {
      setUserInfo({
        ...userInfo,
        avatarViewLink: res.data.avatarFile.linkDownload,
      });
      setShowLoading(false);
    } else {
      console.log(res);
    }
  };

  const handleChangePassword = async () => {
    const isValidPassword = validation("password", newPassword.password);
    const isValidNewPassword = validation("password", newPassword.newPassword);
    const isMatchPassword =
      newPassword.newPassword === newPassword.confirmNewPassword;
    const isMatchOldPassword = newPassword.newPassword === newPassword.password;
    if (
      isValidPassword === true &&
      isMatchPassword === true &&
      isMatchOldPassword === false &&
      isValidNewPassword === true
    ) {
      try {
        const token = await authApi.getToken();
        const updatePassword = await userApi.changePassword(
          userLogin._id,
          newPassword,
          token
        );
        if (updatePassword.status === "success") {
          userApi.clearStorage();
          history.push("/user/sign-in");
          history.go(0);
        } else {
          if (updatePassword.message) {
            let message = "Server error....";
            if (updatePassword.message) {
              message = updatePassword.message;
            }
            setPopup({
              isShow: true,
              message: message,
              title: "Error",
              className: "error",
              type: "",
            });
          }
          console.log(updatePassword);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const passwordError = isValidPassword.message
        ? isValidPassword.message
        : "";

      let newPasswordError = isValidNewPassword.message
        ? isValidNewPassword.message
        : "";
      if (isMatchPassword === false) {
        newPasswordError = "New password do not match!!";
      }
      if (isMatchOldPassword) {
        newPasswordError = "New password match old password!!";
      }
      setInputError({
        ...inputError,
        password: passwordError,
        newPassword: newPasswordError,
      });
    }
  };

  const handleFieldActive = (e) => {
    const fieldId = e.target.id;
    setFieldActive(fieldId);
  };

  const hiddenPopup = () => {
    setPopup({
      ...popup,
      isShow: false,
    });
  };

  return (
    <>
      <div className="setting">
        <div className="setting__header">
          <span>Setting for
            <small> @{userInfo.name}</small>
          </span>
        </div>
        <div className="setting__content">
          <div className="setting__content-left">
            <ul>
              <li className={fieldActive === "profile" ? "active" : ""}>
                <i style={{ color: "blue" }}>
                  <AiFillProfile />
                </i>
                <span onClick={handleFieldActive} id="profile">
                  Profile
                </span>
              </li>
              <li className={fieldActive === "account" ? "active" : ""}>
                <i style={{ color: "#b600fff0" }}>
                  <RiAccountCircleLine />
                </i>
                <span onClick={handleFieldActive} id="account">
                  Account
                </span>
              </li>
            </ul>
          </div>
          <div className="setting__content-right">
            {fieldActive !== "account" ? (
              <>
                <div className="setting__content-user">
                  <h2>User</h2>
                  <Input
                    name="name"
                    type="text"
                    value={userInfo.name}
                    label="Full name"
                    onChange={handleOnChange}
                    error={inputError}
                  />

                  <Input
                    name="email"
                    type="text"
                    value={userInfo.email}
                    label="Email"
                    onChange={handleOnChange}
                    error={inputError}
                  />
                  <div className="user-setting-avatar">
                    <span className="avatar-label">Avatar</span>
                    <div className="avatar-pic">
                      {showLoading && (
                        <Loading
                          data={{
                            type: "spin",
                            color: "blue",
                            width: "32px",
                            height: "32px",
                          }}
                        />
                      )}

                      {!showLoading && (
                        <img
                          src={
                            userInfo.avatarViewLink || "/images/default.jpeg"
                          }
                          alt=""
                        />
                      )}
                      <span>
                        {/* <button>Change</button> */}
                        <input type="file" onChange={updateAvatar} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="setting__content-basic">
                  <h2>Basic</h2>
                  <Input
                    name="website"
                    type="text"
                    value={userInfo.website}
                    label="Website URL"
                    onChange={handleOnChange}
                    error={inputError}
                  />

                  <Input
                    name="location"
                    type="text"
                    value={userInfo.location}
                    label="Location"
                    onChange={handleOnChange}
                    error={inputError}
                  />

                  <Input
                    name="work"
                    type="text"
                    value={userInfo.work}
                    label="Work"
                    onChange={handleOnChange}
                    error={inputError}
                  />
                  <div className="content-textarea">
                    <label>Skills/Languages</label>
                    <textarea
                      name="skills"
                      rows="3"
                      placeholder="Any languages, frameworks..."
                      value={userInfo.skills}
                      onChange={handleOnChange}
                    ></textarea>
                  </div>

                  {formError && formError.info && (
                    <div className="setting__content-error">
                      <span className="error-message">{formError.info}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="setting__content-changePassword">
                <h2>Set new password</h2>
                <Input
                  name="password"
                  type="password"
                  value={newPassword.password}
                  label="Current password"
                  onChange={handleSetPassword}
                  error={inputError}
                />

                <Input
                  name="newPassword"
                  type="password"
                  value={newPassword.newPassword}
                  label="Password"
                  onChange={handleSetPassword}
                  error={inputError}
                />

                <Input
                  name="confirmNewPassword"
                  type="password"
                  value={newPassword.confirmNewPassword}
                  label="Confirm new password"
                  onChange={handleSetPassword}
                  error={inputError}
                />
                {formError && formError.changePassword && (
                  <div className="setting__content-error">
                    <span className="error-message">
                      {formError.changePassword}
                    </span>
                  </div>
                )}

                <Button
                  type="button"
                  label="Set New Password"
                  onClick={handleChangePassword}
                  className="btn btn-primary"
                />
              </div>
            )}

            {fieldActive !== "account" && (
              <div className="setting__content-footer">
                <Button
                  type="button"
                  label="Save Profile Information"
                  onClick={handleUpdate}
                  className="btn btn-primary btn-fullwidth"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {popup.isShow && (
        <BoxPopup
          title={popup.title}
          message={popup.message}
          className={popup.className}
          hiddenPopup={hiddenPopup}
          handleOnClick={hiddenPopup}
          type={popup.type}
        />
      )}
    </>
  );
}

export default Setting;
