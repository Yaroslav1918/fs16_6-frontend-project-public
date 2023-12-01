import baseURL from "./axiosInstance";

const token = {
  set(token: null | string) {
    baseURL.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    baseURL.defaults.headers.common.Authorization = "";
  },
};

export default token;