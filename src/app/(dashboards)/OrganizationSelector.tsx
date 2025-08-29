"use client";

import Field from "@/components/Forms/Field";
import Form from "@/components/Forms/Form";
import Select from "@/components/Forms/Select";
import cookieKeys from "@/configs/cookieKeys";
import { useAuth, useAuthActions } from "@/stores/authStore";
import Cookie from "js-cookie";
import { z } from "zod";
import { useListOrganizationMembership } from "../api-client/organization/organization-membership/useListOrganizationMembership";

const OrganizationSelector = () => {
  const { selectedOrganization } = useAuth();
  const { setSelectedOrganization } = useAuthActions();
  const { data: memberships } = useListOrganizationMembership();
  return (
    <>
      {memberships && memberships.data.length > 0 && (
        <Form
          validationSchema={z.object({ selected_organization: z.string() })}
          defaultValues={{
            selected_organization: selectedOrganization?.organizationId || "",
          }}
        >
          <Field>
            <Select
              placeholder="Select organization"
              name="selected_organization"
              onChange={(val) => {
                const [selected] = memberships.data.filter(
                  (member) => member.organizationId === val,
                );
                setSelectedOrganization(selected);
                Cookie.set(
                  cookieKeys.SELECTED_ORGANIZATION,
                  JSON.stringify(selected),
                );
              }}
            >
              {memberships?.data?.map((membership, idx) => (
                <Select.Option
                  key={membership.organizationId}
                  value={membership.organizationId}
                >
                  Organization {idx + 1}
                </Select.Option>
              ))}
            </Select>
          </Field>
        </Form>
      )}
    </>
  );
};

export default OrganizationSelector;
