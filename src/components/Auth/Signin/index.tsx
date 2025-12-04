import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import { SignIn } from "@clerk/nextjs";
const Signin = () => {
  return (
    <>
      <Breadcrumb title={"Signin"} pages={["Signin"]} />
      <section className="overflow-hidden min-h-screen flex justify-center items-center py-20 bg-gray-2">
        <SignIn signUpUrl="/auth/sign-up" />
      </section>
    </>
  );
};

export default Signin;
