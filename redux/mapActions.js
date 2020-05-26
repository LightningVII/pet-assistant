import request from "../utils/request";
export const SAVE_TBXX = "SAVE_TBXX";
export const SAVE_TBZB = "SAVE_TBZB";

export const fetchTBXX = () => async (dispatch, getState) => {
  const { userid } = getState().user.user;
  try {
    const { data } = await request.arguments("/app/changespot/tbxx?", {
      params: { userid },
    });

    return dispatch({ type: SAVE_TBXX, payload: data?.content });
  } catch (error) {
    return dispatch({ type: "error", error });
  }
};

export const fetchTBZB = () => async (dispatch, getState) => {
  const { userid } = getState().user.user;
  try {
    const { data } = await request.get("/app/changespot/tbzb", {
      params: { userid },
    });

    return dispatch({ type: SAVE_TBZB, payload: data?.content });
  } catch (error) {
    return dispatch({ type: "error", error });
  }
};
