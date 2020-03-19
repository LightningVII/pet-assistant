import axios from "axios";
import { stringify } from "qs";
export const REMOTE_SENSING_LIST = "REMOTE_SENSING_LIST";
export const REMOTE_SENSING_IMPLEMENT_INFO = "REMOTE_SENSING_IMPLEMENT_INFO";
export const REMOTE_SENSING_CHANGESPOT_INFO = "REMOTE_SENSING_CHANGESPOT_INFO";
const SERVER_URL = "http://qs.vipgz4.idcfengye.com";

const getOptions = url => ({
  method: "GET",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  url: SERVER_URL + url
});

export const fetchChangespotList = payload => async dispatch => {
  const options = getOptions("/changespot/list?" + stringify(payload));
  const { data } = await axios(options);
  return dispatch({
    type: REMOTE_SENSING_LIST,
    payload: data
  });
};

export const fetchChangespotInfo = payload => async dispatch => {
  const options = getOptions("/changespot/info?" + stringify(payload));
  const { data } = await axios(options);
  return dispatch({
    type: REMOTE_SENSING_CHANGESPOT_INFO,
    payload: data
  });
};

export const fetchChangespotImplementInfo = payload => async dispatch => {
  const options = getOptions("/changespot/implementInfo?" + stringify(payload));
  const { data } = await axios(options);

  return dispatch({
    type: REMOTE_SENSING_IMPLEMENT_INFO,
    payload: data
  });
};

export const fetchChangespotUpdateImplement = payload => async dispatch => {
  console.log('fetchChangespotUpdateImplement', payload)
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: stringify(payload),
    url: SERVER_URL + "/changespot/updateImplement"
  };
  return await axios(options);
};

export const fetchChangespotImplement = payload => async dispatch => {
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: stringify(payload),
    url: SERVER_URL + "/changespot/implement"
  };
  return await axios(options);
};

export const fetchChangespotUpload = (
  selectedImages,
  payload
) => async dispatch => {
  const formData = new FormData();

  selectedImages.forEach(element => {
    const uriParts = element.localUri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("files", {
      uri: element.localUri,
      name: element.filename,
      type: `image/${fileType}`
    });
  });

  let options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
    // onUploadProgress: callback
  };

  const { data } = await axios
    .post(SERVER_URL + "/changespot/upload", formData, options)
    .catch(error => {
      throw error;
    });

  console.log('fetchChangespotUpload', data)

  return data;
};
