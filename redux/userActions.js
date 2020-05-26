import { stringify } from "qs";
import request from "../utils/request";
export const SAVE_USER = "SAVE_USER";

export const fetchMe = (id) => async (dispatch) => {
  const { data } = await request.get("/sys/user/info", {
    params: { id },
  });
  return dispatch({
    type: SAVE_USER,
    payload: data.content,
  });
};

export const fetchLogin = (params) => async (dispatch) => {
  const { data } = await request.post("/login", stringify(params));

  return dispatch({
    type: SAVE_USER,
    payload: data?.content?.user || data?.message,
  });
};
