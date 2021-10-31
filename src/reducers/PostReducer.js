import { postAction } from "../constants/actionType";

const postReducer = (stage, action) => {
  const { type, payload } = action;

  switch (type) {
    case postAction.SAVE_LIST_POST:
      return {
          ...stage,
          lists: payload.posts,
          total: payload.total
      };
    case postAction.ADD_POST:
      stage.lists.unshift(payload.post);
      return {...stage, total: stage.total + 1};
    case postAction.DELETE_POST:
      const newList = stage.lists.filter((post) => post._id !== payload.postId);
      return {...stage, lists: newList, total: stage.total - 1};
    default:
      return stage;
  }
};

export default postReducer;
