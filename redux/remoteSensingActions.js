import axios from "axios";
import qs from "qs";
export const REMOTE_SENSING_LIST = "REMOTE_SENSING_LIST";
export const REMOTE_SENSING_IMPLEMENT_INFO = "REMOTE_SENSING_IMPLEMENT_INFO";
const url = "http://qs.vipgz4.idcfengye.com";

export const fetchChangespotList = payload => async dispatch => {
  const options = {
    method: "GET",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    url: url + "/changespot/list?" + qs.stringify(payload)
  };

  const { data } = await axios(options);
  /* const { data } = await new Promise(resolve =>
    setTimeout(
      () =>
        resolve({ data: { content: { list: [{ tbbm: "1211212asds12" }] } } }),
      1000
    )
  ); */
  console.log("fetchChangespotList", data);
  return dispatch({
    type: REMOTE_SENSING_LIST,
    payload: data
  });
};

export const fetchChangespotImplementInfo = payload => async dispatch => {
  const options = {
    method: "GET",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    url: url + "/changespot/implementInfo?" + qs.stringify(payload)
  };

  const { data } = await axios(options);

  return dispatch({
    type: REMOTE_SENSING_IMPLEMENT_INFO,
    payload: data
  });
};

export const fetchChangespotImplement = payload => async dispatch => {
  console.log("fetchChangespotImplement  start", payload);
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(payload),
    url: url + "/changespot/implement"
  };
  return await axios(options);
  console.log("fetchChangespotImplement result", data);
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
    .post(url + "/changespot/upload", formData, options)
    .catch(error => {
      throw error;
    });

  return data;
};
