"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  // const router = useRouter();
  // const { selectedOrganization } = useAuth();

  // useEffect(() => {
  //   if (selectedOrganization) {
  //     const role = selectedOrganization.role;

  //     if (role === UserRole.OWNER) {
  //       router.push("/owner-dashboard");
  //     }

  //     if (role === UserRole.SUPERVISOR) {
  //       router.push("/supervisor-dashboard");
  //     }

  //     if (role === UserRole.EMPLOYEE) {
  //       router.push("/employee-dashboard");
  //     }
  //   }
  // }, [router, selectedOrganization]);

  return (
    <main className="bg-dark flex h-dvh w-full flex-col overflow-hidden p-1.5">
      <div className="flex w-full flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex h-full w-full min-w-0 flex-1 flex-col rounded-2xl bg-white">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
