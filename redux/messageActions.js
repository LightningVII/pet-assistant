import request from "../utils/request";
import { stringify } from "qs";
export const SAVE_MESSGAGES = "SAVE_MESSGAGES";

export const fetchMessageList = (payload) => async (dispatch, getState) => {
  const { userid } = getState().user.user;
  try {
    const { data } = await request.get("/app/message/list", {
      params: { ...payload, userid },
    });

    return dispatch({ type: SAVE_MESSGAGES, payload: data?.content });
  } catch (error) {
    return dispatch({ type: "error", error });
  }
};

export const fetchMessageRead = (payload) => async (dispatch) => {
  try {
    return await request.post(
      "/app/message/updateXxzt",
      stringify({ xxid: payload })
    );
  } catch (error) {
    return dispatch({ type: "error", error });
  }
};
