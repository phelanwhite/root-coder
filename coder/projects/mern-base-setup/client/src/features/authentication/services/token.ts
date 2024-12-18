import ENV_CONFIG from "@/configs/env-config";
import axios from "axios";

export async function getRefreshToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = ENV_CONFIG.PORT_SERVER + `auth/refresh-token`;
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
