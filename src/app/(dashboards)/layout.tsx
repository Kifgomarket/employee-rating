"use client";

import React, { ReactNode, useEffect } from "react";
import { useListOrganizationMembership } from "../api-client/organization/organization-membership/useListOrganizationMembership";
import Form from "@/components/Forms/Form";
import Field from "@/components/Forms/Field";
import Select from "@/components/Forms/Select";
import { z } from "zod";
import { useAuth, useAuthActions } from "@/stores/authStore";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import cookieKeys from "@/configs/cookieKeys";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { selectedOrganization } = useAuth();
  const { setSelectedOrganization } = useAuthActions();
  const { data: memberships } = useListOrganizationMembership();

  const router = useRouter();

  useEffect(() => {
    console.log({ selectedOrganization }, "from layout");
    if (selectedOrganization) {
      const role = selectedOrganization.role;

      if (role === UserRole.OWNER) {
        router.push("/owner-dashboard");
      }

      if (role === UserRole.SUPERVISOR) {
        router.push("/supervisor-dashboard");
      }

      if (role === UserRole.EMPLOYEE) {
        router.push("/employee-dashboard");
      }
    }
  }, [router, selectedOrganization]);

  return (
    <section>
      {memberships && memberships.data.length > 0 && (
        <Form
          validationSchema={z.object({ selected_organization: z.string() })}
          defaultValues={{
            selected_organization: selectedOrganization?.id || "",
          }}
        >
          <Field>
            <Select
              placeholder="Select organization"
              name="selected_organization"
              onChange={(val) => {
                const [selected] = memberships.data.filter(
                  (member) => member.id === val,
                );
                setSelectedOrganization(selected);
                Cookie.set(
                  cookieKeys.SELECTED_ORGANIZATION,
                  JSON.stringify(selected),
                );
              }}
            >
              {memberships?.data?.map((membership, idx) => (
                <Select.Option key={membership.id} value={membership.id}>
                  Organization {idx + 1}
                </Select.Option>
              ))}
            </Select>
          </Field>
        </Form>
      )}
      {children}
    </section>
  );
};

export default DashboardLayout;
