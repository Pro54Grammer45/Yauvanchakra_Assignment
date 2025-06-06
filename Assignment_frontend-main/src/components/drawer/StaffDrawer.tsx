'use client';

import { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, WindmillContext } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { MultiSelect } from "react-multi-select-component";

//internal import
import { routeAccessList } from "@/routes";
import useGetCData from "@/hooks/useGetCData";
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import InputArea from "@/components/form/input/InputArea";
import useStaffSubmit from "@/hooks/useStaffSubmit";
import SelectRole from "@/components/form/selectOption/SelectRole";
import DrawerButton from "@/components/form/button/DrawerButton";
import LabelArea from "@/components/form/selectOption/LabelArea";
import Uploader from "@/components/image-uploader/Uploader";

// Type for StaffDrawer props
interface StaffDrawerProps {
  id?: string;
}

const StaffDrawer: React.FC<StaffDrawerProps> = ({ id }) => {
  const { role } = useGetCData();
  const { mode } = useContext(WindmillContext);
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    adminInfo,
    imageUrl,
    setImageUrl,
    isSubmitting,
    selectedDate,
    setSelectedDate,
    accessedRoutes,
    setAccessedRoutes,
    handleSelectLanguage,
  } = useStaffSubmit(id);
  const { t } = useTranslation();

  // Dummy setRole function for SelectRole
  const setRole = () => {};

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateStaff")}
            description={t("UpdateStaffdescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddStaffTitle")}
            description={t("AddStaffdescription")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Staff Image" />
                  <div className="col-span-8 sm:col-span-4">
                    <Uploader
                      imageUrl={imageUrl}
                      setImageUrl={setImageUrl}
                      product={false}
                      folder="admin"
                      targetWidth={238}
                      targetHeight={238}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Name" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      required={true}
                      register={register}
                      label="Name"
                      name="name"
                      type="text"
                      autoComplete="username"
                      placeholder="Staff name"
                      defaultValue={""}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Email" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      required={true}
                      register={register}
                      label="Email"
                      name="email"
                      type="text"
                      autoComplete="username"
                      placeholder="Email"
                      defaultValue={""}
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Password" />
                  <div className="col-span-8 sm:col-span-4">
                    {id ? (
                      <InputArea
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        required={false}
                        defaultValue={""}
                      />
                    ) : (
                      <InputArea
                        required={true}
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        defaultValue={""}
                      />
                    )}
                    <Error errorName={errors.password} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Contact Number" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      required={true}
                      register={register}
                      label="Contact Number"
                      name="phone"
                      type="text"
                      placeholder="Phone number"
                      defaultValue={""}
                      autoComplete="off"
                    />
                    <Error errorName={errors.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Joining Date" />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      onChange={(e) => setSelectedDate(e.target.value)}
                      name="joiningDate"
                      value={selectedDate}
                      type="date"
                      placeholder={t("StaffJoiningDate")}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      css={undefined}
                      crossOrigin={undefined}
                    />
                    <Error errorName={errors.joiningDate} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Staff Role" />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectRole setRole={setRole} register={register} label="Role" name="role" />
                    <Error errorName={errors.role} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Select Routes to given Access" />
                  <div className="col-span-8 sm:col-span-4">
                    <MultiSelect
                      options={routeAccessList}
                      value={accessedRoutes}
                      className={mode}
                      onChange={(v) => setAccessedRoutes(v)}
                      labelledBy="Select Coupon"
                    />
                  </div>
                </div>
              </div>

              <DrawerButton
                id={id}
                title="Staff"
                zIndex="z-5"
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default StaffDrawer;
