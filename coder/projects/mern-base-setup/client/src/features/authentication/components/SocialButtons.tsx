import ENV_CONFIG from "@/configs/env-config";
import React, { memo, useEffect } from "react";
import toast from "react-hot-toast";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth-store";

const SocialButtons = () => {
  const navigate = useNavigate();
  const { signinPassportSuccess, redirectUrl } = useAuthStore();

  // signin with social account
  const handleGoogleLogin = () => {
    const url = ENV_CONFIG.PORT_SERVER + `passport/google`;
    const win = window.open(url, "", "width=300,height=300");
    win?.addEventListener("beforeunload", function (e) {
      console.log({
        e,
      });

      win?.close();
    });
  };
  // redirect to page before login
  useEffect(() => {
    try {
      (async () => {
        const response = await signinPassportSuccess();

        if (response.status === 200) {
          const path: string = redirectUrl?.pathname + redirectUrl?.search;

          navigate(path, {
            replace: true,
          });
          return;
        }
      })();
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center border rounded px-4 py-2 w-full hover:bg-gray-100"
      >
        <FaGoogle />
        <div className="flex-1 text-sm text-center font-medium">
          Sign in with Google
        </div>
      </button>
      <button className="flex items-center border rounded px-4 py-2 w-full hover:bg-gray-100">
        <FaFacebook />
        <div className="flex-1 text-sm text-center font-medium">
          Sign in with Facebook
        </div>
      </button>
      <button className="flex items-center border rounded px-4 py-2 w-full hover:bg-gray-100">
        <FaGithub />
        <div className="flex-1 text-sm text-center font-medium">
          Sign in with Github
        </div>
      </button>
    </div>
  );
};

export default memo(SocialButtons);
