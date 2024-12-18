import ButtonComponent from "@/components/form/button-component";
import InputField from "@/components/form/input-field";
import Loader from "@/components/form/loader";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/auth-store";

const ChangePasswordForm = () => {
  const { changePassword } = useAuthStore();
  const changePasswordResult = useMutation({
    mutationFn: async () => {
      return await changePassword(formValue);
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
    changePasswordResult.mutate();
  };

  return (
    <div>
      {changePasswordResult.isPending && <Loader />}{" "}
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
          Change Password
        </ButtonComponent>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
