"use client";

import React, { useState } from "react";
import { IoFingerPrintOutline } from "react-icons/io5";
import { Lock, EyeOff, Eye, Mail, User, Building2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { RegisterInput } from "../api/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserSchema } from "@/schemas/user.schema";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@/stores/authStore";
import Cookie from "js-cookie";
import cookieKeys from "@/configs/cookieKeys";
import { useRegister } from "../api-client/register/useRegister";
import Input from "../components/Input";
import Button from "../components/Button";

export const RegisterForm = () => {
  const router = useRouter();
  const { setUser, setAuthToken } = useAuthActions();
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    mode: "onSubmit",
    resolver: zodResolver(RegisterUserSchema),
  });

  const { mutateAsync: registerUser } = useRegister({
    invalidateQueryKey: [],
  });

  return (
    <section className="scrollbar flex h-dvh w-full flex-col items-center-safe justify-center-safe overflow-y-auto rounded-xl p-5 @md:w-[45%]">
      <div className="@container flex w-full flex-1 flex-col">
        {/* main content */}
        <div className="mx-auto mt-10 flex w-full max-w-sm flex-1 flex-col items-center justify-center">
          <div className="relative flex aspect-square size-12 items-center justify-center">
            <div className="absolute -top-2 -right-2 size-12 rotate-12 rounded-xl bg-[#d00000] shadow-lg shadow-[#d00000]"></div>
            <div className="relative flex size-12 items-center justify-center rounded-xl border border-white/50 bg-white/10 text-white shadow-md backdrop-blur-sm dark:border-white/10">
              <IoFingerPrintOutline className="relative size-6" />
            </div>
          </div>
          {/* title */}
          <h2 className="mt-5 text-center text-3xl font-bold text-gray-800 dark:text-white">
            Create your account
          </h2>
          <p className="mt-1 text-center text-xs text-gray-600 dark:text-white/60">
            Join today to unlock the smartest way to
            <br /> grow and rate your team.
          </p>
          {/* form */}
          <div className="mt-10 w-full">
            <form
              className="flex w-full flex-col space-y-5"
              onSubmit={handleSubmit(async (values) => {
                const {
                  data: { user, token },
                } = await registerUser({
                  body: values,
                });

                setUser(user);
                setAuthToken(token);

                Cookie.set(cookieKeys.USER_TOKEN, token);
                Cookie.set(cookieKeys.USER, JSON.stringify(user));
                router.push("/");
              })}
            >
              <Input
                placeholder="Organization name"
                leftIcon={Building2Icon}
                error={errors.organizationName?.message}
                {...register("organizationName")}
              />
              <Input
                placeholder="Enter your email"
                leftIcon={Mail}
                error={errors.email?.message}
                {...register("email")}
              />

              <div className="flex w-full space-x-2">
                <Input
                  placeholder="Firstname"
                  leftIcon={User}
                  error={errors.firstName?.message}
                  {...register("firstName")}
                />
                <Input
                  placeholder="Lastname"
                  leftIcon={User}
                  error={errors.lastName?.message}
                  {...register("lastName")}
                />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                leftIcon={Lock}
                error={errors.password?.message}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                {...register("password")}
              />

              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                leftIcon={Lock}
                error={errors.confirmPassword?.message}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                {...register("confirmPassword")}
              />

              <Button loading={isSubmitting}>Sign up</Button>

              <div className="flex items-center justify-center gap-2">
                <div className="w-full border-t border-gray-300 dark:border-white/10"></div>
                <p className="text-sm whitespace-nowrap text-gray-500 dark:text-white/60">
                  or continue with
                </p>
                <div className="w-full border-t border-gray-300 dark:border-white/10"></div>
              </div>

              <div className="flex w-full flex-col items-center justify-center gap-5 @xl:flex-row">
                {/* Google Button */}
                <div className="w-full">
                  <Button
                    type="button"
                    className="btn-ghost relative flex w-full cursor-pointer touch-none items-center justify-center overflow-hidden rounded-xl border-[1.5px] border-gray-300 bg-[var(--color-btn)] p-3 text-sm font-medium text-[var(--color-btn-text)] ring-[var(--color-btn-ring)] ring-offset-2 ring-offset-inherit outline-none select-none hover:border-gray-400 hover:bg-[var(--color-btn-hover)] focus:outline-none disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-[var(--color-btn-disabled)] disabled:text-[var(--color-btn-text-disabled)] data-[focus-visible]:ring-2 data-[pressed]:bg-[var(--color-btn-active)] md:p-3 dark:border-white/20 dark:bg-[var(--color-btn-dark)] dark:text-white dark:hover:border-white/30 dark:disabled:border-white/10 dark:disabled:bg-white/10 dark:disabled:text-white/30"
                    tabIndex={0}
                  >
                    <span
                      className="relative flex items-center px-2.5"
                      aria-live="polite"
                      aria-busy="false"
                    >
                      <div className="flex w-full items-center justify-center peer-disabled:text-white">
                        {/* Google SVG */}
                        <svg
                          className="size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            fill="#FFC107"
                            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                          />
                          <path
                            fill="#FF3D00"
                            d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                          />
                          <path
                            fill="#4CAF50"
                            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                          />
                          <path
                            fill="#1976D2"
                            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                          />
                        </svg>
                        <p className="ml-2">Google</p>
                      </div>
                    </span>
                  </Button>
                </div>

                {/* Microsoft Button */}
                <div className="w-full">
                  <Button
                    type="button"
                    className="btn-ghost relative flex w-full cursor-pointer touch-none items-center justify-center overflow-hidden rounded-xl border-[1.5px] border-gray-300 bg-[var(--color-btn)] p-3 text-sm font-medium text-[var(--color-btn-text)] ring-[var(--color-btn-ring)] ring-offset-2 ring-offset-inherit outline-none select-none hover:border-gray-400 hover:bg-[var(--color-btn-hover)] focus:outline-none disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-[var(--color-btn-disabled)] disabled:text-[var(--color-btn-text-disabled)] data-[focus-visible]:ring-2 data-[pressed]:bg-[var(--color-btn-active)] md:p-3 dark:border-white/20 dark:bg-[var(--color-btn-dark)] dark:text-white dark:hover:border-white/30 dark:disabled:border-white/10 dark:disabled:bg-white/10 dark:disabled:text-white/30"
                    tabIndex={0}
                  >
                    <span
                      className="relative flex items-center px-2.5"
                      aria-live="polite"
                      aria-busy="false"
                    >
                      <div className="flex w-full items-center justify-center">
                        {/* Microsoft SVG */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4"
                          viewBox="0 0 256 256"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            fill="#f1511b"
                            d="M121.666 121.666H0V0h121.666z"
                          />
                          <path
                            fill="#80cc28"
                            d="M256 121.666H134.335V0H256z"
                          />
                          <path
                            fill="#00adef"
                            d="M121.663 256.002H0V134.336h121.663z"
                          />
                          <path
                            fill="#fbbc09"
                            d="M256 256.002H134.335V134.336H256z"
                          />
                        </svg>
                        <p className="ml-2">Microsoft</p>
                      </div>
                    </span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
