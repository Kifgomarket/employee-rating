"use client";

import Button from "@/components/Button";
import { useAuthActions } from "@/stores/authStore";
import React from "react";

const Page = () => {
  const { logout } = useAuthActions();
  return (
    <div>
      Supervisor dashboard
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Page;
