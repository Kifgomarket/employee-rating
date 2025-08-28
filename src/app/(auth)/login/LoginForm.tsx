"use client";

import { useLogin } from "@/app/api-client/login/useLogin";
import { CustomError } from "@/app/api/helpers/handleError";
import Button from "@/components/Button";
import ErrorMessage from "@/components/Forms/ErrorMessage";
import Field from "@/components/Forms/Field";
import Form from "@/components/Forms/Form";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import cookieKeys from "@/configs/cookieKeys";
import { LoginUserSchema } from "@/schemas/user.schema";
import { useAuthActions } from "@/stores/authStore";
import { AxiosError } from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { IoLockClosed, IoMail } from "react-icons/io5";

const LoginForm = () => {
  const router = useRouter();
  const { mutateAsync: login } = useLogin({});
  const { setUser, setAuthToken, setSelectedOrganization } = useAuthActions();

  return (
    <Form
      validationSchema={LoginUserSchema}
      className="space-y-1"
      onSubmit={async (values, methods) => {
        try {
          const {
            data: { user, token },
          } = await login({
            body: values,
          });

          Cookie.set(cookieKeys.USER_TOKEN, token);
          Cookie.set(cookieKeys.USER, JSON.stringify(user));
          Cookie.set(
            cookieKeys.SELECTED_ORGANIZATION,
            JSON.stringify(user.OrganizationMembers[0]),
          );

          setAuthToken(token);
          setUser(user);
          setSelectedOrganization(user.OrganizationMembers[0] ?? null);

          router.push("/");
        } catch (error) {
          const err = error as AxiosError;
          const errObject = err.response?.data as CustomError;

          methods.setError("email", { message: errObject.error.message });
        }
      }}
    >
      {({ register, formState: { errors, isSubmitting } }) => (
        <>
          <Field>
            <InputGroup>
              <IoMail data-slot="icon" />
              <Input
                placeholder="Enter your email"
                data-invalid={errors.email?.message}
                {...register("email")}
              />
            </InputGroup>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </Field>

          <Field>
            <InputGroup>
              <IoLockClosed data-slot="icon" />
              <Input
                type="password"
                placeholder="Enter your password"
                data-invalid={errors.password?.message}
                {...register("password")}
              />
            </InputGroup>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </Field>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Login
          </Button>
        </>
      )}
    </Form>
  );
};

export default LoginForm;
