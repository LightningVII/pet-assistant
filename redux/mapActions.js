import axios from "axios";
import { stringify } from "qs";
export const SAVE_TBXX = "SAVE_TBXX";
export const SAVE_TBZB = "SAVE_TBZB";
const SERVER_URL = "http://180.123.42.130:9999";
const getOptions = (url) => ({
  method: "GET",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  url: SERVER_URL + url,
});

export const fetchTBXX = () => async (dispatch, getState) => {
  const { userid } = getState().user.user;
  const options = getOptions("/app/changespot/tbxx?" + stringify({ userid }));
  try {
    const { data } = await axios(options);

    return dispatch({
      type: SAVE_TBXX,
      payload: data?.content,
    });
  } catch (error) {
    return dispatch({
      type: "error",
      error,
    });
  }
};

export const fetchTBZB = () => async (dispatch, getState) => {
  const { userid } = getState().user.user;
  const options = getOptions("/app/changespot/tbzb?" + stringify({ userid }));
  try {
    const { data } = await axios(options);

    return dispatch({
      type: SAVE_TBZB,
      payload: data?.content,
    });
  } catch (error) {
    return dispatch({
      type: "error",
      error,
    });
  }
};
