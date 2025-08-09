import { useApi } from "@/providers/ApiProvider";
import { OrganizationMember } from "@prisma/client";
import { useCreateQuery } from "../../apiFactory";
import { EOrganizationMember, organizationMemberKey } from "./config";

export const useListOrganizationMembership = () => {
  const { jsonApiClient } = useApi();

  return useCreateQuery<{ success: boolean; data: OrganizationMember[] }>({
    queryKey: organizationMemberKey[EOrganizationMember.FETCH_ALL],
    apiClient: jsonApiClient,
    url: "/organization/organization-membership",
    errorMessage: "Failed to fetch organization memberships.",
  });
};
