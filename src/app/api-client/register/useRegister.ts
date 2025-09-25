import { RegisterInput, UserWithOrgMembers } from "@/app/api/auth/types";
import { useApi } from "@/providers/ApiProvider";
import { Organization } from "@prisma/client";
import { useCreateMutation } from "../apiFactory";
export const useRegister = ({
  invalidateQueryKey,
}: {
  invalidateQueryKey?: unknown[];
}) => {
  const { jsonApiClient } = useApi();
  return useCreateMutation<
    Record<string, any>,
    RegisterInput,
    {
      data: {
        user: UserWithOrgMembers;
        organization: Organization;
        token: string;
      };
    },
    {
      data: {
        user: UserWithOrgMembers;
        organization: Organization;
        token: string;
      };
    }
  >({
    apiClient: jsonApiClient,
    method: "post",
    url: "/auth/register",
    errorMessage: "Failed to register user.",
    invalidateQueryKey,
    mutationOptions: {},
  });
};
