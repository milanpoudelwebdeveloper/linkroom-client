import axios, { AxiosResponse } from "axios";
axios.defaults.baseURL = process.env.BASE_API_URL;

export const createAxiosInstance = (contentType: string) => {
  const instance = axios.create({
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
        window.location.href = "/";
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance("application/json");
export const axiosInstanceFile = createAxiosInstance("multipart/form-data");
