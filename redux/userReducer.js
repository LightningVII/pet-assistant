import { SAVE_USER } from "../redux/userActions";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SAVE_USER:
      return {
        ...state,
        user: payload?.content
      };

    default:
      return state;
  }
};
