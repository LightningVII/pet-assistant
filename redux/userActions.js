import axios from "axios";
import qs from "qs";
export const SAVE_USER = "SAVE_USER";
const url = "http://qs.vipgz4.idcfengye.com";

export const fetchMe = id => async dispatch => {
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify({ id }),
    url: url + "/login"
  };

  // const { data } = await axios(options);
  const { data } = await new Promise(resolve =>
    setTimeout(() => resolve({ data: { content: { userid: "2" } } }), 1000)
  );
  console.log("fetchMe", data);
  return dispatch({
    type: SAVE_USER,
    payload: data
  });
};

export const fetchLogin = params => async dispatch => {
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(params),
    url: url + "/login"
  };

  console.log("fetchLogin", params);
  // const { data } = await axios(options);
  const { data } = await new Promise(resolve =>
    setTimeout(() => resolve({ data: { content: { userid: "2" } } }), 1000)
  );
  console.log("fetchLogin", data);
  return dispatch({
    type: SAVE_USER,
    payload: data
  });
};
