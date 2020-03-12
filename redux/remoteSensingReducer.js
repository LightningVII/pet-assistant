import {
  REMOTE_SENSING_LIST,
  REMOTE_SENSING_IMPLEMENT_INFO
} from "../redux/remoteSensingActions";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case REMOTE_SENSING_LIST:
      return {
        ...state,
        remoteSensingList: payload?.content?.list
      };
    case REMOTE_SENSING_IMPLEMENT_INFO:
      return {
        ...state,
        feedbackList: payload
      };

    default:
      return state;
  }
};
