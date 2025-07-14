"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { LoginInput } from "../api/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserSchema } from "@/schemas/user.schema";
import Cookie from "js-cookie";
import cookieKeys from "@/configs/cookieKeys";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@/stores/authStore";
import { useLogin } from "../api-client/login/useLogin";

const LoginForm = () => {
  const router = useRouter();
  const { setUser, setAuthToken } = useAuthActions();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInput>({
    mode: "onSubmit",
    resolver: zodResolver(LoginUserSchema),
  });

  const { mutateAsync: login } = useLogin({
    invalidateQueryKey: [],
  });

  return (
    <form
      className="flex w-full flex-col"
      onSubmit={handleSubmit(async (values) => {
        const {
          data: { user, token },
        } = await login({
          body: values,
        });

        setUser(user);
        setAuthToken(token);

        Cookie.set(cookieKeys.USER_TOKEN, token);
        Cookie.set(cookieKeys.USER, JSON.stringify(user));
        router.push("/");
      })}
    >
      {errors.email?.message && <p>{errors.email.message}</p>}
      {errors.password?.message && <p>{errors.password.message}</p>}

      <input
        type="email"
        placeholder="Enter email"
        className="border px-3 py-1.5 text-sm"
        {...register("email")}
      />
      <input
        type="password"
        placeholder="Enter password"
        className="border px-3 py-1.5 text-sm"
        {...register("password")}
      />

      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;