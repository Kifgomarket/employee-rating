export enum EOrganizationMember {
  FETCH_ALL = 1,
  FETCH_SINGLE = 2,
}

export const organizationMemberKey: Record<EOrganizationMember, string> = {
  [EOrganizationMember.FETCH_ALL]: "get-all-organization-memberships",
  [EOrganizationMember.FETCH_SINGLE]: "get-single-organization-membership",
};
