import axios from "axios";
import queryString from "query-string";
import { base_url } from "../../utils/base_url";

const privateClient = axios.create({
  base_url,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("persist:petshop/user")
      ).token.slice(1, -1)}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
