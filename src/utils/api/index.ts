import axios from "axios";
import { getAuth } from "../helpers/auth";

let baseURL = process.env.REACT_APP_URL_STAG;
if (process.env.REACT_APP_ENV === "production") {
  baseURL = process.env.REACT_APP_URL_PROD;
}

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const auth_token = (await getAuth()).auth_token;
  if (auth_token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${auth_token}`,
    };
  }

  return config;
});
