import ButtonComponent from "@/components/form/button-component";
import InputField from "@/components/form/input-field";
import Loader from "@/components/form/loader";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../stores/auth-store";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const { resetPassword } = useAuthStore();
  const resetPasswordResult = useMutation({
    mutationFn: async () => {
      return await resetPassword(token as string, formValue);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // form
  const [formValue, setFormValue] = useState({
    new_password: "",
    confirm_new_password: "",
  });
  // handle form change
  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetPasswordResult.mutate();
  };

  const navigate = useNavigate();
  useEffect(() => {
    resetPasswordResult.isSuccess && navigate(`/signin`);
  }, [resetPasswordResult.isSuccess]);

  return (
    <div>
      {resetPasswordResult.isPending && <Loader />}{" "}
      <form
        onSubmit={onSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <InputField
          required
          placeholder="New password"
          type="password"
          name="new_password"
          value={formValue.new_password}
          onChange={handleFormChange}
        />
        <InputField
          required
          placeholder="Confirm new password"
          type="password"
          name="confirm_new_password"
          value={formValue.confirm_new_password}
          onChange={handleFormChange}
        />

        <ButtonComponent color="black" type="submit">
          Reset Password
        </ButtonComponent>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
