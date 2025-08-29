"use client";

import Button from "@/components/Button";
import { SidebarWrapper } from "@/components/sidebarWrapper";
import { useAuthActions } from "@/stores/authStore";
import { useSidebar, useSidebarActions } from "@/stores/sidebarStore";
import { CustomSlottedComponent } from "@/types/type-utils";
import { cn } from "@/utilities/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { BsBookmarkStarFill } from "react-icons/bs";
import {
  IoChevronForward,
  IoLogOut,
  IoPeopleSharp,
  IoSettings,
  IoTrendingUpOutline,
} from "react-icons/io5";

const Sidebar = () => {
  const router = useRouter();
  const { isSidebarExpanded } = useSidebar();
  const { setIsSidebarExpanded, setIsSidebarVisible } = useSidebarActions();
  const { logout } = useAuthActions();

  return (
    <SidebarWrapper className="md:-ml-1.5">
      <div className="relative flex h-full flex-1 flex-col overflow-visible">
        {/* sidebar expand button (for desktop) */}
        <AnimatePresence>
          {!isSidebarExpanded && (
            <motion.div
              initial={false}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(10px)", opacity: 0 }}
              className="absolute top-[1.2rem] -right-3 z-[9999] hidden md:block"
            >
              <Button
                onClick={() => setIsSidebarExpanded((pv) => !pv)}
                variant={"ghost"}
                noise={false}
                border={false}
                className={
                  "text-primary hover:bg-secondary hover:text-primary/90 data-[pressed]:bg-secondary flex rounded-md bg-gray-950 p-1 shadow md:p-1"
                }
              >
                <IoChevronForward className="size-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* sidebar expand button (for desktop) */}

        <header className="sticky top-0 z-[999] flex items-center justify-between overflow-x-hidden p-3 px-5 pt-3 pb-0">
          {/* logo */}
          <div className="flex items-center justify-center gap-2 lg:w-min">
            <div className="bg-primary w-min rounded-full stroke-white p-3 text-white">
              <BsBookmarkStarFill className="size-4 text-white" />
            </div>

            {isSidebarExpanded && (
              <div className="w-full">
                <h2 className="text-xl font-medium whitespace-nowrap text-white">
                  Evalon
                </h2>
              </div>
            )}
          </div>
          {/* logo */}

          {/* sidebar contract button (for desktop) */}
          <AnimatePresence>
            {isSidebarExpanded && (
              <motion.div
                initial={"visible"}
                animate={"visible"}
                exit={"hidden"}
                variants={{
                  visible: {
                    filter: "blur(0px)",
                    opacity: 1,
                  },
                  hidden: {
                    filter: "blur(10px)",
                    opacity: 0,
                  },
                }}
                className="hidden md:block"
              >
                <Button
                  onClick={() => setIsSidebarExpanded((pv) => !pv)}
                  variant={"ghost"}
                  noise={false}
                  border={false}
                  className={"flex p-0 md:p-0"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary size-8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M3.172 4.172C2 5.343 2 7.229 2 11v2c0 3.771 0 5.657 1.172 6.828S6.229 21 10 21h4.25V3H10C6.229 3 4.343 3 3.172 4.172M15.75 3.006v17.988c2.636-.027 4.104-.191 5.078-1.166C22 18.657 22 16.771 22 13v-2c0-3.771 0-5.657-1.172-6.828-.974-.975-2.442-1.139-5.078-1.166"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* sidebar contract button (for desktop) */}

          {/* sidebar hide button (for mobile) */}
          <Button
            onClick={() => setIsSidebarVisible((pv) => !pv)}
            variant={"ghost"}
            noise={false}
            border={false}
            className={"flex p-0 md:hidden md:p-0"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary size-8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.172 4.172C2 5.343 2 7.229 2 11v2c0 3.771 0 5.657 1.172 6.828S6.229 21 10 21h4.25V3H10C6.229 3 4.343 3 3.172 4.172M15.75 3.006v17.988c2.636-.027 4.104-.191 5.078-1.166C22 18.657 22 16.771 22 13v-2c0-3.771 0-5.657-1.172-6.828-.974-.975-2.442-1.139-5.078-1.166"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          {/* sidebar hide button (for mobile) */}
        </header>

        <div className="scrollbar mt-10 w-full flex-1 overflow-x-hidden overflow-y-auto px-5">
          <div className="flex w-full flex-col space-y-0.5">
            <Title>Controls</Title>
            <NavLink
              href={"/owner-dashboard/dashboard"}
              Icon={() => (
                <div className="bg-primary rounded-xl p-2 text-white shadow-md">
                  <IoTrendingUpOutline className="size-5" />
                </div>
              )}
            >
              {() => <p>Dashboard</p>}
            </NavLink>

            <NavLink
              href={"/owner-dashboard/employees"}
              Icon={() => (
                <div className="bg-primary rounded-xl p-2 text-white shadow-md">
                  <IoPeopleSharp className="size-5" />
                </div>
              )}
            >
              {() => <p>Employees</p>}
            </NavLink>
          </div>
          {/* 
          <div className="mt-5 w-full space-y-0.5">
            <Title>agent</Title>

            <NavLink
              href={`/admin/agents/create`}
              Icon={() => (
                <div className="bg-primary rounded-xl p-2 text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M17.5 2.75a.75.75 0 01.75.75v2.25h2.25a.75.75 0 010 1.5h-2.25V9.5a.75.75 0 01-1.5 0V7.25H14.5a.75.75 0 010-1.5h2.25V3.5a.75.75 0 01.75-.75"
                      clipRule="evenodd"
                    />
                    <path
                      fill="currentColor"
                      d="M2 6.5c0-2.121 0-3.182.659-3.841S4.379 2 6.5 2s3.182 0 3.841.659S11 4.379 11 6.5s0 3.182-.659 3.841S8.621 11 6.5 11s-3.182 0-3.841-.659S2 8.621 2 6.5m11 11c0-2.121 0-3.182.659-3.841S15.379 13 17.5 13s3.182 0 3.841.659S22 15.379 22 17.5s0 3.182-.659 3.841S19.621 22 17.5 22s-3.182 0-3.841-.659S13 19.621 13 17.5m-11 0c0-2.121 0-3.182.659-3.841S4.379 13 6.5 13s3.182 0 3.841.659S11 15.379 11 17.5s0 3.182-.659 3.841S8.621 22 6.5 22s-3.182 0-3.841-.659S2 19.621 2 17.5"
                    />
                  </svg>
                </div>
              )}
            >
              {() => <p>Create new agent</p>}
            </NavLink>
          </div>

          <div className="mt-5 w-full space-y-0.5">
            <Title>hub</Title>

            <NavLink
              href={`/admin/hubs/create`}
              Icon={() => (
                <div className="bg-primary rounded-xl p-2 text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17.5 16.5v2q0 .2.15.35T18 19t.35-.15.15-.35v-2h2q.2 0 .35-.15T21 16t-.15-.35-.35-.15h-2v-2q0-.2-.15-.35T18 13t-.35.15-.15.35v2h-2q-.2 0-.35.15T15 16t.15.35.35.15zM18 21q-2.075 0-3.537-1.463T13 16t1.463-3.537T18 11t3.538 1.463T23 16t-1.463 3.538T18 21M4 17V8q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 8v.525q0 .3-.238.463t-.537.112q-1.675-.3-3.312.213T13.05 11.05q-1.35 1.35-1.838 3.15t.013 3.625q.125.45-.125.813t-.675.362H6q-.825 0-1.412-.587T4 17"
                    />
                  </svg>
                </div>
              )}
            >
              {() => <p>Create new hub</p>}
            </NavLink>
          </div> */}
        </div>

        <div className="w-full space-y-0.5 px-5 pt-3">
          <Title>other</Title>

          <NavLink
            href={"/admin/configurations"}
            Icon={() => (
              <div className="bg-primary rounded-xl p-2 text-white shadow-md">
                <IoSettings className="size-5" />
              </div>
            )}
          >
            {() => <p>Configurations</p>}
          </NavLink>
          <NavButton
            onClick={() => {
              logout();
              router.push("/login");
            }}
            Icon={() => (
              <div className="bg-primary rounded-xl p-2 text-white shadow-md">
                <IoLogOut className="size-5" />
              </div>
            )}
          >
            {() => <p>Logout</p>}
          </NavButton>
        </div>
      </div>
    </SidebarWrapper>
  );
};

interface INavlink extends Omit<ComponentProps<typeof Link>, "children"> {
  Icon?: CustomSlottedComponent<"div", { isActive: boolean }>;
  children: ({ isActive }: { isActive: boolean }) => ReactNode;
  disableActive?: boolean;
  exact?: boolean;
}
const NavLink = ({
  onClick,
  href,
  Icon,
  disableActive = false,
  exact = false,
  children,
}: INavlink) => {
  const { isSidebarExpanded } = useSidebar();
  const path = usePathname();
  const isActive = disableActive
    ? false
    : exact
      ? path === href.toString()
      : path.includes(href.toString());

  return (
    <Link
      onClick={onClick}
      href={href}
      className={cn(
        "-mx-3 flex flex-shrink-0 cursor-pointer items-center justify-start rounded-xl p-3 py-2 text-sm font-medium whitespace-nowrap text-white",
        { "bg-primary/40": isActive },
        { "hover:bg-primary/20": !isActive },
        { "gap-2": isSidebarExpanded },
      )}
    >
      {Icon && <Icon isActive={isActive} />}

      {isSidebarExpanded && children({ isActive })}
    </Link>
  );
};

interface INavButton extends Omit<ComponentProps<"div">, "children"> {
  Icon?: CustomSlottedComponent<"div", { isActive: boolean }>;
  children: ({ isActive }: { isActive: boolean }) => ReactNode;
}
const NavButton = ({ onClick, Icon, children }: INavButton) => {
  const { isSidebarExpanded } = useSidebar();

  return (
    <div
      onClick={onClick}
      className={cn(
        "hover:bg-primary/20 -mx-3 flex flex-shrink-0 cursor-pointer items-center justify-start rounded-xl p-3 py-2 text-sm font-medium whitespace-nowrap text-white",
        { "gap-2": isSidebarExpanded },
      )}
    >
      {Icon && <Icon isActive={false} />}

      {isSidebarExpanded && children({ isActive: false })}
    </div>
  );
};

interface ITitle extends ComponentProps<"p"> {}
const Title = ({ className, children, ...rest }: ITitle) => {
  return (
    <p
      className={cn(
        "mb-2 truncate text-[0.65rem] font-semibold tracking-wider text-white/60 uppercase",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Sidebar;
