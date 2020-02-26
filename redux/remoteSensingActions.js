import axios from "axios";
import qs from "qs";
export const RECEIVE_TODOS = "RECEIVE_TODOS";
const url = "http://qs.vipgz4.idcfengye.com";

export const fetchChangespotList = payload => async dispatch => {
  const params = {
    userid: "2"
  };
  const options = {
    method: "GET",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(params),
    url: url + "/changespot/list"
  };

  const { data } = await axios(options);
  console.log("fetchChangespotList", data);
};

export const fetchChangespotImplement = payload => async dispatch => {
  const params = {
    tbbm: "",
    czsj: "2020-02-26",
    czry: "2",
    czyj: "没意见",
    fj: "",
    remark: ""
  };
  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(params),
    url: url + "/changespot/implement"
  };

  const { data } = await axios(options);
  console.log("fetchChangespotImplement", data);
};
