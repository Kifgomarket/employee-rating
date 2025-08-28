import { LoginInput, UserWithOrgMembers } from "@/app/api/auth/types";
import { useApi } from "@/providers/ApiProvider";
import { useCreateMutation } from "../apiFactory";

export const useLogin = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();

  return useCreateMutation<
    Record<string, any>,
    LoginInput,
    { data: { user: UserWithOrgMembers; token: string } },
    { data: { user: UserWithOrgMembers; token: string } }
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: "/auth/login",
    errorMessage: "Failed to login.",
    invalidateQueryKey,
    mutationOptions: {},
  });
};
