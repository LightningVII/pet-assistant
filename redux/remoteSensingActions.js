import axios from "axios";
export const RECEIVE_TODOS = "RECEIVE_TODOS";

export const fetchTodos = param => async dispatch => {
  const { data } = await axios.get(
    "http://hn216.api.yesapi.cn/?s=App.Hello.World&name=YesApi&app_key=5288FA70BDB68E7239924D5E620044B4&sign=F9EDFD82C1EB5FDDA9860F55424BE70A"
  );
  console.log("data", data);
  return dispatch({
    type: RECEIVE_TODOS,
    payload: data
  });
};
