"use client";

import { cn } from "@/utilities/cn";
import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";
import { ISidebarWrapper } from ".";
import { useSidebar } from "@/stores/sidebarStore";

const DesktopSidebarWrapper = ({
  children,
  className,
  ...rest
}: ISidebarWrapper) => {
  const { isSidebarExpanded } = useSidebar();

  const sidebarExpansionAnimationControler = useAnimationControls();

  useEffect(() => {
    if (isSidebarExpanded) {
      sidebarExpansionAnimationControler.start("expand");
    } else {
      sidebarExpansionAnimationControler.start("contract");
    }
  }, [isSidebarExpanded, sidebarExpansionAnimationControler]);

  return (
    <motion.aside
      initial="expand"
      animate={sidebarExpansionAnimationControler}
      variants={{
        expand: {
          width: "var(--expanded-width,18rem)",
          transition: {
            duration: 0.5,
            ease: [0.36, 0.66, 0.04, 1],
          },
        },
        contract: {
          width: "var(--contracted-width,4.8rem)",
          transition: {
            duration: 0.5,
            ease: [0.36, 0.66, 0.04, 1],
          },
        },
      }}
      className={cn(
        "@container fixed inset-0 left-0 hidden h-full flex-shrink-0 flex-col md:relative md:flex",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.aside>
  );
};

export default DesktopSidebarWrapper;
