import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonComponent from "@/components/form/button-component";
import { Link, useNavigate } from "react-router-dom";
import InputField from "@/components/form/input-field";
import Loader from "@/components/form/loader";
import { useAuthStore } from "../stores/auth-store";

const SigninForm = () => {
  const navigate = useNavigate();
  const { signin, redirectUrl } = useAuthStore();
  const signinResult = useMutation({
    mutationFn: async () => {
      const { email, password } = formValue;
      return await signin({ email, password });
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
    password: "",
  });
  // handle form change
  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  // handle form change
  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    signinResult.mutate();
  };
  // redirect to page before login
  useEffect(() => {
    try {
      if (signinResult.isSuccess) {
        const path = redirectUrl?.pathname + redirectUrl?.search;
        navigate(path, {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [signinResult]);
  return (
    <div>
      {signinResult.isPending && <Loader />}
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
        <InputField
          required
          placeholder="Password"
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleFormChange}
        />

        <div className="text-right text-sm">
          <Link to={`/forgot-password`} className="text-blue-500 text-link">
            Forgot Password?
          </Link>
        </div>
        <ButtonComponent color="black" type="submit">
          Signin
        </ButtonComponent>
      </form>
    </div>
  );
};

export default SigninForm;
