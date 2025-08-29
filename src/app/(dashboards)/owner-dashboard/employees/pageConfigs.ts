import { RestrictedUserRole } from "@/app/api-client/user/types";

export default {
  DEFAULT_PER_PAGE: 25,
  DEFAULT_PAGE: 1,
  MAX_ALLOWED_PAGE: 100_000,
  PER_PAGES: [5, 10, 25, 50, 100],
  FILTERS: {
    roles: RestrictedUserRole,
  },
  SORT: ["ASC", "DESC"] as const,
};
