import { axiosConfigV1 } from "@/configs/axios-config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Type = {
  user: any;
  access_token: string;
  isLoggedIn: boolean;
  redirectUrl: any;
  changeRedirectUrl: (location: any) => any;

  signup: (data: any) => any;
  signin: (data: any) => any;
  signout: () => any;
  getMe: () => any;
  updateMe: (data: any) => any;
  signinPassportSuccess: () => any;
  changePassword: (data: any) => any;
  forgotPassword: (data: any) => any;
  resetPassword: (token: string, data: any) => any;
};

export const useAuthStore = create<Type>()(
  persist(
    (set, get) => ({
      user: null,
      access_token: "",
      isLoggedIn: false,
      redirectUrl: null,
      changeRedirectUrl: (location) => {
        const arrayPath = [
          `signin`,
          `signup`,
          `forgot-password`,
          `reset-password`,
        ];
        if (arrayPath.find((item) => location.pathname.includes(item))) return;
        set({ redirectUrl: location as Location });
      },

      signup: async (data) => {
        const url = `auth/signup`;
        const response = (await axiosConfigV1.post(url, data)).data;
        return response;
      },
      signin: async (data) => {
        const url = `auth/signin`;
        const response = (await axiosConfigV1.post(url, data)).data;
        set({
          user: response?.data?.user,

          access_token: response?.data?.access_token,
          isLoggedIn: true,
        });
        return response;
      },
      signout: async () => {
        const url = `auth/signout`;
        const response = await (await axiosConfigV1.delete(url)).data;
        set({
          user: null,

          isLoggedIn: false,
          access_token: "",
        });

        localStorage.removeItem("_tracking_id");

        return response;
      },
      getMe: async () => {
        const url = `auth/get-me`;
        const response = (await axiosConfigV1.get(url)).data;
        set({ user: response?.data });
        return response;
      },
      updateMe: async (data) => {
        const url = `auth/update-me`;
        const response = (await axiosConfigV1.put(url, data)).data;
        set({ user: response?.data });
        return response;
      },
      signinPassportSuccess: async () => {
        const url = `passport/signin-passport/success`;
        const response = (await axiosConfigV1.get(url)).data;
        set({
          user: response?.data?.user,
          access_token: response?.data?.access_token,
          isLoggedIn: true,
        });
        return response;
      },
      changePassword: async (data) => {
        const url = `auth/change-password`;
        const response = (await axiosConfigV1.put(url, data)).data;
        return response;
      },
      forgotPassword: async (data) => {
        const url = `auth/forgot-password`;
        const response = (await axiosConfigV1.put(url, data)).data;
        return response;
      },
      resetPassword: async (token, data) => {
        const url = `auth/reset-password/${token}`;
        const response = (await axiosConfigV1.put(url, data)).data;
        return response;
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
