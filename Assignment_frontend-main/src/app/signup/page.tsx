"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Input, Label, Button } from "@windmill/react-ui";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { useTranslation } from "react-i18next";

//internal import
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SelectRole from "@/components/form/selectOption/SelectRole";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import ImageLight from "@/assets/img/create-account-office.jpeg";
import ImageDark from "@/assets/img/create-account-office-dark.jpeg";

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const { onSubmit, register, handleSubmit, errors, loading } = useLoginSubmit();

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="/img/create-account-office.jpeg"
              alt="Office Light"
              width={500}
              height={500}
            />
            <Image
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="/img/create-account-office-dark.jpeg"
              alt="Office Dark"
              width={500}
              height={500}
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                {t("CreateAccount")}
              </h1>
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              <form >

                <LabelArea label="Name" />
                <InputArea
                  required={true}
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Admin"
                />
                <Error errorName={errors.name} />
                <LabelArea label="Email" />
                <InputArea
                  required={true}
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@doe.com"
                />
                <Error errorName={errors.email} />

                <LabelArea label="Password" />
                <InputArea
                  required={true}
                  register={register}
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="***************"
                />
                <Error errorName={errors.password} />

                <LabelArea label="Staff Role" />
                <div className="col-span-8 sm:col-span-4">
                  <SelectRole register={register} label="Role" name="role" setRole={() => {}} />
                  <Error errorName={errors.role} />
                </div>

                <Label className="mt-6" check>
                  <Input type="checkbox" crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} css={undefined} />
                  <span className="ml-2">
                    {t("Iagree")} {" "}
                    <span className="underline">{t("privacyPolicy")}</span>
                  </span>
                </Label>

                <Button
                  disabled={loading}
                  type="submit"
                  className="mt-4 h-12 w-full"
                  style={{backgroundColor:'blue', color:'white'}}
                  block
                >
                  {t("CreateAccountTitle")}
                </Button>
              </form>

              <hr className="my-10" />

              <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2"
              >
                <ImFacebook className="w-4 h-4 mr-2" /> {" "}
                <span className="ml-2"> {t("LoginWithFacebook")} </span>
              </button>
              <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2  md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
              >
                <ImGoogle className="w-4 h-4 mr-2" /> {" "}
                <span className="ml-2">{t("LoginWithGoogle")}</span>
              </button>

              {/* <p className="mt-4">
                <Link
                  className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                  to="/login"
                >
                  {t("AlreadyAccount")}
                </Link>
              </p> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
