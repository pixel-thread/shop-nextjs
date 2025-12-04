import Breadcrumb from "@/components/Common/Breadcrumb";
import { SignUp } from "@clerk/nextjs";
import React from "react";

const Signup = () => {
  return (
    <>
      <Breadcrumb title={"Signup"} pages={["Signup"]} />
      <section className="overflow-hidden min-h-screen flex justify-center items-center py-20 bg-gray-2">
        <SignUp signInUrl="/auth" />
      </section>
    </>
  );
};

export default Signup;
