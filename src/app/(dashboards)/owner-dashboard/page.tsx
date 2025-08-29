import { redirect } from "next/navigation";

const page = () => {
  redirect("/owner-dashboard/dashboard");
};

export default page;
