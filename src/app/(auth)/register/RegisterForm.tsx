"use client";

import { useRegister } from "@/app/api-client/register/useRegister";
import { CustomError } from "@/app/api/helpers/handleError";
import Button from "@/components/Button";
import ErrorMessage from "@/components/Forms/ErrorMessage";
import Field from "@/components/Forms/Field";
import Form from "@/components/Forms/Form";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import cookieKeys from "@/configs/cookieKeys";
import { RegisterUserSchema } from "@/schemas/user.schema";
import { useAuthActions } from "@/stores/authStore";
import { AxiosError } from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { IoLockClosed, IoMail, IoPerson } from "react-icons/io5";
import { BsBuildingFill } from "react-icons/bs";

const RegisterForm = () => {
  const router = useRouter();
  const { mutateAsync: register } = useRegister({});
  const { setUser, setAuthToken, setSelectedOrganization } = useAuthActions();

  return (
    <Form
      validationSchema={RegisterUserSchema}
      className="space-y-1"
      onSubmit={async (values, methods) => {
        try {
          const {
            data: { user, token },
          } = await register({
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
              <BsBuildingFill data-slot="icon" />
              <Input
                placeholder="Your organization name"
                data-invalid={errors.organizationName?.message}
                {...register("organizationName")}
              />
            </InputGroup>
            <ErrorMessage>{errors.organizationName?.message}</ErrorMessage>
          </Field>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field>
              <InputGroup>
                <IoPerson data-slot="icon" />
                <Input
                  placeholder="Your first name"
                  data-invalid={errors.firstName?.message}
                  {...register("firstName")}
                />
              </InputGroup>
              <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            </Field>

            <Field>
              <InputGroup>
                <IoPerson data-slot="icon" />
                <Input
                  placeholder="Your last name"
                  data-invalid={errors.lastName?.message}
                  {...register("lastName")}
                />
              </InputGroup>
              <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            </Field>
          </div>

          <Field>
            <InputGroup>
              <IoMail data-slot="icon" />
              <Input
                placeholder="Your email"
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
                placeholder="Your password"
                data-invalid={errors.password?.message}
                {...register("password")}
              />
            </InputGroup>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </Field>

          <Field>
            <InputGroup>
              <IoLockClosed data-slot="icon" />
              <Input
                type="password"
                placeholder="Confirm your password"
                data-invalid={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </InputGroup>
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          </Field>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Register
          </Button>
        </>
      )}
    </Form>
  );
};

export default RegisterForm;
