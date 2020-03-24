import axios from "axios";
import qs from "qs";
export const SAVE_USER = "SAVE_USER";
const url = "http://qs.vipgz4.idcfengye.com";

export const fetchMe = id => async dispatch => {
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify({ id }),
    url: url + "/sys/user/info"
  };

  const { data } = await axios(options);
  // const { data } = await new Promise(resolve =>
  //   setTimeout(() => resolve({ data: { content: { userid: "2" } } }), 1000)
  // );
  return dispatch({
    type: SAVE_USER,
    payload: data.content
  });
};

export const fetchLogin = params => async dispatch => {
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(params),
    url: url + "/login"
  };

  const { data } = await axios(options);

  return dispatch({
    type: SAVE_USER,
    payload: data?.content?.user || data?.message
  });
};
