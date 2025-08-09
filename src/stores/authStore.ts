import { UserWithOrgMembers } from "@/app/api/auth/types";
import cookieKeys from "@/configs/cookieKeys";
import { OrganizationMember } from "@prisma/client";
import Cookie from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

interface IAuthStore {
  states: {
    user: UserWithOrgMembers | null;
    authToken: string | null;
    selectedOrganization: OrganizationMember | null;
  };
  actions: {
    setUser: Dispatch<SetStateAction<UserWithOrgMembers | null>>;
    setAuthToken: Dispatch<SetStateAction<string | null>>;
    setSelectedOrganization: Dispatch<
      SetStateAction<OrganizationMember | null>
    >;
    logout: () => void;
  };
}

const useAuthStore = create<IAuthStore>()((set) => ({
  states: {
    user:
      (JSON.parse(
        Cookie.get(cookieKeys.USER) || "null",
      ) as UserWithOrgMembers) || null,
    authToken:
      ((Cookie.get(cookieKeys.USER_TOKEN) || "null") as string) || null,
    selectedOrganization:
      (JSON.parse(
        Cookie.get(cookieKeys.SELECTED_ORGANIZATION) || "null",
      ) as OrganizationMember) || null,
  },
  actions: {
    setUser: (value) =>
      set(({ states }) => {
        return {
          states: {
            ...states,
            user: typeof value === "function" ? value(states.user) : value,
          },
        };
      }),
    setAuthToken: (value) =>
      set(({ states }) => {
        return {
          states: {
            ...states,
            authToken:
              typeof value === "function" ? value(states.authToken) : value,
          },
        };
      }),

    setSelectedOrganization: (value) =>
      set(({ states }) => {
        return {
          states: {
            ...states,
            selectedOrganization:
              typeof value === "function"
                ? value(states.selectedOrganization)
                : value,
          },
        };
      }),

    logout: () => {
      Cookie.remove(cookieKeys.USER_TOKEN);
      Cookie.remove(cookieKeys.USER);

      return set(({ states }) => {
        return {
          states: {
            ...states,
            authToken: null,
            user: null,
          },
        };
      });
    },
  },
}));

const useAuth = () => useAuthStore((state) => state.states);
const useAuthActions = () => useAuthStore((state) => state.actions);

export { useAuth, useAuthActions };
