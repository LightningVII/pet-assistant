import { SAVE_MESSGAGES } from "./messageActions";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SAVE_MESSGAGES:
      return {
        ...state,
        messages: payload
      };

    default:
      return state;
  }
};
