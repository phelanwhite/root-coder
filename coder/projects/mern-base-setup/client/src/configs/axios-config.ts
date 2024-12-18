import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import ENV_CONFIG from "./env-config";
import { useAuthStore } from "@/features/authentication/stores/auth-store";
import { getRefreshToken } from "@/features/authentication/services/token";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosConfigV1 = axios.create({
  baseURL: ENV_CONFIG.PORT_SERVER,
  params: {
    ...(localStorage.getItem("_tracking_id") && {
      _tracking_id: localStorage.getItem("_tracking_id"),
    }),
  },
  headers: {
    // "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with the request
});
// Add a request interceptor
axiosConfigV1.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosConfigV1.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error: AxiosError) {
    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;

    if (error.response?.status === 403 && originalRequest) {
      try {
        const response: any = await getRefreshToken();

        useAuthStore.setState({
          user: { accessToken: response?.data?.access_token },
        });

        return axiosConfigV1(originalRequest);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 403) {
          useAuthStore.getState().signout();
          return;
        }
      }
    }
    const customError = error?.response?.data;
    return Promise.reject(customError);
  }
);
