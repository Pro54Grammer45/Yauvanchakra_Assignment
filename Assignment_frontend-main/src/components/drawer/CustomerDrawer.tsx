'use client';

import Scrollbars from "react-custom-scrollbars-2";
import React from "react";

//internal import
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import useCustomerSubmit from "@/hooks/useCustomerSubmit";
import DrawerButton from "@/components/form/button/DrawerButton";

// Type for CustomerDrawer props
interface CustomerDrawerProps {
  id?: string;
}

const CustomerDrawer: React.FC<CustomerDrawerProps> = ({ id }) => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useCustomerSubmit(id);

  // console.log('##CustomerDrawer',)
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={"Update Customer"}
            description={"Update your Customer necessary information from here"}
            register={register}
            handleSelectLanguage={() => {}}
          />
        ) : (
          <Title
            title={"Add Customer"}
            description={"Add your Customer necessary information from here"}
            register={register}
            handleSelectLanguage={() => {}}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Name"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder={"Name"}
                  defaultValue={""}
                  autoComplete="off"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Email"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder={"Email"}
                  defaultValue={""}
                  autoComplete="off"
                />
                <Error errorName={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Phone"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={false}
                  register={register}
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder={"Phone"}
                  defaultValue={""}
                  autoComplete="off"
                />
                <Error errorName={errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Address"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={false}
                  register={register}
                  label="Address"
                  name="address"
                  type="text"
                  placeholder={"Address"}
                  defaultValue={""}
                  autoComplete="off"
                />
                <Error errorName={errors.address} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Customer" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CustomerDrawer;
