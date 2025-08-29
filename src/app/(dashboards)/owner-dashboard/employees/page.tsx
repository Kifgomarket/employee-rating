"use client";

import { OrganizationEmployeesParams } from "@/app/api-client/organization/employees/types";
import { useGetAllOrganizationEmployees } from "@/app/api-client/organization/employees/useGetAllOrganizationEmployees";
import { RestrictedUserRole } from "@/app/api-client/user/types";
import Button from "@/components/Button";
import Field from "@/components/Forms/Field";
import Form from "@/components/Forms/Form";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import Select from "@/components/Forms/Select";
import { ResponsivePagination } from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import UserRoleBadge from "@/components/UserRoleBadge";
import { Sheet } from "@/components/drawer";
import useSearchQuery from "@/hooks/useSearchQuery";
import useThrottledSearch from "@/hooks/useThrottledSearch";
import { useAuth } from "@/stores/authStore";
import safeParseInt from "@/utilities/safeParseInt";
import { format } from "date-fns";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  IoChevronForward,
  IoClose,
  IoPeople,
  IoSearch,
  IoUnlink,
} from "react-icons/io5";
import { z } from "zod";
import Topbar from "../../Topbar";
import pageConfigs from "./pageConfigs";
import capitalizeFirstLetter from "@/utilities/capitalizeFirstLetter";

const Page = () => {
  const { selectedOrganization } = useAuth();
  const [isInviteUsersDrawerOpen, setIsInviteUsersDrawerOpen] = useState(false);
  const {
    searchParams,
    appendToSearchQuery,
    deleteFromSearchQuery,
    batchUpdateSearchQuery,
  } = useSearchQuery();

  const role = useMemo(() => {
    const roleParam = searchParams.get("role") ?? "";
    return pageConfigs.FILTERS.roles.includes(
      roleParam as (typeof RestrictedUserRole)[number],
    )
      ? roleParam
      : "all";
  }, [searchParams]);

  const size = useMemo(() => {
    const perPageParam = searchParams.get("size");
    return safeParseInt({
      input: perPageParam,
      defaultValue: pageConfigs.DEFAULT_PER_PAGE,
      validValues: pageConfigs.PER_PAGES,
    });
  }, [searchParams]);

  const page = useMemo(() => {
    const pageParam = searchParams.get("page");
    const safeParsedPage = safeParseInt({
      input: pageParam,
      defaultValue: pageConfigs.DEFAULT_PAGE,
    });
    return Math.max(
      pageConfigs.DEFAULT_PAGE,
      Math.min(safeParsedPage, pageConfigs.MAX_ALLOWED_PAGE),
    );
  }, [searchParams]);

  const { queryToSearch, setQueryToSearch } = useThrottledSearch({
    searchQuery: searchParams.get("search") ?? "",
    batchUpdateSearchQuery,
    delay: 300,
  });

  const organizationEmployeesOptions = useMemo<OrganizationEmployeesParams>(
    () => ({
      page: page,
      size: size,
      search: searchParams.get("search") ?? undefined,
      role: role,
    }),
    [page, size, searchParams, role],
  );

  const {
    data: organizationEmployees,
    isPending: isOrganizationEmployeesLoading,
    isError: isOrganizationError,
  } = useGetAllOrganizationEmployees({
    orgId: selectedOrganization?.organizationId || "",
    params: organizationEmployeesOptions,
  });

  const previousNumberOfPages = useRef<number | null>(null);
  const numberOfPages = useMemo(() => {
    if (!organizationEmployees) return previousNumberOfPages?.current ?? 0;

    const pages = Math.ceil(organizationEmployees.data.total / size);
    previousNumberOfPages.current = pages;
    return pages;
  }, [organizationEmployees, size]);

  return (
    <section className="@container flex h-full flex-1 flex-col overflow-hidden">
      <Topbar
        Heading={() => (
          <div className="flex items-center justify-start gap-2">
            <Link
              href={"/owner-dashboard"}
              aria-disabled
              className="text-primary text-xl font-medium hover:underline md:text-2xl"
            >
              Owner Dashboad
            </Link>

            <IoChevronForward className="text-primary/60 size-6" />

            <Link
              href={"/owner-dashboard/employees"}
              aria-disabled
              className="text-xl font-semibold text-gray-800 md:text-2xl"
            >
              Employees
            </Link>
          </div>
        )}
      />

      <div className="scrollbar h-full w-full flex-1 overflow-hidden overflow-y-auto bg-gray-100 p-5">
        <div className="flex min-h-full flex-1 flex-col rounded-2xl bg-white p-5">
          {/* header */}
          <div className="flex items-center justify-between gap-3">
            <Form
              validationSchema={z.object({ role: z.string() })}
              className="w-full"
            >
              {() => (
                <div className="flex w-full items-center justify-between gap-3">
                  <Field className="w-max">
                    <Select
                      selectClass="bg-primary/10 text-primary font-medium w-max py-2 border-0 data-[placeholder]:text-primary"
                      chevronClass="text-primary"
                      name="role"
                      placeholder="Select a role"
                      value={role}
                      onValueChange={(value) => {
                        if (value !== "all") {
                          batchUpdateSearchQuery({ role: value }, ["page"]);
                        } else {
                          deleteFromSearchQuery("role");
                        }
                      }}
                    >
                      <Select.Option value="all">All roles</Select.Option>
                      {pageConfigs.FILTERS.roles.map((role) => (
                        <Select.Option key={role} value={role}>
                          {capitalizeFirstLetter(
                            role.toLowerCase().replaceAll("_", " "),
                          )}
                        </Select.Option>
                      ))}
                    </Select>
                  </Field>

                  <Field>
                    <InputGroup>
                      <IoSearch data-slot="icon" className="pb-1" />
                      <Input
                        placeholder="Search..."
                        className="w-full"
                        inputClass="border-0 text-primary bg-primary/10 py-2"
                        value={queryToSearch}
                        onChange={(e) => {
                          setQueryToSearch(e.target.value ?? "");
                        }}
                      />
                    </InputGroup>
                  </Field>
                </div>
              )}
            </Form>

            {/* CTA */}
            <Sheet
              open={isInviteUsersDrawerOpen}
              onOpenChange={setIsInviteUsersDrawerOpen}
              shouldScaleBackground
              setBackgroundColorOnScale
            >
              <Sheet.Button asChild className="w-max">
                <Button
                  className={
                    "flex w-max flex-shrink-0 items-center justify-center gap-2 py-2 whitespace-nowrap md:py-2 @lg:w-max @lg:justify-start"
                  }
                >
                  <IoPeople className="size-5" />
                  Invite users
                </Button>
              </Sheet.Button>

              <Sheet.Content>
                <div className="flex flex-1 flex-col rounded-xl bg-white p-4 md:mt-0 md:rounded-md md:rounded-r-none">
                  <Sheet.Header className="flex items-start justify-between gap-10">
                    <div className="w-full">
                      <Sheet.Title>Invite users</Sheet.Title>
                      <Sheet.Description className="mt-1">
                        Add the user&apos;s details and role to send an invite.
                        Quick and easy!
                      </Sheet.Description>
                    </div>

                    <Sheet.Close asChild>
                      <Button
                        variant={"secondary"}
                        className={"rounded-md p-1 md:p-1"}
                      >
                        <IoClose className="size-4" />
                      </Button>
                    </Sheet.Close>
                  </Sheet.Header>

                  {/* body */}
                  <div className="mt-5 flex flex-1 flex-col">
                    <p>Invite user form</p>
                  </div>
                  {/* body */}
                </div>
              </Sheet.Content>
            </Sheet>

            {/* CTA */}
          </div>
          {/* header */}

          <AnimatePresence mode="popLayout">
            {isOrganizationEmployeesLoading && (
              <motion.div
                key="users-loading"
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                exit={{ filter: "blur(10px)", opacity: 0 }}
                className="flex w-full flex-1 flex-col items-center justify-center"
              >
                <Spinner className="size-5" />
              </motion.div>
            )}
          </AnimatePresence>

          {!isOrganizationEmployeesLoading &&
            organizationEmployees &&
            organizationEmployees?.data?.items?.length > 0 && (
              <Table
                key="users-table"
                wrapperClass="mt-5 w-full flex-1 flex-shrink-0 overflow-auto overflow-x-auto"
                className="w-full overflow-x-auto"
              >
                <Table.Thead className="border-b border-gray-200 bg-white">
                  <Table.Tr>
                    <Table.Th className="w-64">Name</Table.Th>
                    <Table.Th className="w-64">Email</Table.Th>
                    <Table.Th className="w-32">Role</Table.Th>
                    <Table.Th className="w-32">Joined at</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody className="divide-gray-100">
                  {organizationEmployees.data.items.map((employee) => (
                    <Table.Tr key={employee.id} className="w-full">
                      <Table.Td>
                        <div className="flex items-center justify-start gap-2">
                          <p className="font-medium">
                            {employee.firstName} {employee.lastName}
                          </p>
                        </div>
                      </Table.Td>

                      <Table.Td>{employee.email}</Table.Td>

                      <Table.Td>
                        <UserRoleBadge role={employee.role} />
                      </Table.Td>

                      <Table.Td className="whitespace-nowrap">
                        {format(new Date(employee.createdAt), "do MMMM yyyy")}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}

          {/* empty state */}
          {!isOrganizationEmployeesLoading && isOrganizationError && (
            <motion.div
              key="empty-state"
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(10px)", opacity: 0 }}
              className="flex w-full flex-1 flex-col items-center justify-center"
            >
              <div className="flex w-min items-center justify-center rounded-full bg-red-100 p-5 text-red-800">
                <IoUnlink className="size-7" />
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                Oops something went wrong
              </p>
              <p className="text-center text-xs text-balance text-gray-600">
                Seems like we are having some trouble, please try again later.
              </p>
            </motion.div>
          )}
          {/* empty state */}

          {/* error state */}
          {!isOrganizationEmployeesLoading &&
            !isOrganizationError &&
            organizationEmployees &&
            organizationEmployees?.data?.items?.length <= 0 && (
              <motion.div
                key="empty-state"
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                exit={{ filter: "blur(10px)", opacity: 0 }}
                className="flex w-full flex-1 flex-col items-center justify-center"
              >
                <div className="flex w-min items-center justify-center rounded-full bg-amber-100 p-5 text-amber-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-7"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="M12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036q-.016-.004-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092q.019.005.029-.008l.004-.014-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 00-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z" />
                      <path
                        fill="currentColor"
                        d="M6 7a5 5 0 1110 0A5 5 0 016 7m-1.178 7.672C6.425 13.694 8.605 13 11 13q.671 0 1.316.07a1 1 0 01.72 1.557A5.97 5.97 0 0012 18c0 .92.207 1.79.575 2.567a1 1 0 01-.89 1.428Q11.345 22 11 22c-2.229 0-4.335-.14-5.913-.558-.785-.208-1.524-.506-2.084-.956C2.41 20.01 2 19.345 2 18.5c0-.787.358-1.523.844-2.139.494-.625 1.177-1.2 1.978-1.69zM17.5 16a1.5 1.5 0 100 3 1.5 1.5 0 000-3M14 17.5a3.5 3.5 0 116.58 1.665l.834.835A1 1 0 1120 21.414l-.835-.835A3.5 3.5 0 0114 17.5"
                      />
                    </g>
                  </svg>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  No employees found
                </p>
                <p className="text-center text-xs text-balance text-gray-600">
                  Try adjusting your filters or reset to see all employees
                </p>
                <Button
                  onClick={() =>
                    batchUpdateSearchQuery(undefined, [
                      "page",
                      "size",
                      "search",
                      "role",
                    ])
                  }
                  noise={false}
                  border={false}
                  variant={"ghost"}
                  className={
                    "text-primary ring-primary w-max px-1 text-xs hover:underline md:px-1"
                  }
                >
                  Reset filters
                </Button>
              </motion.div>
            )}
          {/* error state */}

          {/* pagination */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key="pagination"
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(10px)", opacity: 0 }}
              className="mt-5 flex w-full items-center justify-between gap-2"
            >
              <div className="flex flex-col items-start justify-start">
                <Form validationSchema={z.object({ perPage: z.string() })}>
                  {() => (
                    <Field>
                      <Select
                        name="perPage"
                        placeholder="Pages per page"
                        value={size.toString()}
                        onValueChange={(value) => {
                          batchUpdateSearchQuery({ size: value }, ["page"]);
                        }}
                        chevronClass="text-primary"
                        selectClass="py-1 rounded-md border-none p-0"
                        className="w-max min-w-32 p-0 md:p-0"
                      >
                        {pageConfigs.PER_PAGES.map((perPage) => (
                          <Select.Option
                            key={perPage}
                            value={perPage.toString()}
                          >
                            {perPage} per page
                          </Select.Option>
                        ))}
                      </Select>
                    </Field>
                  )}
                </Form>

                <p className="mt-1 text-xs whitespace-nowrap text-gray-600">
                  Showing:{" "}
                  {Math.min(size, organizationEmployees?.data?.total ?? 0)} of{" "}
                  {organizationEmployees?.data?.total ?? 0}
                </p>
              </div>

              <ResponsivePagination
                numberOfPages={numberOfPages}
                currentPage={page}
                setCurrentPage={(page) => {
                  if (page > 1) {
                    appendToSearchQuery({ page: page.toString() });
                  } else {
                    deleteFromSearchQuery("page");
                  }
                }}
                truncationThreshold={5}
                maxVisiblePages={10}
              />
            </motion.div>
          </AnimatePresence>
          {/* pagination */}
        </div>
      </div>
    </section>
  );
};

export default Page;
