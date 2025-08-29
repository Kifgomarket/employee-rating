import { cn } from "@/utilities/cn";
import { UserRole } from "@prisma/client";

const UserRoleBadge = ({ role }: { role: UserRole }) => {
  return (
    <div
      className={cn(
        "w-min rounded-full border px-2 text-[0.65rem] font-semibold tracking-wide uppercase",
        {
          "border-blue-200 bg-blue-100 text-blue-800": role === "OWNER",
          "border-amber-200 bg-amber-100 text-amber-800": role === "EMPLOYEE",
          "border-cyan-200 bg-cyan-100 text-cyan-800": role === "SUPERVISOR",
        },
      )}
    >
      {role}
    </div>
  );
};

export default UserRoleBadge;
