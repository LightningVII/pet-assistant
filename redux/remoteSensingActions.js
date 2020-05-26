import request from "../utils/request";
import { stringify } from "qs";
export const REMOTE_SENSING_LIST = "REMOTE_SENSING_LIST";
export const REMOTE_SENSING_IMPLEMENT_INFO = "REMOTE_SENSING_IMPLEMENT_INFO";
export const REMOTE_SENSING_CHANGESPOT_INFO = "REMOTE_SENSING_CHANGESPOT_INFO";

const TabStatus = {
  TasksClosed: 3,
  TasksOngoing: 2,
  RemoteSensingTaskList: 1,
};

export const fetchChangespotList = (params) => async (dispatch) => {
  const { tabPage, ...other } = params;
  const type =
    tabPage === "RemoteSensingTaskList"
      ? REMOTE_SENSING_LIST
      : `${REMOTE_SENSING_LIST}_${tabPage}`;

  try {
    const { data } = await request.get("/app/task/myTask", {
      params: {
        ...other,
        state: TabStatus[tabPage],
      },
    });

    return dispatch({ type, payload: data });
  } catch (error) {
    return dispatch({ type: "error", error });
  }
};

export const fetchChangespotInfo = (params) => async (dispatch) => {
  const { data } = await request.get("/changespot/info", { params });
  return dispatch({ type: REMOTE_SENSING_CHANGESPOT_INFO, payload: data });
};

export const fetchChangespotImplementInfo = (params) => async (dispatch) => {
  const { data } = await request.get("/changespot/implementInfo", { params });
  return dispatch({ type: REMOTE_SENSING_IMPLEMENT_INFO, payload: data });
};

export const fetchChangespotUpdateImplement = (payload) => async (dispatch) =>
  await request.post("/changespot/updateImplement", stringify(payload));

export const fetchChangespotImplement = (payload) => async (dispatch) => {
  try {
    return await request.post("/changespot/implement", stringify(payload));
  } catch (error) {
    return dispatch({ type: "error", error });
  }
};

export const fetchChangespotUpload = (selectedImages) => async (dispatch) => {
  const formData = new FormData();

  selectedImages.forEach((element) => {
    const uriParts = element.localUri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("files", {
      uri: element.localUri,
      name: element.filename,
      type: `image/${fileType}`,
    });
  });

  let options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    // onUploadProgress: callback
  };

  const { data } = await request
    .post("/changespot/upload", formData, options)
    .catch((error) => {
      throw error;
    });

  console.log("fetchChangespotUpload", data);

  return data;
};
