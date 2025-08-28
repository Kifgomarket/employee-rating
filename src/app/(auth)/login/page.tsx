import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";

const page = () => {
  const loginBannerImage: string | null =
    "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg";
  return (
    <section className="@container flex h-dvh w-full flex-col overflow-hidden">
      <div className="flex w-full flex-1 overflow-hidden">
        {/* banner */}
        {loginBannerImage && (
          <div className="hidden h-full w-full p-1 @6xl:flex">
            <div className="relative size-full overflow-hidden rounded-2xl">
              <Image
                fill
                className="h-full object-cover"
                src={loginBannerImage}
                alt="Login banner image"
              ></Image>
            </div>
          </div>
        )}
        {/* banner */}

        {/* form */}
        <div className="flex h-dvh w-full flex-col overflow-hidden">
          <header className="flex w-full items-center justify-between gap-10 px-5 pt-5">
            {/* logo */}
            <div className="flex items-center justify-start gap-3">
              <div className="bg-primary flex size-12 items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 text-white"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M7.003 39.081c2.829.213 7.094.419 12.997.419q.563 0 1.104-.002c-2.301-2.013-2.636-5.433-1.006-7.855H20c-3.469 0-6.147-.097-8.113-.213l-.092-.007c-1.923-.144-2.806-2.174-2.22-3.82.977-2.753 3.063-4.996 5.73-6.224a7.357 7.357 0 119.389 0 11.04 11.04 0 013.872 2.965l1.17-2.139c2.053-3.755 7.12-4.121 9.762-1.101L39.5 20c0-5.903-.206-10.168-.419-12.997-.247-3.297-2.787-5.837-6.084-6.084C30.168.706 25.903.5 20 .5S9.832.706 7.003.919C3.706 1.166 1.166 3.706.919 7.003.706 9.832.5 14.097.5 20s.206 10.168.419 12.997c.247 3.297 2.787 5.837 6.084 6.084m25.804-15.197c.948-1.733 3.438-1.733 4.386 0l1.68 3.07a10.5 10.5 0 004.173 4.174l3.07 1.679c1.733.948 1.733 3.438 0 4.386l-3.07 1.68a10.5 10.5 0 00-4.174 4.173l-1.679 3.07c-.948 1.733-3.438 1.733-4.386 0l-1.68-3.07a10.5 10.5 0 00-4.173-4.174l-3.07-1.679c-1.733-.948-1.733-3.438 0-4.386l3.07-1.68a10.5 10.5 0 004.174-4.173z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Employee Rating
                </h1>
                <p className="text-xs text-gray-600">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            {/* logo */}

            {/* link */}
            <p className="text-xs text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                className="font-semibold text-gray-800 hover:underline"
                href={"register"}
              >
                Register
              </Link>
            </p>
            {/* link */}
          </header>

          {/* form */}
          <div className="my-10 flex w-full flex-1 flex-col items-center-safe justify-center-safe overflow-y-auto px-5">
            <h2 className="text-center text-3xl font-bold text-gray-800">
              Sign in to your account
            </h2>

            <p className="mt-1 text-center text-xs text-balance text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>

            <div className="mt-10 w-full max-w-sm">
              <LoginForm />
            </div>
          </div>
          {/* form */}

          <footer className="w-full px-5 pb-5">
            <p className="mx-auto max-w-xs text-center text-[0.65rem] text-balance text-gray-600">
              Copyright &copy; {new Date().getFullYear()} Employee Rating (pvt)
              Ltd. All Rights Reserved. 
            </p>
          </footer>
        </div>
        {/* form */}
      </div>
    </section>
  );
};

export default page;
