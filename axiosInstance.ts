import axios, { AxiosResponse } from "axios";

export const createAxiosInstance = (contentType: string) => {
  const instance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": contentType,
      Accept: "application/json",
    },
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      const notAllowedResponse = error?.response?.status === 401;

      if (notAllowedResponse && !originalRequest.sent) {
        originalRequest.sent = true;
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance("application/json");
export const axiosInstanceFile = createAxiosInstance("multipart/form-data");
