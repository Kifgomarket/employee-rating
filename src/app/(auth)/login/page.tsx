import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";
import { BsBookmarkStarFill } from "react-icons/bs";

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
                <BsBookmarkStarFill className="size-5 text-white" />
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
