"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./RegisterForm";
import { FcNews } from "react-icons/fc";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  return (
    <section className="flex h-dvh w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="relative grid h-dvh w-full grid-cols-1 bg-white p-1 md:grid-cols-[60%_40%] md:p-1 dark:bg-black">
        {/*left side*/}
        <div className="relative overflow-hidden">
          <Image
            fill
            src="https://res.cloudinary.com/dlseuftkj/image/upload/v1753260382/pexels-rohitverma-32484144_lazhni.jpg"
            alt="Workspace"
            className="hidden h-full w-full rounded-2xl object-cover object-left md:flex"
          />
        </div>

        {/*right side*/}
        <div className="hide-scrollbar flex h-full min-h-0 flex-col overflow-y-auto px-4">
          {/*logo section*/}
          <div className="mt-2 flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center justify-start space-x-1 dark:text-white">
              <FcNews className="size-9" />
              <p className="text-2xl">K-Rate</p>
            </div>
            <div>
              <p className="text-xs md:text-sm">
                <span className="text-gray-600 dark:text-gray-500">
                  Don&apos;t have an account?
                </span>{" "}
                <span
                  onClick={() => router.push("/login")}
                  className="cursor-pointer dark:text-white"
                >
                  login
                </span>
              </p>
            </div>
          </div>

          {/*form section*/}
          <div className="mt-1 flex flex-1 items-center justify-center md:mt-5">
            <div className="flex w-full max-w-[27rem] flex-col">
              <RegisterForm />
            </div>
          </div>

          <div className="text-center dark:text-white/50">
            <p className="text-[0.6rem] md:text-[0.73rem]">
              By clicking Continue you confirm that you agree to
              <br />
              Kifgo&apos;s{" "}
              <span className="ml-1 cursor-pointer underline dark:text-white">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
