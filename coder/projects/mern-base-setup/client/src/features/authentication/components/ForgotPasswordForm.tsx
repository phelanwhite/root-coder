import ButtonComponent from "@/components/form/button-component";
import InputField from "@/components/form/input-field";
import Loader from "@/components/form/loader";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/auth-store";

const ForgotPasswordForm = () => {
  const { forgotPassword } = useAuthStore();
  const forgotPasswordResult = useMutation({
    mutationFn: async () => {
      return await forgotPassword(formValue);
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
    email: "",
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
    forgotPasswordResult.mutate();
  };

  return (
    <div>
      {forgotPasswordResult.isPending && <Loader />}
      {/* form  */}
      <form
        onSubmit={onSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <InputField
          required
          placeholder="Email"
          type="email"
          name="email"
          value={formValue.email}
          onChange={handleFormChange}
        />

        <ButtonComponent color="black" type="submit">
          Forgot Password
        </ButtonComponent>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
