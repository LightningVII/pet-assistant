import { REMOTE_SENSING_LIST } from "../redux/remoteSensingActions";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case REMOTE_SENSING_LIST:
      return {
        ...state,
        remoteSensingList: payload?.content?.list
      };

    default:
      return state;
  }
};
