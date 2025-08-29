"use client";

import Button from "@/components/Button";
import { useAuth } from "@/stores/authStore";
import { useSidebar, useSidebarActions } from "@/stores/sidebarStore";
import { CustomSlottedComponent } from "@/types/type-utils";
import { cn } from "@/utilities/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps } from "react";
import { IoPerson } from "react-icons/io5";

interface ITopbar extends ComponentProps<"nav"> {
  heading?: string;
  subHeading?: string;
  Heading?: CustomSlottedComponent<"div">;
}

const Topbar = ({ heading, subHeading, Heading }: ITopbar) => {
  const { user } = useAuth();
  const { isSidebarVisible, isSidebarExpanded } = useSidebar();
  const { setIsSidebarVisible } = useSidebarActions();

  return (
    <nav
      className={cn(
        "flex w-full items-center justify-between gap-10 border-b border-gray-300 px-5 py-3",
        { "md:pl-5": !isSidebarExpanded },
      )}
    >
      <div className="flex items-center justify-start">
        <AnimatePresence>
          {!isSidebarVisible && (
            <motion.div
              initial={{ filter: "blur(10px)", width: 0, opacity: 0 }}
              animate={{ filter: "blur(0px)", width: "auto", opacity: 1 }}
              exit={{ filter: "blur(10px)", width: 0, opacity: 0 }}
              className="mr-3 md:mr-0 md:hidden"
            >
              <Button
                onClick={() => setIsSidebarVisible((pv) => !pv)}
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

        {/* heading */}
        <motion.div>
          {Heading ? (
            <Heading />
          ) : (
            <>
              {heading && (
                <h1 className="text-xl font-semibold text-gray-800 md:text-2xl">
                  {heading}
                </h1>
              )}
              {subHeading && (
                <p className="line-clamp-2 text-xs text-gray-600">
                  {subHeading}
                </p>
              )}
            </>
          )}
          {/* heading */}
        </motion.div>
      </div>

      {/* controls */}
      <div className="flex items-center justify-end gap-2">
        <div className="flex-shrink-0">
          <div className="bg-secondary bg-primary/70 flex-shrink-0 rounded-full p-3">
            <IoPerson className="size-5 text-white" />
          </div>
        </div>

        <div className="hidden w-40 md:block">
          <p className="truncate text-sm font-semibold text-gray-800">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="truncate text-xs text-gray-600">{user?.email}</p>
        </div>
      </div>
      {/* controls */}
    </nav>
  );
};

export default Topbar;
