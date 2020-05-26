import axios from "axios";
const baseURL = "http://192.168.1.100:9999";

const request = axios.create({
  baseURL,
  timeout: 5000,
  headers: { "content-type": "application/x-www-form-urlencoded" },
});

export default request;
