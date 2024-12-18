import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonComponent from "@/components/form/button-component";
import { Link, useNavigate } from "react-router-dom";
import InputField from "@/components/form/input-field";
import Loader from "@/components/form/loader";
import { useAuthStore } from "../stores/auth-store";

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuthStore();
  const signupResult = useMutation({
    mutationFn: async () => {
      return await signup(formValue);
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
    name: "",
    email: "",
    password: "",
    confirm_password: "",
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
    signupResult.mutate();
  };
  useEffect(() => {
    try {
      signupResult.isSuccess &&
        navigate(`/signin`, {
          replace: true,
        });
    } catch (error) {
      console.error(error);
    }
  }, [signupResult]);
  return (
    <div>
      {signupResult.isPending && <Loader />}
      <form
        onSubmit={onSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <InputField
          required
          placeholder="Name"
          type="text"
          name="name"
          value={formValue.name}
          onChange={handleFormChange}
        />
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
        <InputField
          required
          placeholder="Confirm Password"
          type="password"
          name="confirm_password"
          value={formValue.confirm_password}
          onChange={handleFormChange}
        />

        <div className="text-right text-sm">
          <Link to={`/forgot-password`} className="text-blue-500 text-link">
            Forgot Password?
          </Link>
        </div>
        <ButtonComponent color="black" type="submit">
          Signup
        </ButtonComponent>
      </form>
    </div>
  );
};

export default SignupForm;
