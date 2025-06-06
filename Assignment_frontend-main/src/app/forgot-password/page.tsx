"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@windmill/react-ui";

//internal import
import Error from "@/components/form/others/Error";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputArea from "@/components/form/input/InputArea";
import ImageLight from "@/assets/img/forgot-password-office.jpeg";
import ImageDark from "@/assets/img/forgot-password-office-dark.jpeg";

const ForgotPassword: React.FC = () => {
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          {/* <div className="h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <Image
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div> */}
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>

              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              <form >
                <LabelArea label="Email" />
                <InputArea
                  required={true}
                  register={register}
                  label="Email"
                  name="verifyEmail"
                  type="email"
                  placeholder="john@doe.com"
                />
                <Error errorName={errors.verifyEmail} />

                <Button
                  disabled={loading}
                  type="submit"
                  block
                  className="mt-4 h-12"
                >
                  Recover password
                </Button>
              </form>
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                  href="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
