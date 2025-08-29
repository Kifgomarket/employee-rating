import { useApi } from "@/providers/ApiProvider";
import { PaginatedResult } from "@/types/type-utils";
import { User, UserRole } from "@prisma/client";
import { useCreateQuery } from "../../apiFactory";
import { EOrganizationEmployees, organizationEmployeesKey } from "./config";
import { OrganizationEmployeesParams } from "./types";

export const useGetAllOrganizationEmployees = ({
  orgId,
  params,
}: {
  orgId: string;
  params: OrganizationEmployeesParams;
}) => {
  const { jsonApiClient } = useApi();

  return useCreateQuery<PaginatedResult<User & { role: UserRole }>>({
    queryKey: organizationEmployeesKey[EOrganizationEmployees.FETCH_ALL],
    apiClient: jsonApiClient,
    url: `/organization/${orgId}/employees`,
    errorMessage: "Failed to fetch organization employees.",
    queryOptions: {
      enabled: !!orgId,
    },
    queryParams: params,
  });
};
