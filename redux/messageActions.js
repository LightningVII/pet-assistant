import axios from "axios";
import { stringify } from "qs";
export const SAVE_MESSGAGES = "SAVE_MESSGAGES";
const SERVER_URL = "http://192.168.1.106:9999";
const getOptions = (url) => ({
  method: "GET",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  url: SERVER_URL + url,
});
export const fetchMessageList = (payload) => async (dispatch, getState) => {
  const { userid } = getState().user.user;
  const options = getOptions(
    "/app/message/list?" + stringify({ ...payload, userid })
  );
  try {
    const { data } = await axios(options);

    return dispatch({
      type: SAVE_MESSGAGES,
      payload: data?.content,
    });
  } catch (error) {
    return dispatch({
      type: "error",
      error,
    });
  }
};

export const fetchMessageRead = (payload) => async (dispatch) => {
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: stringify({ xxid: payload }),
    url: SERVER_URL + "/app/message/updateXxzt",
  };

  try {
    return await axios(options);
  } catch (error) {
    return dispatch({
      type: "error",
      error,
    });
  }
};
