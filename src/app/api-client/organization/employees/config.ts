export enum EOrganizationEmployees {
  FETCH_ALL = 1,
}

export const organizationEmployeesKey: Record<EOrganizationEmployees, string> =
  {
    [EOrganizationEmployees.FETCH_ALL]: "get-all-organization-employees",
  };
