"use client";

import Topbar from "../Topbar";

const Page = () => {
  return (
    <section className="flex h-full flex-1 flex-col">
      <Topbar heading={"Supervisor Dashboard"} />

      <div className="scrollbar mt-5 w-full flex-1 overflow-x-hidden overflow-y-auto"></div>
    </section>
  );
};

export default Page;
