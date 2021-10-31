import { popupAction } from "../constants/actionType";

const initialValue = {
  isShow: true,
  postId: "",
  message: "",
  title: "",
  className: "",
  type: "",
};

const popupReducer = (stage = initialValue, action) => {
  const { type, payload } = action;

  switch (type) {
    case popupAction.SUCCESS:
      return {
        ...stage,
        isShow: true,
        message: payload.message,
        title: payload.title,
        className: "success",
        type: "",
      };
    case popupAction.ERROR:
      return {
        ...stage,
        isShow: true,
        message: payload.message,
        title: payload.title,
        className: "error",
        type: "",
      };
    case popupAction.CONFIRM:
      return {
        ...stage,
        isShow: true,
        className: "error",
        type: "confirm",
        message: payload.message,
        title: payload.title,
        postId: payload.postId,
      };
    case popupAction.HIDDEN:
      return {
        ...stage,
        isShow: false,
      };
    default:
      return stage;
  }
};

export default popupReducer
