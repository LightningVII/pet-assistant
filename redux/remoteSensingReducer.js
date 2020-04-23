import {
  REMOTE_SENSING_LIST,
  REMOTE_SENSING_IMPLEMENT_INFO,
  REMOTE_SENSING_CHANGESPOT_INFO,
} from "../redux/remoteSensingActions";

export default (state = {}, { type, payload }) => {
  console.log('type', type)
  switch (type) {
    case `${REMOTE_SENSING_LIST}_TasksClosed`:
      return {
        ...state,
        tasksClosedList: payload?.content?.list,
      };
    case `${REMOTE_SENSING_LIST}_TasksOngoing`:
      return {
        ...state,
        tasksOngoingList: payload?.content?.list,
      };
    case REMOTE_SENSING_LIST:
      return {
        ...state,
        tasksList: payload?.content?.list,
      };
    case REMOTE_SENSING_IMPLEMENT_INFO:
      return {
        ...state,
        feedbackList: payload,
      };
    case REMOTE_SENSING_CHANGESPOT_INFO:
      return {
        ...state,
        remoteSensingInfo: payload?.content,
      };
    default:
      return state;
  }
};
