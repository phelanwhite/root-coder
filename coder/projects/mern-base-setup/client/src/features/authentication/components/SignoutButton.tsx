import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth-store";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
import clsx from "clsx";
import { useThemeStore } from "@/features/theme/stores/theme-store";

const SignoutButton = () => {
  const { theme } = useThemeStore();
  const { signout } = useAuthStore();
  const signoutResult = useMutation({
    mutationFn: async () => await signout(),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <button
      onClick={() => signoutResult.mutate()}
      className={clsx(
        `w-full flex items-center gap-2 px-4 py-2 rounded`,
        theme ? `hover:bg-gray-800` : `hover:bg-gray-100`
      )}
    >
      <IoIosLogOut />
      <span>Signout</span>
    </button>
  );
};

export default SignoutButton;
