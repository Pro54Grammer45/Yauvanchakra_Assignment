'use client';

import { Input } from "@windmill/react-ui";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import React from "react";

//internal import
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import InputValue from "@/components/form/input/InputValue";
import LabelArea from "@/components/form/selectOption/LabelArea";
import Uploader from "@/components/image-uploader/Uploader";
import useCouponSubmit from "@/hooks/useCouponSubmit";
import DrawerButton from "@/components/form/button/DrawerButton";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import SwitchToggleFour from "@/components/form/switch/SwitchToggleFour";

// Type for CouponDrawer props
interface CouponDrawerProps {
  id?: string;
}

const CouponDrawer: React.FC<CouponDrawerProps> = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    published,
    setPublished,
    currency,
    discountType,
    setDiscountType,
    isSubmitting,
    handleSelectLanguage,
  } = useCouponSubmit(id);

  return (
    <>
      <div className="w-full relative  p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateCoupon")}
            description={t("UpdateCouponDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddCoupon")}
            description={t("AddCouponDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CouponBannerImage")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  product={false}
                  folder="coupon"
                  targetWidth={238}
                  targetHeight={238}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CampaignName")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Coupon title"
                  name="title"
                  type="text"
                  placeholder={t("CampaignName")}
                  defaultValue={""}
                  autoComplete="off"
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CampaignCode")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Coupon Code"
                  name="couponCode"
                  type="text"
                  placeholder={t("CampaignCode")}
                  defaultValue={""}
                  autoComplete="off"
                />
                <Error errorName={errors.couponCode} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CouponValidityTime")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`endTime`, {
                    required: "Coupon Validation End Time",
                  })}
                  name="endTime"
                  type="datetime-local"
                  placeholder={t("CouponValidityTime")}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  css={undefined}
                  crossOrigin={undefined}
                />
                <Error errorName={errors.endTime} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("DiscountType")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggleFour
                  title={t("DiscountType")}
                  handleProcess={setDiscountType}
                  processOption={discountType}
                  product={false}
                  handleIsCombination={() => {}}
                />
                <Error errorName={errors.discountType} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Discount")} />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  product={true}
                  required={true}
                  register={register}
                  maxValue={discountType ? 99 : 1000}
                  minValue={1}
                  label="Discount"
                  name="discountPercentage"
                  type="number"
                  placeholder={discountType ? "Percentage" : "Fixed Amount"}
                  currency={discountType ? "%" : currency}
                  disabled={false}
                  defaultValue={""}
                />
                <Error errorName={errors.discountPercentage} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("MinimumAmount")} />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  product={true}
                  required={true}
                  register={register}
                  maxValue={200000}
                  minValue={100}
                  label="Minimum Amount"
                  name="minimumAmount"
                  type="number"
                  placeholder={t("MinimumAmountPlasholder")}
                  currency={currency}
                  disabled={false}
                  defaultValue={""}
                />
                <Error errorName={errors.minimumAmount} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Published")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  id={id || ""}
                  title={t("Published")}
                  handleProcess={setPublished}
                  processOption={published}
                />
                <Error errorName={errors.productType} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Coupon" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CouponDrawer;
