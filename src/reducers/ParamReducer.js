import { paramAction } from "../constants/actionType";

const paramReducer = (stage, action) => {
  const { type, payload } = action;

  switch (type) {
    case paramAction.SET_PAGINATION:
      return { ...stage, limit: payload.limit };
    case paramAction.SET_SORT:
      return { ...stage, sort: payload.sort, s_type: payload.s_type };
    default:
      return stage;
  }
};

export default paramReducer;
